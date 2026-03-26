"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { getStartupById } from "@/lib/actions";
import { founderObjectives, investmentStages, investorSeekingOptions } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, PlusCircle, Trash } from "lucide-react";
import { Startup, Exit, InvestorProfile, TalentProfile } from "@/lib/types";

// A simple skeleton loader for the page
function SkeletonLoader() {
    return (
        <div className="space-y-8 p-6">
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
  
  // Investor specific state
  const [exits, setExits] = useState<Exit[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExit, setNewExit] = useState<Exit>({ companyName: '', companyUrl: '' });

  const { toast } = useToast();

  const isFounder = user?.role === 'founder';
  const isInvestor = user?.role === 'investor';
  const isTalent = user?.role === 'talent';

  useEffect(() => {
    async function fetchStartupData() {
        if (isFounder && (user?.profile as any)?.companyId) {
            setLoadingStartup(true);
            try {
                const startupData = await getStartupById((user.profile as any).companyId);
                setStartup(startupData);
            } catch (err) {
                console.error("Failed to fetch startup:", err);
            } finally {
                setLoadingStartup(false);
            }
        } else {
            setLoadingStartup(false);
        }
    }
    if (!isUserLoading && user) {
        fetchStartupData();
        if (isInvestor) {
            setExits((user.profile as any)?.exits || []);
        }
    }
  }, [user, isUserLoading, isFounder, isInvestor]);


  const handleAddExit = () => {
    if (!newExit.companyName || !newExit.companyUrl) {
      toast({ title: "Missing Info", variant: "destructive" });
      return;
    }
    setExits([...exits, newExit]);
    setNewExit({ companyName: '', companyUrl: '' });
    setIsAddDialogOpen(false);
  };

  const handleRemoveExit = (companyName: string) => {
    setExits(exits.filter(p => p.companyName !== companyName));
  };

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
      const investmentStagesChecked = investmentStages.filter(stage => formData.get(`stage-${stage}`));
      const seeking: string[] = investorSeekingOptions
          .filter(option => option.id !== 'hiring')
          .map(option => formData.get(`seeking-${option.id}`) ? option.label : null)
          .filter((label): label is string => label !== null);

      payload.profile = {
        ...payload.profile,
        companyName: formData.get("companyName"),
        companyUrl: formData.get("companyUrl"),
        investorType: formData.get("investorType"),
        about: formData.get("about"),
        investmentInterests: (formData.get("interests") as string || "").split(",").map(s => s.trim()).filter(Boolean),
        investmentStages: investmentStagesChecked,
        seeking: seeking,
        isHiring: formData.get("isHiring") === "on",
        exits: exits,
      };
      payload.isHiring = payload.profile.isHiring;
    }

    if (isTalent) {
      payload.profile = {
        ...payload.profile,
        headline: formData.get("headline"),
        subRole: formData.get("subRole"),
        skills: (formData.get("skills") as string || "").split(",").map(s => s.trim()).filter(Boolean),
        organization: formData.get("organization"),
        experience: formData.get("experience"),
        education: formData.get("education"),
        linkedin: formData.get("linkedin"),
        github: formData.get("github"),
      };
      payload.isLookingForCoFounder = formData.get("isLookingForCoFounder") === "on";
      payload.isNetworking = formData.get("isNetworking") === "on";
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
      
      // FIXED: Added optional chaining to resolve the Type Error
      refreshUser?.();

    } catch (error: any) {
      toast({ title: "Save Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserLoading || !user || (isFounder && loadingStartup)) return <SkeletonLoader />;

  return (
    <div className="container max-w-4xl py-10">
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

        {isInvestor && (
            <Card>
                <CardHeader>
                    <CardTitle>Investor Profile Details</CardTitle>
                    <CardDescription>Your investment focus and background.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input name="companyName" defaultValue={(user.profile as any)?.companyName || ''} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyUrl">Company URL</Label>
                            <Input name="companyUrl" type="url" defaultValue={(user.profile as any)?.companyUrl || ''} />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Investor Type</Label>
                        <Select name="investorType" defaultValue={(user.profile as any)?.investorType || ''}>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Angel">Angel</SelectItem>
                                <SelectItem value="Venture Capitalist">Venture Capitalist</SelectItem>
                                <SelectItem value="Crowdfunder">Crowdfunder</SelectItem>
                                <SelectItem value="Private Equity">Private Equity</SelectItem>
                                <SelectItem value="GP">General Partner (GP)</SelectItem>
                                <SelectItem value="LP">Limited Partner (LP)</SelectItem>
                                <SelectItem value="Family Office Administrator">Family Office Administrator</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Investment Interests (Comma separated)</Label>
                        <Input name="interests" defaultValue={((user.profile as any)?.investmentInterests || []).join(", ")} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center mb-2">
                            <Label>Exits</Label>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                              <DialogTrigger asChild>
                                <Button type="button" variant="outline" size="sm"><PlusCircle className="h-4 w-4 mr-2" />Add Exit</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader><DialogTitle>Add Exit</DialogTitle></DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Company Name</Label>
                                        <Input value={newExit.companyName} onChange={(e) => setNewExit({...newExit, companyName: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Company URL</Label>
                                        <Input value={newExit.companyUrl} onChange={(e) => setNewExit({...newExit, companyUrl: e.target.value})} />
                                    </div>
                                    <Button type="button" onClick={handleAddExit} className="w-full">Add</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {exits.map((exit) => (
                                <Card key={exit.companyName} className="p-3 flex justify-between items-center">
                                    <span>{exit.companyName}</span>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveExit(exit.companyName)}>
                                        <Trash className="h-4 w-4 text-destructive" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Investment Stages</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                            {investmentStages.map((stage) => (
                                <div key={stage} className="flex items-center space-x-2">
                                    <Checkbox id={`stage-${stage}`} name={`stage-${stage}`} defaultChecked={(user.profile as any)?.investmentStages?.includes(stage)} />
                                    <Label htmlFor={`stage-${stage}`} className="text-sm font-normal cursor-pointer capitalize">{stage}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <Label>I am open to...</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {investorSeekingOptions.map(option => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={option.id === 'hiring' ? 'isHiring' : `seeking-${option.id}`}
                                        name={option.id === 'hiring' ? 'isHiring' : `seeking-${option.id}`}
                                        defaultChecked={option.id === 'hiring' ? user.isHiring : (user.profile as any)?.seeking?.includes(option.label)}
                                    />
                                    <Label htmlFor={option.id === 'hiring' ? 'isHiring' : `seeking-${option.id}`} className="font-normal">{option.label}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                </CardContent>
            </Card>
        )}

        {isTalent && (
            <Card>
                <CardHeader>
                    <CardTitle>Talent Profile Details</CardTitle>
                    <CardDescription>Your skills, experience, and background.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="headline">Headline</Label>
                            <Input name="headline" defaultValue={(user.profile as any)?.headline || ''} placeholder="e.g., Fractional Marketing Leader" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subRole">Role Type</Label>
                            <Select name="subRole" defaultValue={(user.profile as any)?.subRole || ''}>
                                <SelectTrigger><SelectValue placeholder="Select role type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="co-founder">Co-founder</SelectItem>
                                    <SelectItem value="employee">Employee</SelectItem>
                                    <SelectItem value="vendor">Vendor / Agency</SelectItem>
                                    <SelectItem value="fractional-leader">Fractional Leader</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Skills (Comma separated)</Label>
                            <Input name="skills" defaultValue={((user.profile as any)?.skills || []).join(", ")} placeholder="e.g., React, Node.js" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="organization">Current/Latest Organization</Label>
                            <Input name="organization" defaultValue={(user.profile as any)?.organization || ''} placeholder="e.g., Acme Inc." />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Textarea name="experience" defaultValue={(user.profile as any)?.experience || ''} placeholder="Professional summary..." className="min-h-[100px]" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="education">Education & Certifications</Label>
                        <Textarea name="education" defaultValue={(user.profile as any)?.education || ''} placeholder="Degrees or certifications..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                            <Input name="linkedin" type="url" defaultValue={(user.profile as any)?.linkedin || ''} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub Profile URL (Optional)</Label>
                            <Input name="github" type="url" defaultValue={(user.profile as any)?.github || ''} placeholder="https://..." />
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2 bg-muted/30 p-4 rounded-lg">
                                <Checkbox
                                    id="isLookingForCoFounder"
                                    name="isLookingForCoFounder"
                                    defaultChecked={user.isLookingForCoFounder}
                                />
                                <Label htmlFor="isLookingForCoFounder" className="font-medium">Actively seeking a co-founder</Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-muted/30 p-4 rounded-lg">
                                <Checkbox
                                    id="isNetworking"
                                    name="isNetworking"
                                    defaultChecked={user.isNetworking}
                                />
                                <Label htmlFor="isNetworking" className="font-medium">Open to networking</Label>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
        </form>
    </div>
  );
}
