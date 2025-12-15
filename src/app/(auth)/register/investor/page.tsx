"use client";
export const dynamic = 'force-dynamic';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InvestorRegisterFormClient from "@/components/auth/investor-register-form";

export default function InvestorRegisterPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Setup your Investor Profile</CardTitle>
        <CardDescription>
          Complete your profile to start discovering high-potential startups and talent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InvestorRegisterFormClient />
      </CardContent>
    </Card>
  );
}
