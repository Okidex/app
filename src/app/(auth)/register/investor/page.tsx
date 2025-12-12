"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamicClient from "next/dynamic"; // Renamed the import alias
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = 'force-dynamic'; // This line is fine

const InvestorRegisterFormClient = dynamicClient( // Used the new alias
  () => import("@/components/auth/investor-register-form"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full" />,
  }
);

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
