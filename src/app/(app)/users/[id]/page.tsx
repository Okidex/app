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
import { doc, getDoc } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { getFinancialBreakdown, getUserById } from "@/lib/actions";

export const dynamic = 'force-dynamic';


const FounderProfileView = ({ user, currentUser }: { user: FullUserProfile, currentUser: FullUserProfile | null }) => {
    const profile = user.profile as FounderProfile;
    const [startup, setStartup] = useState<Startup | null>(null);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        const fetchStartup = async () => {
            if (profile.companyId && db) {
                const startupRef = doc(db, "startups", profile.companyId);
                const startupSnap = await getDoc(startupRef);
                if (startupSnap.exists()) {
                    setStartup(startupSnap.data() as Startup);
                }
            }
            setLoading(false);
        };
        fetchStartup();
    }, [profile.companyId, db]);

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
            if(startup && db) {
                const founderProfiles = await Promise.all(startup.founderIds.map(id => getUserById(id)));
                setFounders(founderProfiles.filter((p): p is FullUserProfile => p !== null));
            }
        };
        fetchFounders();
    }, [startup, db]);
    
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
        if (data && data.activePayload && data.activePayload) {
            const metric = data.activePayload.payload.metric;
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
                                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                    <BarChart accessibilityLayer data={chartData} onClick={handleBarClick}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="metric"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={formatYAxis}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dashed" />}
                                        />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Breakdown: {selectedMetric}</DialogTitle>
                                    <DialogDescription>Detailed insights into the selected financial metric.</DialogDescription>
                                </DialogHeader>
                                {isLoadingBreakdown ? (
                                    <div className="flex justify-center items-center h-40">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap">{breakdown}</p>
                                )}
                            </DialogContent>
                        </Dialog>
                    </>
                )}
                
                <Card>
                    <CardHeader>
                        <CardTitle>Team & Founders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            {founders.map(founder => (
                                <div key={founder.id} className="flex items-center space-x-3">
                                    <UserAvatar user={founder} className="h-10 w-10" />
                                    <div>
                                        <p className="text-sm font-semibold">{founder.displayName}</p>
                                        <p className="text-xs text-muted-foreground">{founder.profile.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <p>{startup.location}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <p>{startup.industry}</p>
                        </div>
                         {startup.website && (
                            <div className="flex items-center space-x-2">
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{startup.website}</a>
                            </div>
                        )}
                         {isIncorporated ? (
                            <Badge variant="default" className="flex items-center"><ShieldCheck className="h-3 w-3 mr-1" /> Incorporated</Badge>
                        ) : (
                             <Badge variant="secondary" className="flex items-center"><ShieldAlert className="h-3 w-3 mr-1" /> Not Incorporated</Badge>
                        )}
                        
                    </CardContent>
                </Card>
                {showFinancials ? (
                    <>
                         <CapTableCard startup={startup} />
                    </>
                ) : (
                    <LockedFinancialsCard currentUserRole={currentUser?.role || null} />
                )}
               
                <Card>
                    <CardHeader><CardTitle>User Profile</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center space-x-2">
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                            <p>{user.displayName}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-muted-foreground" />
                            <p>{user.profile.role}</p>
                        </div>
                        {user.profile.linkedin && (
                            <div className="flex items-center space-x-2">
                                <Linkedin className="h-4 w-4 text-muted-foreground" />
                                <a href={user.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn Profile</a>
                            </div>
                        )}
                        {user.profile.github && (
                            <div className="flex items-center space-x-2">
                                <Github className="h-4 w-4 text-muted-foreground" />
                                <a href={user.profile.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Profile</a>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


const UserProfilePage = () => {
    const params = useParams();
    const { user: currentUserRaw } = useUser();
    
    // Simulate fetching user data. In a real app, this would be an async call based on params.id
    const [user, setUser] = useState<FullUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

     useEffect(() => {
        const fetchUser = async () => {
            if (params.id) {
                const fetchedUser = await getUserById(params.id as string);
                if (fetchedUser) {
                    setUser(fetchedUser);
                } else {
                    notFound();
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [params.id]);
    
    // Simulate fetching current user profile
    const [currentUserProfile, setCurrentUserProfile] = useState<FullUserProfile | null>(null);
    useEffect(() => {
        const fetchCurrentUserProfile = async () => {
            if (currentUserRaw) {
                const profile = await getUserById(currentUserRaw.uid);
                setCurrentUserProfile(profile);
            }
        };
        fetchCurrentUserProfile();
    }, [currentUserRaw]);


    if (loading) return <Skeleton className="h-screen w-full" />;
    if (!user) return notFound();

    switch (user.profile.role) {
        case 'founder':
            return <FounderProfileView user={user} currentUser={currentUserProfile} />;
        case 'investor':
            return <p>Investor profile view is not yet implemented.</p>; // Implement InvestorProfileView
        case 'talent':
            return <p>Talent profile view is not yet implemented.</p>; // Implement TalentProfileView
        default:
            return notFound();
    }
};

export default UserProfilePage;
