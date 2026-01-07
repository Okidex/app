
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useRouter, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { FounderProfile, Startup } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getStartupById, updateStartupData } from "@/lib/actions";
import { useUser } from '@/firebase';
import Link from "next/link";
import { Star } from "lucide-react";

export default function FundraisingPage() {
  const { user, isUserLoading } = useUser();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return;
    if (!user || user.role !== 'founder') {
      notFound();
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const founderProfile = user.profile as FounderProfile;
      if (founderProfile.companyId) {
        const startupData = await getStartupById(founderProfile.companyId);
        setStartup(startupData);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, isUserLoading]);

  if (isUserLoading || loading || !user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }
  
  if (!startup) {
      return <div>Startup not found</div>;
  }
  
  const isPremiumFounder = (user.profile as FounderProfile).isPremium;

  const handleFundraisingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startup) return;
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    const updateData: Partial<Startup> = {
      fundraisingGoal: Number(data.fundraisingGoal),
      showFundraisingProgress: data.showFundraisingProgress === 'on',
    };

    await updateStartupData(startup.id, updateData);
    toast({ title: "Fundraising Details Saved" });
    setStartup(prev => prev ? { ...prev, ...updateData } : null);
    router.refresh();
  };
  
  if (!isPremiumFounder) {
    return (
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Star className="w-8 h-8" />
                </div>
                <CardTitle>Unlock Your Fundraising Potential with Oki+</CardTitle>
                <CardDescription>
                    Feature your startup to a curated network of private investors actively looking to fund, mentor, and connect with ambitious founders. Upgrade to Oki+ to make your fundraising goals visible and get discovered.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg">
                    <Link href="/settings/billing">Upgrade to Oki+</Link>
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleFundraisingSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Fundraising</CardTitle>
            <CardDescription>Manage your fundraising goal and visibility.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fundraisingGoal">Fundraising Goal ($)</Label>
              <Input id="fundraisingGoal" name="fundraisingGoal" type="number" defaultValue={startup.fundraisingGoal || ''} placeholder="e.g., 500000" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="showFundraisingProgress" name="showFundraisingProgress" defaultChecked={startup.showFundraisingProgress} />
              <Label htmlFor="showFundraisingProgress">Show fundraising progress bar on my profile</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Fundraising Details</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
