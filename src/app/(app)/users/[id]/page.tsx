'use client';

import { notFound, useParams } from "next/navigation";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building, ExternalLink, Github, Linkedin, Pencil, Loader2, ShieldCheck, ShieldAlert, UserCheck, HandCoins, BarChart2 } from "lucide-react";
import { FullUserProfile, FounderProfile, InvestorProfile, TalentProfile, Startup, MonthlyFinancials } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subMonths } from 'date-fns';
import CapTableCard from "@/components/profile/cap-table-card";
import LockedFinancialsCard from "@/components/profile/locked-financials-card";
import { doc, getDoc } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { getFinancialBreakdown, getUserById } from "@/lib/actions";

export default function UserProfilePage() {
    const params = useParams();
    const id = params.id as string;
    const { user: currentUser, isUserLoading: authLoading } = useUser();
    const [user, setUser] = useState<FullUserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const userProfile = await getUserById(id);

            if (!userProfile) {
                setLoading(false);
                notFound();
                return;
            }
            setUser(userProfile);
            setLoading(false);
        };
        if(id) {
            fetchUser();
        }
    }, [id]);
    
    if (loading || authLoading) {
       return (
            <div className="space-y-6">
                <Skeleton className="h-40 w-full" />
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </div>
        );
    }
    
    if (!user) {
        notFound();
        return null;
    }

    return <UserProfileClient user={user} currentUser={currentUser} />;
}

const UserProfileClient = ({ user, currentUser }: { user: FullUserProfile, currentUser: FullUserProfile | null }) => {
    const isOwnProfile = currentUser?.id === user.id;
    const [startup, setStartup] = useState<Startup | null>(null);
    const db = useFirestore();

     useEffect(() => {
        const fetchStartup = async () => {
            if (user.role === 'founder' && (user.profile as FounderProfile).companyId) {
                const companyId = (user.profile as FounderProfile).companyId;
                if (!db || !companyId) return;
                const startupRef = doc(db, "startups", companyId!);
                const startupSnap = await getDoc(startupRef);
                if (startupSnap.exists()) {
                    setStartup(startupSnap.data() as Startup);
                }
            }
        };
        fetchStartup();
    }, [user, db]);

    return (
        <div className="space-y-6">
            <UserProfileHeader user={user} isOwnProfile={isOwnProfile} startup={startup} />
            {user.role === 'founder' && <FounderProfileView user={user} currentUser={currentUser} />}
            {user.role === 'investor' && <InvestorProfileView user={user} />}
            {user.role === 'talent' && <TalentProfileView user={user} />}
        </div>
    );
};

