
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MonthlyFinancials } from "@/lib/types";
import { format } from "date-fns";
import { Pencil, Save, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MonthlyFinancialsFormProps {
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

export default function MonthlyFinancialsForm({ initialData }: MonthlyFinancialsFormProps) {
    const [data, setData] = useState<MonthlyFinancials[]>(initialData);
    const [editingRow, setEditingRow] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<MonthlyFinancials | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    
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
    const { toast } = useToast();

    const handleEdit = (monthData: MonthlyFinancials) => {
        setEditingRow(monthData.month);
        setEditedData(monthData);
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditedData(null);
    };

    const handleSave = () => {
        if (!editedData) return;
        setData(data.map(d => d.month === editedData.month ? editedData : d));
        setEditingRow(null);
        setEditedData(null);
        toast({
            title: "Financials Updated",
            description: `Successfully updated financial data for ${format(new Date(editedData.month + '-02'), "MMMM yyyy")}.`,
        });
    };
    
    const handleAddMonth = (e: React.FormEvent) => {
        e.preventDefault();

        const newEntry: MonthlyFinancials = {
            ...newMonthData,
            netIncome: newMonthData.revenue - newMonthData.expenses
        };
        
        setData(prevData => [...prevData, newEntry].sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime()));
        
        toast({
            title: "Month Added",
            description: `Financials for ${format(new Date(newMonthData.month + '-02'), "MMMM yyyy")} have been added.`,
        });
        
        setNewMonthData(newMonthDefaultState);
        setIsAddDialogOpen(false);
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

    const renderCell = (monthData: MonthlyFinancials, field: keyof MonthlyFinancials) => {
        if (editingRow === monthData.month) {
            return (
                <TableCell>
                    <Input
                        type="number"
                        name={field}
                        value={editedData?.[field] as number || 0}
                        onChange={handleInputChange}
                        className="h-8 w-28"
                    />
                </TableCell>
            );
        }
        if (field === 'month') {
            return <TableCell className="font-medium sticky left-0 bg-card">{format(new Date(monthData.month + '-02'), "MMMM yyyy")}</TableCell>
        }
        if (typeof monthData[field] === 'number') {
            return <TableCell className="text-right">{formatCurrency(monthData[field] as number)}</TableCell>;
        }
        return <TableCell className="text-right">{monthData[field] as string}</TableCell>;
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Monthly Performance</CardTitle>
                        <CardDescription>
                            Track your business's monthly financial performance. This data informs your annual overview.
                        </CardDescription>
                    </div>
                     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Month</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add Monthly Financials</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddMonth}>
                                <ScrollArea className="h-[60vh]">
                                <div className="space-y-6 p-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="month-picker">Month</Label>
                                        <Input
                                            id="month-picker"
                                            type="month"
                                            name="month"
                                            value={newMonthData.month}
                                            onChange={handleNewDataChange}
                                            required
                                        />
                                    </div>
                                    <h4 className="text-lg font-semibold border-b pb-2">Core Financials</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="revenue">Revenue (Net Sales)</Label>
                                            <Input id="revenue" name="revenue" type="number" value={newMonthData.revenue} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="expenses">Total Expenses</Label>
                                            <Input id="expenses" name="expenses" type="number" value={newMonthData.expenses} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="monthlyRecurringRevenue">MRR</Label>
                                            <Input id="monthlyRecurringRevenue" name="monthlyRecurringRevenue" type="number" value={newMonthData.monthlyRecurringRevenue} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cogs">Cost of Goods Sold (COGS)</Label>
                                            <Input id="cogs" name="cogs" type="number" value={newMonthData.cogs} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="ebit">EBIT</Label>
                                            <Input id="ebit" name="ebit" type="number" value={newMonthData.ebit} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="interestExpense">Interest Expense</Label>
                                            <Input id="interestExpense" name="interestExpense" type="number" value={newMonthData.interestExpense} onChange={handleNewDataChange} required />
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-semibold border-b pb-2">Balance Sheet</h4>
                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentAssets">Current Assets</Label>
                                            <Input id="currentAssets" name="currentAssets" type="number" value={newMonthData.currentAssets} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="totalAssets">Total Assets</Label>
                                            <Input id="totalAssets" name="totalAssets" type="number" value={newMonthData.totalAssets} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="inventory">Inventory</Label>
                                            <Input id="inventory" name="inventory" type="number" value={newMonthData.inventory} onChange={handleNewDataChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="currentLiabilities">Current Liabilities</Label>
                                            <Input id="currentLiabilities" name="currentLiabilities" type="number" value={newMonthData.currentLiabilities} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="totalLiabilities">Total Liabilities</Label>
                                            <Input id="totalLiabilities" name="totalLiabilities" type="number" value={newMonthData.totalLiabilities} onChange={handleNewDataChange} required />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="shareholdersEquity">Shareholders' Equity</Label>
                                            <Input id="shareholdersEquity" name="shareholdersEquity" type="number" value={newMonthData.shareholdersEquity} onChange={handleNewDataChange} required />
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-semibold border-b pb-2">Other Metrics</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="accountsReceivable">Avg. Accounts Receivable</Label>
                                            <Input id="accountsReceivable" name="accountsReceivable" type="number" value={newMonthData.accountsReceivable} onChange={handleNewDataChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="headcount">Employee Headcount</Label>
                                            <Input id="headcount" name="headcount" type="number" value={newMonthData.headcount} onChange={handleNewDataChange} required />
                                        </div>
                                    </div>
                                </div>
                                </ScrollArea>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                                    <Button type="submit">Add Financials</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="sticky left-0 bg-card">Month</TableHead>
                            <TableHead className="text-right">Revenue</TableHead>
                            <TableHead className="text-right">Expenses</TableHead>
                            <TableHead className="text-right">Net Income</TableHead>
                            <TableHead className="text-right">MRR</TableHead>
                            <TableHead className="text-right">Current Assets</TableHead>
                            <TableHead className="text-right">Current Liabilities</TableHead>
                            <TableHead className="text-right">Inventory</TableHead>
                            <TableHead className="text-right">Total Assets</TableHead>
                            <TableHead className="text-right">Total Liabilities</TableHead>
                            <TableHead className="text-right">Equity</TableHead>
                            <TableHead className="text-right">EBIT</TableHead>
                            <TableHead className="text-right">Interest Expense</TableHead>
                            <TableHead className="text-right">COGS</TableHead>
                            <TableHead className="text-right">Accts. Receivable</TableHead>
                            <TableHead className="text-right">Headcount</TableHead>
                            <TableHead className="text-right sticky right-0 bg-card">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(monthData => (
                            <TableRow key={monthData.month}>
                                {renderCell(monthData, 'month')}
                                {renderCell(monthData, 'revenue')}
                                {renderCell(monthData, 'expenses')}
                                {renderCell(monthData, 'netIncome')}
                                {renderCell(monthData, 'monthlyRecurringRevenue')}
                                {renderCell(monthData, 'currentAssets')}
                                {renderCell(monthData, 'currentLiabilities')}
                                {renderCell(monthData, 'inventory')}
                                {renderCell(monthData, 'totalAssets')}
                                {renderCell(monthData, 'totalLiabilities')}
                                {renderCell(monthData, 'shareholdersEquity')}
                                {renderCell(monthData, 'ebit')}
                                {renderCell(monthData, 'interestExpense')}
                                {renderCell(monthData, 'cogs')}
                                {renderCell(monthData, 'accountsReceivable')}
                                {renderCell(monthData, 'headcount')}
                                <TableCell className="text-right sticky right-0 bg-card">
                                    {editingRow === monthData.month ? (
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                                            <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save</Button>
                                        </div>
                                    ) : (
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(monthData)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
