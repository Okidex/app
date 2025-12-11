
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MonthlyFinancials } from "@/lib/types";
import { format } from "date-fns";
import { Pencil, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
        // In a real app, you would also make an API call to save the data.
        toast({
            title: "Financials Updated",
            description: `Successfully updated financial data for ${format(new Date(editedData.month + '-02'), "MMMM yyyy")}.`,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedData) return;
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: Number(value) });
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
                        className="h-8"
                    />
                </TableCell>
            );
        }
        if (field === 'month') {
            return <TableCell className="font-medium">{format(new Date(monthData.month + '-02'), "MMMM yyyy")}</TableCell>
        }
        return <TableCell>{formatCurrency(monthData[field] as number)}</TableCell>;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>
                    Track your business's monthly financial performance. This data informs your annual overview.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Expenses</TableHead>
                            <TableHead>Net Income</TableHead>
                            <TableHead>MRR</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
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
                                <TableCell className="text-right">
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
