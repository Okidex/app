
'use client';

import { useState, useEffect } from "react";
import { FullUserProfile, Startup, FounderProfile, InvestorProfile, TalentProfile, PortfolioCompany, Exit, TalentSubRole } from "@/lib/types";
import { getStartupById } from "@/lib/actions";
import { useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, Building, DollarSign, GitBranch, GraduationCap, Link as LinkIcon, Linkedin, Lightbulb, MapPin, Target, TrendingUp, Users, Globe } from "lucide-react";
import Image from "next/image";
import FundraisingProgressCard from "@/components/profile/fundraising-progress-card";
import LockedFinancialsCard from "@/components/profile/locked-financials-card";
import CapTableCard from "@/components/profile/cap-table-card";
import { founderObjectives } from "@/lib/constants";
import AddFinancialsPrompt from "@/components/profile/add-financials-prompt";
import Link from "next/link";


// --- Helper Components ---
const ProfileSection = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon: React.ElementType }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
                <Icon className="w-5 h-5 text-muted-foreground" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
            {children}
        </CardContent>
    </Card>
);

const PortfolioCard = ({ company }: { company: PortfolioCompany }) => (
    <div className="flex items-center gap-4 rounded-lg border p-3">
        <Image src={company.companyLogoUrl} alt={company.companyName} width={40} height={40} className="rounded-md border" data-ai-hint="logo" />
        <div>
            <p className="font-semibold">{company.companyName}</p>
            <a href={company.companyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline flex items-center gap-1.5">
                <LinkIcon className="h-3 w-3" />
                {company.companyUrl}
            </a>
        </div>
    </div>
);

const ExitCard = ({ exit }: { exit: Exit }) => (
    <div className="flex items-center gap-4 rounded-lg border p-3">
        <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-md">
            <DollarSign className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
            <p className="font-semibold">{exit.companyName}</p>
            <a href={exit.companyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline flex items-center gap-1.5">
                <LinkIcon className="h-3 w-3" />
                {exit.companyUrl}
            </a>
        </div>
    </div>
);


// --- Role-Specific Detail Components ---

const FounderProfileDetails = ({ user, isOwner }: { user: FullUserProfile; isOwner: boolean }) => {
    const profile = user.profile as FounderProfile;
    const [startup, setStartup] = useState<Startup | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStartup = async () => {
            if (profile.companyId) {
                const startupData = await getStartupById(profile.companyId);
                setStartup(startupData);
            }
            setLoading(false);
        };
        fetchStartup();
    }, [profile.companyId]);

    if (loading) return <Skeleton className="h-64 w-full" />;
    if (!startup) return <Card><CardContent><p>Company information not found.</p></CardContent></Card>;

    // Placeholder for a real connection status check
    const isConnected = false;
    const canViewFinancials = isOwner || isConnected;
    const hasCapTableData = startup.capTable && startup.capTable.length > 0;

    return (
        <div className="space-y-8">
            <ProfileSection title="About the Company" icon={Building}>
                <p>{startup.description}</p>
            </ProfileSection>
            
            {canViewFinancials ? (
                <>
                    {hasCapTableData ? (
                        <CapTableCard capTable={startup.capTable!} />
                    ) : (
                       isOwner && <AddFinancialsPrompt />
                    )}
                </>
            ) : (
                <LockedFinancialsCard />
            )}
        </div>
    );
};


