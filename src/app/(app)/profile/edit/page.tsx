
"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { getStartupById } from "@/lib/actions";
import { founderObjectives } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Startup } from "@/lib/types";

// A simple skeleton loader for the page
function SkeletonLoader() {
    return (
        <div className="space-y-8">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
    );
}

export default function GeneralProfileEditPage() {
  const { user, isUserLoading, refreshUser } = useUser();
  const auth = useAuth();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loadingStartup, setLoadingStartup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const isFounder = user?.role === 'founder';
  const isInvestor = user?.role === 'investor';
  const isTalent = user?.role === 'talent';

  useEffect(() => {
    async function fetchStartupData() {
        if (isFounder && (user?.profile as any)?.companyId) {
            setLoadingStartup(true);
            const startupData = await getStartupById((user.profile as any).companyId);
            setStartup(startupData);
            setLoadingStartup(false);
        } else {
            setLoadingStartup(false);
        }
    }
    if (!isUserLoading && user) {
        fetchStartupData();
    }
  }, [user, isUserLoading, isFounder]);


  const handleGeneralInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !auth?.currentUser) {
        toast({ title: "Not Authenticated", description: "Please log in to save.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload: any = {
      name: formData.get("name"),
      profile: { ...user.profile }
    };

    if (isFounder) {
      payload.profile = {
        ...payload.profile,
        title: formData.get("title"),
        about: formData.get("about"),
        objectives: founderObjectives.filter(obj => formData.get(`obj-${obj.id}`)).map(obj => obj.id),
      };
      payload.startupData = {
        id: (user.profile as any).companyId,
        companyName: formData.get("companyName"),
        industry: formData.get("industry"),
        description: formData.get("description"),
        website: formData.get("website"),
      };
    }

    if (isInvestor) {
      payload.profile = {
        ...payload.profile,
        companyName: formData.get("companyName"),
        investorType: formData.get("investorType"),
        about: formData.get("about"),
        investmentInterests: (formData.get("interests") as string).split(",").map(s => s.trim()),
        isHiring: formData.get("isHiring") === "on",
      };
    }

    if (isTalent) {
      payload.profile = {
        ...payload.profile,
        headline: formData.get("headline"),
        skills: (formData.get("skills") as string).split(",").map(s => s.trim()),
        experience: formData.get("experience"),
      };
    }

    try {
      const idToken = await auth.currentUser.getIdToken();
      
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || "An unexpected error occurred.");
      }
      
      toast({ title: "Profile Updated" });
      refreshUser();

    } catch (error: any) {
      toast({ title: "Save Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserLoading || !user || (isFounder && loadingStartup)) return <SkeletonLoader />;

  return (
    <form onSubmit={handleGeneralInfoSubmit} className="space-y-8">
      <Card>
        <CardHeader><CardTitle>Core Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Full Name</Label>
                <Input name="name" defaultValue={user.name} />
             </div>
             {isFounder && (
               <div className="space-y-2">
                  <Label>Your Title</Label>
                  <Input name="title" defaultValue={(user.profile as any)?.title || ''} />
               </div>
             )}
           </div>
           <div className="space-y-2">
              <Label>Bio / About</Label>
              <Textarea name="about" defaultValue={(user.profile as any)?.about || ''} />
           </div>
        </CardContent>
      </Card>

      {isFounder && (
        <Card>
          <CardHeader>
            <CardTitle>Startup Details</CardTitle>
            <CardDescription>This information is about your company.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input name="companyName" defaultValue={startup?.companyName || ''} />
                </div>
                <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input name="industry" defaultValue={startup?.industry || ''} />
                </div>
             </div>
             <div className="space-y-2">
                <Label>Website</Label>
                <Input name="website" type="url" defaultValue={startup?.website || ''} />
             </div>
             <div className="space-y-2">
                <Label>Company Description</Label>
                <Textarea name="description" defaultValue={startup?.description || ''} />
             </div>
          </CardContent>
        </Card>
      )}

      {isFounder && (
          <Card>
            <CardHeader><CardTitle>Your Objectives</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
            {founderObjectives.map(obj => (
                <div key={obj.id} className="flex items-center space-x-2">
                <Checkbox id={`obj-${obj.id}`} name={`obj-${obj.id}`} defaultChecked={(user.profile as any)?.objectives?.includes(obj.id)} />
                <Label htmlFor={`obj-${obj.id}`} className="font-normal">{obj.label}</Label>
                </div>
            ))}
            </CardContent>
        </Card>
      )}


      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Changes"}
      </Button>
    </form>
  );
}
