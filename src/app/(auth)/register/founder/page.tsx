"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FounderRegisterFormClient from "@/components/auth/founder-register-form";

export const dynamic = 'force-dynamic';

export default function FounderRegisterPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Setup your Founder Profile</CardTitle>
        <CardDescription>
          Tell us about your startup. This information will help investors and talent find you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FounderRegisterFormClient />
      </CardContent>
    </Card>
  );
}
