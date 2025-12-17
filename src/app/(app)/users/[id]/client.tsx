'use client';

import { notFound, useParams } from "next/navigation";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building, ExternalLink, Github, Linkedin, Pencil, Loader2, ShieldCheck, ShieldAlert, UserCheck, HandCoins, BarChart2 } from "lucide-react";
import { FullUserProfile, FounderProfile, InvestorProfile, TalentProfile, Startup } from "@/lib/types";
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
import { useFirestore, useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { getFinancialBreakdown, getUsersByIds, getStartupById } from "@/lib/actions";

const FounderProfileView = ({ user, currentUser }: { user: FullUserProfile, currentUser: FullUserProfile | null }) => {
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

    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
    const [breakdown, setBreakdown] = useState<string>("");
    const [isLoadingBreakdown, setIsLoadingBreakdown] = useState(false);
    const [timeframe, setTimeframe] = useState<"annual" | "monthly">("annual");
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [founders, setFounders] = useState<FullUserProfile[]>([]);
    
    // Simulate connection status.
    const isConnected = false; 
    const showFinancials = currentUser?.role === 'investor' && (isConnected || currentUser?.id === user.id);

    useEffect(() => {
        const fetchFounders = async () => {
            if(startup?.founderIds) {
               const founderProfiles = await getUsersByIds(startup.founderIds);
               setFounders(founderProfiles.filter((p): p is FullUserProfile => p !== null));
            }
        };
        if(startup) fetchFounders();
    }, [startup]);
    
    if (loading) return <Skeleton className="h-96 w-full" />;
    if (!startup) return <p>Startup not found.</p>;

    const getChartData = (period: "annual" | "monthly") => {
        if (period === 'annual') {
            return [
                { metric: "Revenue", value: startup.financials.revenue, fill: "hsl(var(--chart-1))" },
                { metric: "Expenses", value: startup.financials.expenses, fill: "hsl(var(--chart-2))" },
                { metric: "Net Income", value: startup.financials.netIncome, fill: "hsl(var(--chart-3))" },
                { metric: "MRR", value: startup.financials.monthlyRecurringRevenue * 12, fill: "hsl(var(--chart-4))" },
            ];
        } else {
            const targetMonthDate = subMonths(new Date(), selectedMonth);
            const targetMonthStr = format(targetMonthDate, 'yyyy-MM');
            
            const monthlyData = startup.monthlyFinancials.find(d => d.month === targetMonthStr);

            if (monthlyData) {
                 return [
                    { metric: "Revenue", value: monthlyData.revenue, fill: "hsl(var(--chart-1))" },
                    { metric: "Expenses", value: monthlyData.expenses, fill: "hsl(var(--chart-2))" },
                    { metric: "Net Income", value: monthlyData.netIncome, fill: "hsl(var(--chart-3))" },
                    { metric: "MRR", value: monthlyData.monthlyRecurringRevenue, fill: "hsl(var(--chart-4))" },
                ];
            }
            return [];
        }
    };
    
    const chartData = getChartData(timeframe);
    
    const chartConfig = {
        value: { label: "Value" },
        revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
        expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
        netIncome: { label: "Net Income", color: "hsl(var(--chart-3))" },
        mrr: { label: "MRR", color: "hsl(var(--chart-4))" },
    } satisfies ChartConfig;

    const handleBarClick = async (data: any) => {
        if (data && data.activePayload && data.activePayload[0]) {
            const metric = data.activePayload[0].payload.metric;
            setSelectedMetric(metric);
setIsLoadingBreakdown(true);
            const result = await getFinancialBreakdown({metric});
            setBreakdown(result.breakdown);
            setIsLoadingBreakdown(false);
        }
    };
    
    const formatYAxis = (value: number) => {
        if (timeframe === 'annual') {
            return `$${Number(value) / 1000}k`;
        }
        return `$${(Number(value) / 1000).toFixed(1)}k`
    }

    const months = Array.from({ length: 6 }, (_, i) => ({
      value: i,
      label: format(subMonths(new Date(), i), 'MMMM yyyy')
    }));
    
    const isIncorporated = startup.incorporationDetails.isIncorporated;

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader><CardTitle>About {startup.companyName}</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{startup.description}</p>
                    </CardContent>
                </Card>
                 {isIncorporated && showFinancials && (
                    <>
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Financial Snapshot</CardTitle>
                                        <CardDescription>{timeframe === 'annual' ? 'Annualized' : 'Monthly'} key metrics. Click a bar for details.</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        {timeframe === 'monthly' && (
                                            <Select value={String(selectedMonth)} onValueChange={(value) => setSelectedMonth(Number(value))}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select month" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {months.map(month => (
                                                        <SelectItem key={month.value} value={String(month.value)}>{month.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as "annual" | "monthly")}>
                                            <TabsList>
                                                <TabsTrigger value="annual">Annual</TabsTrigger>
                                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                    <BarChart accessibilityLayer data={chartData} onClick={handleBarClick}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="metric" tickLine={false} tickMargin={10} axisLine={false} />
                                        <YAxis tickFormatter={formatYAxis} />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                        <Bar dataKey="value" radius={4} style={{ cursor: 'pointer' }}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <CapTableCard capTable={startup.capTable} />
                    </>
                )}

                {isIncorporated && !showFinancials && (
                    <LockedFinancialsCard />
                )}
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Company Info</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center gap-2"><Building className="w-4 h-4 text-muted-foreground" /> <span>Industry: <strong>{startup.industry}</strong></span></div>
                        <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-muted-foreground" /> <span>Stage: <strong>{startup.stage}</strong></span></div>
                        <div className="flex items-center gap-2">
                            {isIncorporated ? <ShieldCheck className="w-4 h-4 text-green-600" /> : <ShieldAlert className="w-4 h-4 text-amber-600" />}
                            <span>Status: <strong>{isIncorporated ? "Incorporated" : "Not Incorporated"}</strong></span>
                        </div>
                        <div className="flex items-center gap-2"><ExternalLink className="w-4 h-4 text-muted-foreground" /> <a href={startup.website} target="_blank" rel="noreferrer" className="text-primary hover:underline"><strong>Visit Website</strong></a></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Founders</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {founders.map(founder => (
                             <div key={founder.id} className="flex items-center gap-3">
                                <UserAvatar name={founder.name} avatarUrl={founder.avatarUrl} className="w-10 h-10" />
                                <div className="flex-1">
                                    <p className="font-medium flex items-center gap-1.5">
                                        <Link href={`/users/${founder.id}`} className="hover:underline">{founder.name}</Link>
                                        {(founder.profile as FounderProfile).isLead && <span title="Lead Founder"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" /></span>}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{(founder.profile as FounderProfile).title}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Detailed Breakdown: {selectedMetric}</DialogTitle>
                        <DialogDescription>
                            AI-generated analysis of the selected financial metric.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {isLoadingBreakdown ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground whitespace-pre-wrap">{breakdown}</div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const InvestorProfileView = ({ user }: { user: FullUserProfile }) => {
    const profile = user.profile as InvestorProfile;
    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader><CardTitle>About</CardTitle></CardHeader>
                    <CardContent>
                         <p className="text-sm text-muted-foreground whitespace-pre-wrap">{profile.about}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Investment Thesis</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground whitespace-pre-wrap">{profile.thesis}</p></CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                {profile.companyName && (
                    <Card>
                        <CardHeader><CardTitle>Company Info</CardTitle></CardHeader>
                        <CardContent className="space-y-3 text-sm">
                             <div className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-muted-foreground" />
                                <strong>{profile.companyName}</strong>
                            </div>
                            {profile.companyUrl && (
                                <div className="flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    <a href={profile.companyUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">Visit Website</a>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
                {profile.seeking && profile.seeking.length > 0 && (
                     <Card>
                        <CardHeader><CardTitle>Actively Seeking</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {profile.seeking.map(item => <Badge key={item}>{item}</Badge>)}
                        </CardContent>
                    </Card>
                )}
                <Card>
                    <CardHeader><CardTitle>Focus Areas</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                         <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><HandCoins className="w-4 h-4 text-muted-foreground"/>Industries</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.investmentInterests.map(interest => <Badge key={interest} variant="secondary">{interest}</Badge>)}
                            </div>
                        </div>
                         <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-muted-foreground"/>Stages</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.investmentStages?.map(stage => <Badge key={stage} variant="outline">{stage}</Badge>)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Portfolio</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {profile.portfolio.map(company => (
                             <div key={company.companyName} className="flex items-center gap-3">
                                <Image src={company.companyLogoUrl} alt={company.companyName} width={40} height={40} className="w-10 h-10 rounded-md border" data-ai-hint="logo"/>
                                <a href={company.companyUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{company.companyName}</a>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Exits</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {profile.exits.map(exit => (
                             <div key={exit.companyName} className="flex items-center gap-3">
                                <a href={exit.companyUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{exit.companyName}</a>
                            </div>
                        ))}
                         {profile.exits.length === 0 && <p className="text-sm text-muted-foreground">No exits to display.</p>}
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
                    <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground whitespace-pre-wrap">{profile.experience}</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>About</CardTitle></CardHeader>
                    <CardContent>
                         <p className="text-sm text-muted-foreground whitespace-pre-wrap">{profile.about}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                 <Card>
                    <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {profile.skills?.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Links</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline"><Linkedin className="w-4 h-4" /> <span>LinkedIn Profile</span></a>}
                         {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline"><Github className="w-4 h-4" /> <span>GitHub Profile</span></a>}
                    </CardContent>
                </Card>
            </div>
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
        );
    }

    // Default for Talent and others
    const talentProfile = user.profile as TalentProfile;
    const isSeekingCoFounder = user.role === 'talent' && talentProfile.isSeekingCoFounder;
    
    return (
        <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6 relative">
                <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-24 h-24 text-3xl" />
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
                        {isSeekingCoFounder && (
                            <Badge variant="secondary" className="gap-1.5">
                                <UserCheck className="w-3.5 h-3.5" />
                                Seeking Co-founder
                            </Badge>
                        )}
                    </div>
                    {talentProfile.headline ? (
                         <p className="text-lg text-muted-foreground">{talentProfile.headline}</p>
                    ) : (
                        <p className="text-muted-foreground capitalize">{user.role}</p>
                    )}
                    
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


interface UserProfileClientProps {
  serverUser: FullUserProfile;
  serverCurrentUser: FullUserProfile | null;
}

export default function UserProfileClient({ serverUser, serverCurrentUser }: UserProfileClientProps) {
    const isOwnProfile = serverCurrentUser?.id === serverUser.id;
    const startup = (serverUser.role === 'founder' && (serverUser.profile as FounderProfile).companyId) ? { id: (serverUser.profile as FounderProfile).companyId! } : null;

    return (
        <div className="space-y-6">
            <UserProfileHeader user={serverUser} isOwnProfile={isOwnProfile} startup={startup as any} />
            {serverUser.role === 'founder' && <FounderProfileView user={serverUser} currentUser={serverCurrentUser} />}
            {serverUser.role === 'investor' && <InvestorProfileView user={serverUser} />}
            {serverUser.role === 'talent' && <TalentProfileView user={serverUser} />}
        </div>
    );
};
