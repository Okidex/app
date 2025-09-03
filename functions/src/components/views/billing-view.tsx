
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from 'next/link';
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const features = [
    "Showcase your startup to our network of private investors",
    "Get priority placement in investor search results",
    "Access advanced analytics on who is viewing your profile",
    "Connect with unlimited co-founders and talent",
    "Receive priority customer support"
];

export default function BillingView() {
    
  return (
    <div className="mx-auto max-w-4xl space-y-8">
       <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Springboard your fundrasing with Oki+</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Unlock premium features to connect with investors and accelerate your growth.
        </p>
      </div>

        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Oki+ Premium Plans</CardTitle>
                <CardDescription>Our premium plan gives you the tools to connect with capital.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ul className="space-y-3">
                    {features.map(feature => (
                        <li key={feature} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
                
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Monthly Plan */}
                    <div className="rounded-lg border p-6 flex flex-col">
                        <h3 className="text-lg font-semibold">Monthly</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Flexibility for short-term needs.</p>
                        <div className="flex items-baseline gap-2 mt-4">
                             <span className="text-4xl font-bold">$10</span>
                             <span className="text-muted-foreground">billed monthly</span>
                        </div>
                        <Button asChild className="w-full mt-6">
                            <Link href="https://buy.stripe.com/test_eVa3d9bFx8pG5iM8wz">Choose Monthly</Link>
                        </Button>
                    </div>

                    {/* Yearly Plan */}
                     <div className="relative rounded-lg border-2 border-primary p-6 flex flex-col">
                        <Badge variant="default" className="absolute -top-4 left-4">Most Popular</Badge>
                        <h3 className="text-lg font-semibold">Yearly</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Commit for the long haul and save.</p>
                        <div className="flex items-baseline gap-2 mt-4">
                            <span className="text-4xl font-bold">$8.25</span>
                            <span className="text-muted-foreground">billed annually at $99 (save 17%)</span>
                        </div>
                         <Button asChild className="w-full mt-auto pt-6">
                            <Link href="https://buy.stripe.com/test_eVa3d9bFx8pG5iM8wz">Choose Yearly</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

