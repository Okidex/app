
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CapTableEntry, InvestmentStage } from "@/lib/types";
import { Pencil, Save, Trash, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { investmentStages } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { updateStartupData } from '@/lib/actions';

interface CapTableFormProps {
    startupId: string;
    initialData: CapTableEntry[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default function CapTableForm({ startupId, initialData }: CapTableFormProps) {
    
    const newEntryDefault: Omit<CapTableEntry, 'id'> = {
        shareholderName: '',
        investment: 0,
        shares: 0,
        equityPercentage: 0,
        investmentStage: 'Seed'
    };

    const [data, setData] = useState<CapTableEntry[]>(initialData);
    const [editingRow, setEditingRow] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<Partial<CapTableEntry> | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const { toast } = useToast();

    const handleEdit = (entry: CapTableEntry) => {
        setEditingRow(entry.id);
        setEditedData(entry);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditedData(null);
        setIsAdding(false);
    };

    const handleSave = async () => {
        if (!editedData) return;
        
        let newData: CapTableEntry[];
        if (isAdding) {
            const newId = `ct-new-${Date.now()}`;
            newData = [...data, { ...newEntryDefault, ...editedData, id: newId }];
            toast({ title: "Shareholder Added", description: `Added ${editedData.shareholderName} to the cap table.` });
        } else {
            newData = data.map(d => d.id === editedData.id ? { ...d, ...editedData } as CapTableEntry : d);
            toast({ title: "Cap Table Updated", description: `Successfully updated details for ${editedData.shareholderName}.` });
        }
        
        const totalInvestment = newData.reduce((acc, entry) => acc + entry.investment, 0);

        const result = await updateStartupData(startupId, { capTable: newData, fundsRaised: totalInvestment });
        if(result.success) {
            setData(newData);
        } else {
            toast({ title: "Error", description: result.error, variant: 'destructive' });
        }

        setEditingRow(null);
        setEditedData(null);
        setIsAdding(false);
    };

    const handleDelete = async (id: string) => {
        const entryName = data.find(d => d.id === id)?.shareholderName;
        const newData = data.filter(d => d.id !== id);
        const totalInvestment = newData.reduce((acc, entry) => acc + entry.investment, 0);

        const result = await updateStartupData(startupId, { capTable: newData, fundsRaised: totalInvestment });

        if(result.success) {
            setData(newData);
            toast({ title: "Shareholder Removed", description: `${entryName} has been removed from the cap table.`, variant: "destructive" });
        } else {
            toast({ title: "Error", description: result.error, variant: 'destructive' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedData) return;
        const { name, value, type } = e.target;
        setEditedData({ ...editedData, [name]: type === 'number' ? Number(value) : value });
    };

    const handleSelectChange = (value: InvestmentStage) => {
        if (!editedData) return;
        setEditedData({ ...editedData, investmentStage: value });
    }
    
    const startAdding = () => {
        setIsAdding(true);
        const newId = 'new-entry';
        setEditedData({ id: newId, ...newEntryDefault });
        setEditingRow(newId);
    };

    const renderRow = (entry: Partial<CapTableEntry>, isEditMode: boolean) => {
        const currentData = isEditMode ? editedData : entry;

        return (
             <TableRow key={currentData?.id}>
                <TableCell>
                    {isEditMode ? (
                        <Input type="text" name="shareholderName" value={currentData?.shareholderName || ''} onChange={handleInputChange} className="h-8" />
                    ) : (
                        <span className="font-medium">{currentData?.shareholderName}</span>
                    )}
                </TableCell>
                 <TableCell>
                    {isEditMode ? (
                         <Select value={currentData?.investmentStage} onValueChange={handleSelectChange}>
                            <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                            <SelectContent>
                                {investmentStages.map(stage => (
                                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <Badge variant="outline">{currentData?.investmentStage}</Badge>
                    )}
                </TableCell>
                <TableCell className="text-right">
                    {isEditMode ? (
                        <Input type="number" name="investment" value={currentData?.investment || 0} onChange={handleInputChange} className="h-8" />
                    ) : (
                        formatCurrency(currentData?.investment || 0)
                    )}
                </TableCell>
                 <TableCell className="text-right">
                    {isEditMode ? (
                        <Input type="number" name="shares" value={currentData?.shares || 0} onChange={handleInputChange} className="h-8" />
                    ) : (
                        (currentData?.shares || 0).toLocaleString()
                    )}
                </TableCell>
                 <TableCell className="text-right">
                    {isEditMode ? (
                        <Input type="number" name="equityPercentage" value={currentData?.equityPercentage || 0} onChange={handleInputChange} className="h-8" step="0.01" />
                    ) : (
                        `${(currentData?.equityPercentage || 0).toFixed(2)}%`
                    )}
                </TableCell>
                <TableCell className="text-right">
                    {isEditMode ? (
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                            <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save</Button>
                        </div>
                    ) : (
                        <div className="flex gap-2 justify-end">
                             <Button variant="ghost" size="icon" onClick={() => handleEdit(entry as CapTableEntry)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently remove {entry.shareholderName} from the cap table.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(entry.id!)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Capitalization Table</CardTitle>
                        <CardDescription>Manage your startup's shareholders and equity distribution.</CardDescription>
                    </div>
                     <Button onClick={startAdding} disabled={isAdding || !!editingRow}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Shareholder
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Shareholder</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead className="text-right">Investment</TableHead>
                            <TableHead className="text-right">Shares</TableHead>
                            <TableHead className="text-right">Equity %</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(entry => renderRow(entry, editingRow === entry.id))}
                        {isAdding && renderRow(editedData!, true)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