const UserProfileHeader = ({ user, isOwnProfile, startup }: { user: FullUserProfile, isOwnProfile: boolean, startup?: Startup | null }) => {
    if (user.role === 'founder') {
        const profile = user.profile as FounderProfile;
        if (!startup) return <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>;

        return (
            <Card>
                <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6 relative">
                    <Image src={startup.companyLogoUrl} alt={startup.companyName} width={96} height={96} className="w-24 h-24 rounded-full border" data-ai-hint="logo" />
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-bold font-headline">{startup.companyName}</h1>
                             {profile.isSeekingCoFounder && (
                                <Badge variant="secondary" className="gap-1.5">
                                    <UserCheck className="w-3.5 h-3.5" />
                                    Seeking Co-founder
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">{startup.tagline}</p>
                        
                        {!isOwnProfile && (
                            <div className="flex items-center gap-4 mt-4">
                                <Button>Connect</Button>
                                <Button variant="outline">Message</Button>
                            </div>
                        )}
                    </div>
                     {isOwnProfile && (
                        <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center justify-center">
                            <Button asChild>
                                <Link href="/profile/edit">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    if (user.role === 'investor') {
        const profile = user.profile as InvestorProfile;
        return (
            <Card>
                <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6 relative">
                    <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-24 h-24 text-3xl" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
                            {profile.investorType && <Badge>{profile.investorType}</Badge>}
                        </div>
                        <p className="text-muted-foreground capitalize">{user.role}</p>
                        
                        {!isOwnProfile && (
                            <div className="flex items-center gap-4 mt-4">
                                <Button>Connect</Button>
                                <Button variant="outline">Message</Button>
                            </div>
                        )}
                    </div>
                     {isOwnProfile && (
                        <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center justify-center">
                            <Button asChild>
                                <Link href="/profile/edit">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    if (user.role === 'talent') {
        const profile = user.profile as TalentProfile;
        return (
            <Card>
                <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6 relative">
                    <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-24 h-24 text-3xl" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
                            {profile.subRole && <Badge>{profile.subRole}</Badge>}
                        </div>
                        <p className="text-muted-foreground">{profile.headline}</p>
                        
                         {!isOwnProfile && (
                            <div className="flex items-center gap-4 mt-4">
                                <Button>Connect</Button>
                                <Button variant="outline">Message</Button>
                            </div>
                        )}
                    </div>
                     {isOwnProfile && (
                        <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center justify-center">
                            <Button asChild>
                                <Link href="/profile/edit">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }
    return null;
};

const FounderProfileView = ({ user, currentUser }: { user: FullUserProfile, currentUser: FullUserProfile | null }) => {
    const profile = user.profile as FounderProfile;
    const [monthlyFinancials, setMonthlyFinancials] = useState<MonthlyFinancials[]>([]);
    const [view, setView] = useState('overview');

    const isOwnProfile = currentUser?.id === user.id;

    useEffect(() => {
        const fetchFinancials = async () => {
            if (user.role === 'founder' && profile.companyId) {
                const financials = await getFinancialBreakdown(profile.companyId);
                setMonthlyFinancials(financials);
            }
        };
        fetchFinancials();
    }, [user, profile.companyId]);

    const chartConfig = {
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
        expenses: {
            label: "Expenses",
            color: "hsl(var(--chart-2))",
        }
      } satisfies ChartConfig

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column (Main Content) */}
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>About Us</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>Description of the company goes here.</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            {/* Placeholder for website link if we add it to type */}
                            {/* <div className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                <Link href="#" target="_blank" className="hover:underline text-primary">Website Link</Link>
                            </div> */}
                            <div className="flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                <span>{profile.isLead ? 'Lead Founder' : 'Co-Founder'}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle>Financial Overview</CardTitle>
                         {isOwnProfile ? (
                            <Button variant="outline" asChild>
                                <Link href="/dashboard/financials">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Manage
                                </Link>
                            </Button>
                         ) : (
                            <Tabs value={view} onValueChange={setView}>
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    {currentUser?.role === 'investor' && <TabsTrigger value="detailed">Detailed</TabsTrigger>}
                                </TabsList>
                            </Tabs>
                         )}
                    </CardHeader>
                    <CardContent>
                        {view === 'overview' && (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatCard icon={HandCoins} title="MRR (Monthly Recurring Revenue)" value="Locked" />
                                <StatCard icon={BarChart2} title="Runway" value="Locked" />
                                <StatCard icon={BarChart2} title="CAC (Customer Acquisition Cost)" value="Locked" />
                                <StatCard icon={Star} title="LTV (Lifetime Value)" value="Locked" />
                            </div>
                        )}
                        {view === 'detailed' && currentUser?.role === 'investor' && (
                             <div className="space-y-6">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatCard icon={HandCoins} title="MRR (Monthly Recurring Revenue)" value={`$${user.profile.financials?.monthlyRecurringRevenue?.toLocaleString() || 0}`} />
                                    <StatCard icon={BarChart2} title="Runway (Months)" value={user.profile.financials?.runway?.toLocaleString() || 0} />
                                    <StatCard icon={BarChart2} title="CAC (Customer Acquisition Cost)" value={`$${user.profile.financials?.customerAcquisitionCost?.toLocaleString() || 0}`} />
                                    <StatCard icon={Star} title="LTV (Lifetime Value)" value={`$${user.profile.financials?.customerLifetimeValue?.toLocaleString() || 0}`} />
                                </div>

                                 <Card>
                                    <CardHeader>
                                        <CardTitle>Monthly Performance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {monthlyFinancials.length > 0 ? (
                                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                                <BarChart accessibilityLayer data={monthlyFinancials}>
                                                    <CartesianGrid vertical={false} />
                                                    <XAxis
                                                        dataKey="date"
                                                        tickLine={false}
                                                        axisLine={false}
                                                        tickMargin={8}
                                                        tickFormatter={(value) => format(new Date(value), "MMM yy")}
                                                    />
                                                    <YAxis
                                                        tickLine={false}
                                                        axisLine={false}
                                                        tickMargin={8}
                                                        tickFormatter={(value) => `$${value/1000}k`}
                                                    />
                                                    <ChartTooltip content={<ChartTooltipContent />} />
                                                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ChartContainer>
                                        ) : (
                                            <p className="text-center text-muted-foreground p-4">No financial data available for charts.</p>
                                        )}
                                    </CardContent>
                                 </Card>
                             </div>
                        )}
                        {!isOwnProfile && view === 'detailed' && currentUser?.role !== 'investor' && (
                            <LockedFinancialsCard />
                        )}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Cap Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isOwnProfile || currentUser?.role === 'investor' ? (
                            <CapTableCard />
                        ) : (
                            <LockedFinancialsCard accessType="cap table" />
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Founder Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="flex items-center gap-3">
                            <UserAvatar name={user.name} avatarUrl={user.avatarUrl} />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{profile.title}</p>
                            </div>
                        </div>
                         <p className="text-sm text-muted-foreground">Contact this founder directly to discuss investment opportunities or collaborations.</p>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href={`mailto:${user.email}`}>Message {user.name.split(' ')[0]}</Link>
                        </Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Company Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Industry</span>
                            <Badge variant="secondary">{user.profile.industry}</Badge>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Stage</span>
                            <Badge variant="secondary">{user.profile.stage}</Badge>
                        </div>
                        {user.profile.website && (
                             <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Website</span>
                                <Link href={user.profile.website} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                                    View Site <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Incorporated</span>
                            {user.profile.incorporationDetails?.isIncorporated ? <ShieldCheck className="w-4 h-4 text-green-500" /> : <ShieldAlert className="w-4 h-4 text-red-500" />}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const InvestorProfileView = ({ user }: { user: FullUserProfile }) => {
    const profile = user.profile as InvestorProfile;
    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>About {user.name.split(' ')[0]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{profile.about || 'No bio provided yet.'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Investment Focus</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Interests</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.investmentInterests?.map(interest => (
                                    <Badge key={interest} variant="secondary">{interest}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Stages</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.investmentStages?.map(stage => (
                                    <Badge key={stage} variant="secondary">{stage}</Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Investor Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                         <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Type</span>
                            <Badge variant="secondary">{profile.investorType}</Badge>
                        </div>
                        {profile.companyName && (
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Firm</span>
                                <span>{profile.companyName}</span>
                            </div>
                        )}
                         {profile.companyUrl && (
                             <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Website</span>
                                <Link href={profile.companyUrl} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                                    View Site <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const TalentProfileView = ({ user }: { user: FullUserProfile }) => {
    const profile = user.profile as TalentProfile;
    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>About {user.name.split(' ')[0]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{profile.about || 'No bio provided yet.'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Skills & Expertise</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {profile.skills?.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Details & Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Role</span>
                            <Badge variant="secondary">{profile.subRole}</Badge>
                        </div>
                        {profile.organization && (
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Organization</span>
                                <span>{profile.organization}</span>
                            </div>
                        )}
                        {profile.linkedin && (
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">LinkedIn</span>
                                <Link href={profile.linkedin} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                                    <Linkedin className="w-3 h-3" /> Profile
                                </Link>
                            </div>
                        )}
                         {profile.github && (
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">GitHub</span>
                                <Link href={profile.github} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                                    <Github className="w-3 h-3" /> Profile
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string }) => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-xl font-bold">{value}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);
