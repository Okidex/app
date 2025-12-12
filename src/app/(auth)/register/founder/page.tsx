"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = 'force-dynamic';

const FounderRegisterFormClient = dynamic(
  () => import("@/components/auth/founder-register-form"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full" />,
  }
);

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