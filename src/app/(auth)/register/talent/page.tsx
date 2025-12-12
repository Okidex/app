"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = 'force-dynamic';

const TalentRegisterFormClient = dynamic(
    () => import("@/components/auth/talent-register-form"),
    {
      ssr: false,
      loading: () => <Skeleton className="h-[500px] w-full" />,
    }
);

export default function TalentRegisterPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Setup your Talent Profile</CardTitle>
        <CardDescription>
          Highlight your skills and experience to connect with innovative startups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TalentRegisterFormClient />
      </CardContent>
    </Card>
  );
}