
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function LockedFinancialsCard() {
    return (
        <Card className="border-dashed border-2 text-center">
            <CardHeader>
                <div className="mx-auto bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8" />
                </div>
                <CardTitle>Financials & Cap Table Restricted</CardTitle>
                <CardDescription>
                    Detailed financial performance and capitalization tables are sensitive. To protect founder privacy, this information is only available after a connection is made.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button>
                    Connect
                </Button>
            </CardContent>
        </Card>
    );
}
