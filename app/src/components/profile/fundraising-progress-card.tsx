
"use client";

import { Startup } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface FundraisingProgressCardProps {
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

export default function FundraisingProgressCard({ startup }: FundraisingProgressCardProps) {
    const { fundraisingGoal = 0, fundsRaised = 0, stage } = startup;

    const progressPercentage = fundraisingGoal > 0 ? (fundsRaised / fundraisingGoal) * 100 : 0;

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Fundraising Goal</CardTitle>
                        <CardDescription>Currently raising a <strong>{stage}</strong> round.</CardDescription>
                    </div>
                    <Target className="w-6 h-6 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <Progress value={progressPercentage} />
                <div className="flex justify-between text-sm font-medium">
                    <span>{formatCurrency(fundsRaised)} raised</span>
                    <span className="text-muted-foreground">Goal: {formatCurrency(fundraisingGoal)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
