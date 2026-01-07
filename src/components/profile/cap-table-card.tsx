
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CapTableEntry } from "@/lib/types";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CapTableCardProps {
    capTable: CapTableEntry[];
}

const formatCurrency = (value: number) => {
    if (value === 0) return "-";
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default function CapTableCard({ capTable }: CapTableCardProps) {
    const totalInvestment = capTable.reduce((acc, entry) => acc + entry.investment, 0);

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Capitalization Table</CardTitle>
                        <CardDescription>
                            Total Investment: <strong>{formatCurrency(totalInvestment)}</strong>
                        </CardDescription>
                    </div>
                    <Users className="w-6 h-6 text-muted-foreground" />
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {capTable.map(entry => (
                            <TableRow key={entry.id}>
                                <TableCell className="font-medium">{entry.shareholderName}</TableCell>
                                <TableCell><Badge variant="outline">{entry.investmentStage}</Badge></TableCell>
                                <TableCell className="text-right">{formatCurrency(entry.investment)}</TableCell>
                                <TableCell className="text-right">{entry.shares.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{entry.equityPercentage.toFixed(2)}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