const InvestorProfileDetails = ({ user }: { user: FullUserProfile }) => {
    const profile = user.profile as InvestorProfile;
    return (
        <div className="space-y-8">
            {profile.about && <ProfileSection title="About" icon={Users}><p>{profile.about}</p></ProfileSection>}
            {profile.thesis && <ProfileSection title="Investment Thesis" icon={Lightbulb}><p>{profile.thesis}</p></ProfileSection>}
            {profile.portfolio?.length > 0 && (
                 <Card>
                    <CardHeader><CardTitle className="text-xl">Portfolio</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        {profile.portfolio.map(p => <PortfolioCard key={p.companyName} company={p} />)}
                    </CardContent>
                </Card>
            )}
            {profile.exits?.length > 0 && (
                <Card>
                    <CardHeader><CardTitle className="text-xl">Exits</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        {profile.exits.map(e => <ExitCard key={e.companyName} exit={e} />)}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

const TalentProfileDetails = ({ user }: { user: FullUserProfile }) => {
    const profile = user.profile as TalentProfile;
    return (
        <div className="space-y-8">
            {profile.about && <ProfileSection title="About" icon={Users}><p>{profile.about}</p></ProfileSection>}
            {profile.experience && <ProfileSection title="Experience" icon={Briefcase}><p>{profile.experience}</p></ProfileSection>}
            {profile.education && <ProfileSection title="Education" icon={GraduationCap}><p>{profile.education}</p></ProfileSection>}
        </div>
    );
};

// --- Role-Specific Sidebar Components ---
const FounderSidebarDetails = ({ user }: { user: FullUserProfile }) => {
    const [startup, setStartup] = useState<Startup | null>(null);
    const [loading, setLoading] = useState(true);
    const profile = user.profile as FounderProfile;
    const userObjectives = founderObjectives.filter(obj => profile.objectives?.includes(obj.id));

    useEffect(() => {
        const fetchStartup = async () => {
            const profile = user.profile as FounderProfile;
            if (profile.companyId) {
                const startupData = await getStartupById(profile.companyId);
                setStartup(startupData);
            }
            setLoading(false);
        };
        fetchStartup();
    }, [user]);

    if (loading) return <Skeleton className="h-48 w-full" />;
    if (!startup) return null;

    return (
        <div className="space-y-6">
            {startup.showFundraisingProgress && <FundraisingProgressCard startup={startup} />}
            <Card>
                <CardHeader><CardTitle className="text-lg">Company Info</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry</span>
                        <span className="font-medium">{startup.industry}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Stage</span>
                        <span className="font-medium">{startup.stage}</span>
                    </div>
                    {startup.location && <div className="flex justify-between">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">{startup.location}</span>
                    </div>}
                     {startup.website && <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Website</span>
                         <a href={startup.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5"/>
                            Visit
                        </a>
                    </div>}
                </CardContent>
            </Card>
            {userObjectives.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Target className="w-5 h-5 text-muted-foreground" />
                            Objectives
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {userObjectives.map(obj => (
                            <Badge key={obj.id} variant="secondary">{obj.label}</Badge>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

const InvestorSidebarDetails = ({ profile }: { profile: InvestorProfile }) => (
    <div className="space-y-6">
        <Card>
            <CardHeader><CardTitle className="text-lg">Investment Focus</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                 {profile.investmentInterests?.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Industries</h4>
                        <div className="flex flex-wrap gap-2">
                            {profile.investmentInterests.map(interest => <Badge key={interest} variant="secondary">{interest}</Badge>)}
                        </div>
                    </div>
                )}
                 {profile.investmentStages && profile.investmentStages.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Stages</h4>
                        <div className="flex flex-wrap gap-2">
                            {profile.investmentStages.map(stage => <Badge key={stage} variant="outline">{stage}</Badge>)}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
        {(profile.seeking && profile.seeking.length > 0) || profile.isHiring ? (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="w-5 h-5 text-muted-foreground" />
                        Open To
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {profile.seeking?.map(item => <Badge key={item} variant="secondary">{item}</Badge>)}
                    {profile.isHiring && <Badge variant="secondary">Hiring for my firm</Badge>}
                </CardContent>
            </Card>
        ) : null}
    </div>
);

const subRoleLabels: Record<TalentSubRole, string> = {
    'co-founder': 'Co-founder',
    'employee': 'Full-time Employee',
    'vendor': 'Vendor / Contractor',
    'fractional-leader': 'Fractional Leader',
};

const TalentSidebarDetails = ({ profile }: { profile: TalentProfile }) => (
     <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                    Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                {profile.subRole && (
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Seeking Role</span>
                        <span className="font-medium">{subRoleLabels[profile.subRole]}</span>
                    </div>
                )}
                {profile.organization && (
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Organization</span>
                        <span className="font-medium">{profile.organization}</span>
                    </div>
                )}
            </CardContent>
        </Card>
        {profile.skills && profile.skills.length > 0 && (
             <Card>
                <CardHeader><CardTitle className="text-lg">Top Skills</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </CardContent>
            </Card>
        )}
        {(profile.linkedin || profile.github) && (
            <Card>
                <CardHeader><CardTitle className="text-lg">Links</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline"><Linkedin className="w-4 h-4" /> LinkedIn</a>}
                    {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline"><GitBranch className="w-4 h-4" /> GitHub</a>}
                </CardContent>
            </Card>
        )}
    </div>
);


// THE MAIN EXPORT
export default function UserProfileClient({ initialUser }: { initialUser: FullUserProfile }) {
    const { user: currentUser } = useUser();
    const isOwner = currentUser?.id === initialUser.id;
    
    const getHeadline = () => {
        switch(initialUser.role) {
            case 'founder':
                const founderProfile = initialUser.profile as FounderProfile;
                return founderProfile.title || 'Founder';
            case 'investor':
                const investorProfile = initialUser.profile as InvestorProfile;
                return `${investorProfile.investorType || 'Investor'} at ${investorProfile.companyName}`;
            case 'talent':
                const talentProfile = initialUser.profile as TalentProfile;
                let headline = talentProfile.headline || 'Talent';
                if (talentProfile.organization) {
                    headline += ` at ${talentProfile.organization}`;
                }
                return headline;
            default:
                return 'Okidex Member';
        }
    }

    return (
        <div className="container max-w-6xl py-10 space-y-8">
             <div className="flex flex-col md:flex-row items-start gap-8">
                <UserAvatar avatarUrl={initialUser.avatarUrl} name={initialUser.name} className="w-32 h-32 text-4xl border-4 border-background shadow-md" />
                <div className="flex-1 mt-4">
                    <h1 className="text-4xl font-bold font-headline">{initialUser.name}</h1>
                    <p className="text-xl text-muted-foreground mt-1">{getHeadline()}</p>
                    <div className="mt-6 flex gap-2">
                        {currentUser?.id !== initialUser.id && (
                           <>
                            <Button>Connect</Button>
                            <Button variant="outline">Message</Button>
                           </>
                        )}
                         {currentUser?.id === initialUser.id && (
                            <Button asChild>
                                <a href="/profile/edit">Edit Profile</a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {initialUser.role === 'founder' && <FounderProfileDetails user={initialUser} isOwner={isOwner} />}
                    {initialUser.role === 'investor' && <InvestorProfileDetails user={initialUser} />}
                    {initialUser.role === 'talent' && <TalentProfileDetails user={initialUser} />}
                </div>
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                     {initialUser.role === 'founder' && <FounderSidebarDetails user={initialUser} />}
                     {initialUser.role === 'investor' && <InvestorSidebarDetails profile={initialUser.profile as InvestorProfile} />}
                     {initialUser.role === 'talent' && <TalentSidebarDetails profile={initialUser.profile as TalentProfile} />}
                </div>
            </div>
        </div>
    );
}
