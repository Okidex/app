
"use client";

import { Startup } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface FundraisingGoalCardProps {
    startup: Startup;
}

const formatCurrency = (value: number) => {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
};

export default function FundraisingGoalCard({ startup }: FundraisingGoalCardProps) {
    const { fundraisingGoal = 0 } = startup;

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Fundraising Goal</CardTitle>
                    </div>
                    <Target className="w-6 h-6 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(fundraisingGoal)}</div>
            </CardContent>
        </Card>
    );
}
