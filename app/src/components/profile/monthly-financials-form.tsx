
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MonthlyFinancials } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { Pencil, Save, PlusCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateStartupData } from '@/lib/actions';

interface MonthlyFinancialsFormProps {
    startupId: string;
    initialData: MonthlyFinancials[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default function MonthlyFinancialsForm({ startupId, initialData }: MonthlyFinancialsFormProps) {
    const [data, setData] = useState<MonthlyFinancials[]>(initialData);
    const [editingRow, setEditingRow] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<MonthlyFinancials | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();
    
    const newMonthDefaultState: Omit<MonthlyFinancials, 'netIncome'> = {
        month: format(new Date(), 'yyyy-MM'),
        revenue: 0,
        expenses: 0,
        monthlyRecurringRevenue: 0,
        currentAssets: 0,
        currentLiabilities: 0,
        inventory: 0,
        totalAssets: 0,
        totalLiabilities: 0,
        shareholdersEquity: 0,
        ebit: 0,
        interestExpense: 0,
        cogs: 0,
        accountsReceivable: 0,
        headcount: 0,
    };

    const [newMonthData, setNewMonthData] = useState(newMonthDefaultState);

    const handleEdit = (monthData: MonthlyFinancials) => {
        setEditingRow(monthData.month);
        setEditedData({ ...monthData });
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditedData(null);
    };

    const handleSave = async () => {
        if (!editedData) return;
        const newData = data.map(d => d.month === editedData.month ? editedData : d);
        
        const result = await updateStartupData(startupId, { monthlyFinancials: newData });

        if (result.success) {
            setData(newData);
            toast({
                title: "Financials Updated",
                description: `Successfully updated financial data.`,
            });
        } else {
             toast({ title: "Error", description: result.error, variant: 'destructive' });
        }
        
        setEditingRow(null);
        setEditedData(null);
    };
    
    const handleAddMonth = async (e: React.FormEvent) => {
        e.preventDefault();
        const newEntry: MonthlyFinancials = {
            ...newMonthData,
            netIncome: newMonthData.revenue - newMonthData.expenses
        };
        
        const newData = [...data, newEntry].sort((a, b) => b.month.localeCompare(a.month));
        const result = await updateStartupData(startupId, { monthlyFinancials: newData });

        if (result.success) {
            setData(newData);
            toast({ title: "Month Added" });
            setNewMonthData(newMonthDefaultState);
            setIsAddDialogOpen(false);
        } else {
             toast({ title: "Error", description: result.error, variant: 'destructive' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedData) return;
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: Number(value) });
    };

    const handleNewDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewMonthData(prev => ({ ...prev, [name]: name === 'month' ? value : Number(value) }));
    };

    // REPAIRED: Safe rendering of cells to satisfy TS 5.7+ / Next.js 16
    const renderCell = (monthData: MonthlyFinancials, field: keyof MonthlyFinancials) => {
        const rawValue = monthData[field];

        if (editingRow === monthData.month && field !== 'month' && field !== 'netIncome') {
            return (
                <TableCell key={field}>
                    <Input
                        type="number"
                        name={field}
                        value={editedData ? (editedData[field] as number) : 0}
                        onChange={handleInputChange}
                        className="h-8 w-28 text-right"
                    />
                </TableCell>
            );
        }

        if (field === 'month') {
            const dateStr = typeof rawValue === 'string' ? `${rawValue}-02` : '';
            return (
                <TableCell key={field} className="font-medium sticky left-0 bg-card z-10">
                    {dateStr ? format(parseISO(dateStr), "MMM yyyy") : '-'}
                </TableCell>
            );
        }

        if (field === 'headcount') {
            return <TableCell key={field} className="text-right">{(rawValue as number ?? 0).toLocaleString()}</TableCell>;
        }

        if (typeof rawValue === 'number') {
            return <TableCell key={field} className="text-right">{formatCurrency(rawValue)}</TableCell>;
        }

        // Final fallback: Explicit string conversion to avoid the "conversion may be a mistake" error
        return <TableCell key={field} className="text-right">{String(rawValue ?? '-')}</TableCell>;
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Monthly Performance</CardTitle>
                    <CardDescription>Track and update your monthly metrics.</CardDescription>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Month</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add Monthly Financials</DialogTitle>
                            <DialogDescription>
                                Enter the financial data for a new month. Net income will be calculated automatically.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddMonth}>
                            <ScrollArea className="h-[60vh] p-4">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-month">Month</Label>
                                            <Input id="new-month" name="month" type="month" value={newMonthData.month} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-headcount">Headcount</Label>
                                            <Input id="new-headcount" name="headcount" type="number" value={newMonthData.headcount} onChange={handleNewDataChange} required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-revenue">Revenue</Label>
                                            <Input id="new-revenue" name="revenue" type="number" value={newMonthData.revenue} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-expenses">Expenses</Label>
                                            <Input id="new-expenses" name="expenses" type="number" value={newMonthData.expenses} onChange={handleNewDataChange} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-mrr">Monthly Recurring Revenue (MRR)</Label>
                                        <Input id="new-mrr" name="monthlyRecurringRevenue" type="number" value={newMonthData.monthlyRecurringRevenue} onChange={handleNewDataChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-cogs">Cost of Goods Sold (COGS)</Label>
                                        <Input id="new-cogs" name="cogs" type="number" value={newMonthData.cogs} onChange={handleNewDataChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-ebit">EBIT</Label>
                                        <Input id="new-ebit" name="ebit" type="number" value={newMonthData.ebit} onChange={handleNewDataChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-interestExpense">Interest Expense</Label>
                                        <Input id="new-interestExpense" name="interestExpense" type="number" value={newMonthData.interestExpense} onChange={handleNewDataChange} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-currentAssets">Current Assets</Label>
                                            <Input id="new-currentAssets" name="currentAssets" type="number" value={newMonthData.currentAssets} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-currentLiabilities">Current Liabilities</Label>
                                            <Input id="new-currentLiabilities" name="currentLiabilities" type="number" value={newMonthData.currentLiabilities} onChange={handleNewDataChange} required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-totalAssets">Total Assets</Label>
                                            <Input id="new-totalAssets" name="totalAssets" type="number" value={newMonthData.totalAssets} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-totalLiabilities">Total Liabilities</Label>
                                            <Input id="new-totalLiabilities" name="totalLiabilities" type="number" value={newMonthData.totalLiabilities} onChange={handleNewDataChange} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-shareholdersEquity">Shareholder's Equity</Label>
                                        <Input id="new-shareholdersEquity" name="shareholdersEquity" type="number" value={newMonthData.shareholdersEquity} onChange={handleNewDataChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-accountsReceivable">Accounts Receivable</Label>
                                        <Input id="new-accountsReceivable" name="accountsReceivable" type="number" value={newMonthData.accountsReceivable} onChange={handleNewDataChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-inventory">Inventory</Label>
                                        <Input id="new-inventory" name="inventory" type="number" value={newMonthData.inventory || ''} onChange={handleNewDataChange} placeholder="Optional" />
                                    </div>
                                </div>
                            </ScrollArea>
                            <DialogFooter className="pt-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Add Month</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="sticky left-0 bg-muted">Month</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                                <TableHead className="text-right">Expenses</TableHead>
                                <TableHead className="text-right">Net Income</TableHead>
                                <TableHead className="text-right">Headcount</TableHead>
                                <TableHead className="text-center w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.month}>
                                    {renderCell(row, 'month')}
                                    {renderCell(row, 'revenue')}
                                    {renderCell(row, 'expenses')}
                                    {renderCell(row, 'netIncome')}
                                    {renderCell(row, 'headcount')}
                                    <TableCell className="text-center">
                                        {editingRow === row.month ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8 text-green-600">
                                                    <Save className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8 text-red-600">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button size="icon" variant="ghost" onClick={() => handleEdit(row)} className="h-8 w-8">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
