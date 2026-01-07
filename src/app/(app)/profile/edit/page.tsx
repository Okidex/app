
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import ProfilePictureUploader from "@/components/profile/profile-picture-uploader";
import MonthlyFinancialsForm from "@/components/profile/monthly-financials-form";
import { FounderProfile, InvestorProfile, Startup, TalentProfile, FullUserProfile, Profile, FounderObjective } from "@/lib/types";
import LinkedInPopulator from "@/components/profile/linkedin-populator";
import BusinessLogoUploader from "@/components/profile/business-logo-uploader";
import CapTableForm from "@/components/profile/cap-table-form";
import FoundersForm from "@/components/profile/founders-form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useRouter, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import PortfolioForm from "@/components/profile/portfolio-form";
import ExitsForm from "@/components/profile/exits-form";
import { investmentStages, founderObjectives } from "@/lib/constants";
import IncorporationDetailsForm from "@/components/profile/incorporation-details-form";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUserProfile, getStartupById, getUsersByIds, updateStartupData } from "@/lib/actions";
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


export default function ProfileEditPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [founders, setFounders] = useState<FullUserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSeekingCoFounder, setIsSeekingCoFounder] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [isFractionalLeader, setIsFractionalLeader] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      notFound();
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      let tempStartup: Startup | null = null;
      let tempFounders: FullUserProfile[] = [];

      if (user.role === 'founder') {
        const founderProfile = user.profile as FounderProfile;
        if (founderProfile.companyId && db) {
          const startupData = await getStartupById(founderProfile.companyId);
          if (startupData) {
            tempStartup = startupData;
            if (tempStartup?.founderIds) {
               const founderProfiles = await getUsersByIds(tempStartup.founderIds);
               tempFounders = founderProfiles.filter((p): p is FullUserProfile => p !== null);
            }
          }
        }
      }
      setStartup(tempStartup);
      setFounders(tempFounders);
      setLoading(false);
    };

    fetchData();
  }, [user, isUserLoading, db]);

  useEffect(() => {
    if (user) {
      if (user.role === 'talent') {
        const talentProfile = user.profile as TalentProfile;
        setIsSeekingCoFounder(talentProfile?.isSeekingCoFounder ?? false);
        setIsVendor(talentProfile?.subRole === 'vendor');
        setIsFractionalLeader(talentProfile?.subRole === 'fractional-leader');
      } else if (user.role === 'founder') {
        const founderProfile = user.profile as FounderProfile;
        setIsSeekingCoFounder(founderProfile?.isSeekingCoFounder ?? false);
      }
    }
  }, [user]);

  if (isUserLoading || loading || !user) {
     return (
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Separator />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-8">
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>
                <div className="md:col-span-2 space-y-6">
                    <Skeleton className="h-[500px] w-full rounded-lg"/>
                </div>
           </div>
        </div>
    )
  }
  
  const isFounder = user.role === 'founder';
  const founderProfile = isFounder ? user.profile as FounderProfile : undefined;
  const isInvestor = user.role === 'investor';
  const isTalent = user.role === 'talent';
  const investorProfile = isInvestor ? user.profile as InvestorProfile : undefined;
  const talentProfile = isTalent ? user.profile as TalentProfile : undefined;
  const isIncorporated = startup?.incorporationDetails.isIncorporated ?? false;

  const handleGeneralInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db) return;

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const objectives: FounderObjective[] = founderObjectives
        .map(obj => formData.get(`objective-${obj.id}`) as FounderObjective)
        .filter(Boolean);

    if (isFounder && founderProfile && startup) {
        const profileUpdateData: Partial<FounderProfile> = {
            isSeekingCoFounder: formData.get('is-seeking-cofounder') === 'on',
            objectives: objectives,
        };
        const startupUpdateData: Partial<Startup> = {
            companyName: data.companyName,
            tagline: data.tagline,
            industry: data.industry,
            stage: data.stage,
            website: data.website,
            description: data.description,
        };

        await updateStartupData(startup.id, startupUpdateData);
        await updateUserProfile(user.id, profileUpdateData);
    }
    
    if (isInvestor && investorProfile) {
        const profileUpdateData: Partial<InvestorProfile> = {
            companyName: data.investorCompanyName,
            companyUrl: data.investorCompanyUrl,
            investorType: data.investorType,
            about: data.about,
        };
        await updateUserProfile(user.id, profileUpdateData);
    }

    if (isTalent && talentProfile) {
        let subRole = talentProfile.subRole;
        if (isVendor) subRole = 'vendor';
        else if (isFractionalLeader) subRole = 'fractional-leader';
        else if (subRole === 'vendor' || subRole === 'fractional-leader') {
            subRole = isSeekingCoFounder ? 'co-founder' : 'employee';
        }

        const profileUpdateData: Partial<TalentProfile> = {
            headline: data.headline,
            about: data.about,
            skills: data.skills.split(',').map((s: string) => s.trim()),
            organization: data.organization,
            experience: data.experience,
            education: data.education,
            isSeekingCoFounder,
            subRole,
        };
        await updateUserProfile(user.id, profileUpdateData);
    }
    
    toast({ title: "Profile Saved", description: "Your general information has been updated." });
    router.refresh();
  };

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Edit Profile</h1>
        <p className="text-muted-foreground">This is how others will see you on the site. Update your information to attract the right connections.</p>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          {isFounder && startup && (
            <Card>
                <CardHeader>
                    <CardTitle>Business Logo</CardTitle>
                    <CardDescription>Upload a logo for your company.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BusinessLogoUploader initialLogoUrl={startup.companyLogoUrl} initialName={startup.companyName} />
                </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload a picture for your profile.</CardDescription>
            </CardHeader>
            <CardContent>
                <ProfilePictureUploader initialAvatarUrl={user.avatarUrl} initialName={user.name} />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleGeneralInfoSubmit}>
            <Card>
                 <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Update your personal and company details, or populate from your LinkedIn profile.</CardDescription>
                     <div className="pt-4">
                        <LinkedInPopulator />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={user.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={user.email} disabled />
                        </div>
                    </div>
                     {isFounder && startup && (
                        <>
                             <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input id="companyName" name="companyName" defaultValue={startup.companyName} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="tagline">Company Tagline</Label>
                                <Input id="tagline" name="tagline" defaultValue={startup.tagline} />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input id="industry" name="industry" defaultValue={startup.industry} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stage">Stage</Label>
                                    <Select name="stage" defaultValue={startup.stage}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your startup's stage" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {investmentStages.map(stage => (
                                                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" name="website" defaultValue={startup.website} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="description">Company Description</Label>
                                <Textarea id="description" name="description" defaultValue={startup.description} />
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                    id="is-seeking-cofounder"
                                    name="is-seeking-cofounder"
                                    checked={isSeekingCoFounder}
                                    onCheckedChange={setIsSeekingCoFounder}
                                />
                                <Label htmlFor="is-seeking-cofounder">Open to Co-founder Opportunities</Label>
                            </div>
                             <div className="space-y-4 pt-4">
                                <Label>Objectives</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    {founderObjectives.map(objective => (
                                        <div key={objective.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`objective-${objective.id}`}
                                                name={`objective-${objective.id}`}
                                                value={objective.id}
                                                defaultChecked={founderProfile?.objectives?.includes(objective.id)}
                                            />
                                            <Label htmlFor={`objective-${objective.id}`}>{objective.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    {isInvestor && investorProfile && (
                        <>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="investorCompanyName">Company Name</Label>
                                    <Input id="investorCompanyName" name="investorCompanyName" defaultValue={investorProfile.companyName} placeholder="e.g. Smith Ventures"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="investorCompanyUrl">Company URL</Label>
                                    <Input id="investorCompanyUrl" name="investorCompanyUrl" defaultValue={investorProfile.companyUrl} placeholder="https://smith.ventures" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="investorType">Investor Type</Label>
                                <Select name="investorType" defaultValue={investorProfile.investorType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your investor type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="GP">General Partner (GP)</SelectItem>
                                        <SelectItem value="LP">Limited Partner (LP)</SelectItem>
                                        <SelectItem value="Family Office Administrator">Family Office Administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="about">About Me</Label>
                                <Textarea id="about" name="about" defaultValue={investorProfile.about} placeholder="Write a brief professional bio..."/>
                            </div>
                            <div className="space-y-2">
                                <Label>Investment Interests</Label>
                                <div className="flex flex-wrap gap-2">
                                    {investorProfile.investmentInterests.map(interest => (
                                        <Badge key={interest} variant="secondary" className="gap-1.5 pr-1.5">
                                            {interest}
                                            <button className="rounded-full hover:bg-background/50">
                                                <X className="h-3 w-3"/>
                                            </button>
                                        </Badge>
                                    ))}
                                    <Input placeholder="Add interest..." className="h-8 w-auto flex-1"/>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label>Investment Stages</Label>
                                <div className="flex flex-wrap gap-4">
                                    {investmentStages.map(stage => (
                                        <div key={stage} className="flex items-center space-x-2">
                                            <Checkbox id={`stage-${stage}`} defaultChecked={investorProfile.investmentStages?.includes(stage)} />
                                            <Label htmlFor={`stage-${stage}`}>{stage}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Actively Seeking</Label>
                                <div className="flex flex-wrap gap-2">
                                    {investorProfile.seeking?.map(item => (
                                        <Badge key={item} variant="secondary" className="gap-1.5 pr-1.5">
                                            {item}
                                            <button className="rounded-full hover:bg-background/50">
                                                <X className="h-3 w-3"/>
                                            </button>
                                        </Badge>
                                    ))}
                                    <Input placeholder="Add label (e.g., Open to Mentoring)..." className="h-8 w-auto flex-1"/>
                                </div>
                            </div>
                        </>
                    )}
                    {isTalent && talentProfile && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="headline">Headline</Label>
                                <Input id="headline" name="headline" defaultValue={talentProfile.headline} placeholder="e.g., Fractional Marketing Leader" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="about">About Me</Label>
                                <Textarea id="about" name="about" defaultValue={talentProfile.about} placeholder="A brief bio..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Skills</Label>
                                    <Input name="skills" defaultValue={talentProfile.skills?.join(', ')} placeholder="e.g., React, Node.js" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="organization">Current/Latest Organization</Label>
                                    <Input id="organization" name="organization" defaultValue={talentProfile.organization} placeholder="e.g., Acme Inc." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="experience">Experience</Label>
                                <Textarea id="experience" name="experience" defaultValue={talentProfile.experience} placeholder="Summarize your professional experience..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="education">Education & Certifications</Label>
                                <Textarea id="education" name="education" defaultValue={talentProfile.education} placeholder="e.g., B.S. in Computer Science..." />
                            </div>
                             <div className="flex items-center space-x-2 pt-2">
                                <Switch 
                                    id="is-seeking-cofounder" 
                                    checked={isSeekingCoFounder}
                                    onCheckedChange={setIsSeekingCoFounder}
                                />
                                <Label htmlFor="is-seeking-cofounder">Open to Co-founder Opportunities</Label>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch 
                                    id="is-vendor" 
                                    checked={isVendor}
                                    onCheckedChange={setIsVendor}
                                />
                                <Label htmlFor="is-vendor">Promote my services as a Vendor</Label>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch 
                                    id="is-fractional-leader" 
                                    checked={isFractionalLeader}
                                    onCheckedChange={setIsFractionalLeader}
                                />
                                <Label htmlFor="is-fractional-leader">Promote my services as a Fractional Leader</Label>
                            </div>
                        </>
                    )}
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
            </Card>
          </form>
            {isFounder && startup && <IncorporationDetailsForm initialData={startup.incorporationDetails} />}
            {isFounder && startup && (
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
            )}
        </div>
      </div>
      
      {isFounder && startup && (
        <>
            <Separator />
            <FoundersForm startup={startup} initialFounders={founders} />
            {isIncorporated && (
                <>
                    <Separator />
                    <MonthlyFinancialsForm startupId={startup.id} initialData={startup.monthlyFinancials} />
                    <Separator />
                    <CapTableForm startupId={startup.id} initialData={startup.capTable} />
                </>
            )}
        </>
      )}

      {isInvestor && investorProfile && (
        <>
            <Separator />
            <PortfolioForm initialData={investorProfile.portfolio} />
            <Separator />
            <ExitsForm initialData={investorProfile.exits} />
        </>
      )}
    </div>
  );
}
