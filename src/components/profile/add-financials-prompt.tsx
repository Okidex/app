
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import Link from "next/link";

export default function AddFinancialsPrompt() {
    return (
        <Card className="border-dashed border-2 text-center">
            <CardHeader>
                <div className="mx-auto bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <DollarSign className="w-8 h-8" />
                </div>
                <CardTitle>Complete Your Financial Profile</CardTitle>
                <CardDescription>
                    Attract investors by providing a clear picture of your startup's financial health. Add your cap table and monthly financials to get started.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
                <Button asChild variant="default">
                    <Link href="/profile/edit/captable">Manage Cap Table</Link>
                </Button>
                 <Button asChild variant="outline">
                    <Link href="/profile/edit/financials">Add Financials</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
