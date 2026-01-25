

'use client';

import { notFound, useParams } from "next/navigation";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building, ExternalLink, Github, Linkedin, Pencil, Loader2, ShieldCheck, ShieldAlert, UserCheck, HandCoins, BarChart2, Edit, Users, Goal, BookUser } from "lucide-react";
import { FullUserProfile, FounderProfile, InvestorProfile, TalentProfile, Startup, CapTableEntry, FounderObjective } from "@/lib/types";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subMonths, parseISO } from 'date-fns';
import CapTableCard from "@/components/profile/cap-table-card";
import LockedFinancialsCard from "@/components/profile/locked-financials-card";
import { useFirestore, useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { getFinancialBreakdown, getUsersByIds, getStartupById, updateStartupData } from "@/lib/actions";
import FundraisingProgressCard from "@/components/profile/fundraising-progress-card";
import FundraisingGoalCard from "@/components/profile/fundraising-goal-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { founderObjectives } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

const IncompleteFinancialsCard = () => (
    <Card className="border-dashed border-2 text-center">
        <CardHeader>
            <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Edit className="w-8 h-8" />
            </div>
            <CardTitle>Complete Your Financial Profile</CardTitle>
            <CardDescription>
                Attract investors by providing a full picture of your startup's financial health. Add your monthly performance and capitalization table to complete your profile.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/profile/edit">
                    Edit Financials
                </Link>
            </Button>
        </CardContent>
    </Card>
);

const FounderProfileView = ({ user, currentUser }: { user: FullUserProfile, currentUser: FullUserProfile | null }) => {
    const profile = user.profile as FounderProfile;
    const [startup, setStartup] = useState<Startup | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

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
    
    const isConnected = false; 
    const isOwner = currentUser?.id === user.id;
    const showFinancialsToInvestor = currentUser?.role === 'investor' && isConnected;
    const showFinancials = isOwner || showFinancialsToInvestor;
    
    const hasMonthlyFinancials = startup && startup.monthlyFinancials && startup.monthlyFinancials.length > 0;
    const hasCapTable = startup && startup.capTable && startup.capTable.length > 0;

    const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState<number | undefined>();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAcknowledgeInvestment = async () => {
        if (!investmentAmount || !currentUser || !startup) return;
        
        setIsSubmitting(true);
        const investorName = isAnonymous ? 'Anonymous Investor' : currentUser.name;

        // Simulate equity calculation. In a real app this would be more complex.
        const baseValuation = (startup.fundraisingGoal || 0) * 5;
        const newEquity = baseValuation > 0 ? (investmentAmount / baseValuation) * 100 : 0;
        const newShares = Math.round((newEquity / 100) * 10000000); // Assuming 10M total shares

        const newCapTableEntry: CapTableEntry = {
            id: `ct-inv-${currentUser.id}-${Date.now()}`,
            shareholderName: investorName,
            investment: investmentAmount,
            shares: newShares,
            equityPercentage: newEquity,
            investmentStage: startup.stage
        };

        const newCapTable = [...(startup.capTable || []), newCapTableEntry];
        const newFundsRaised = (startup.fundsRaised || 0) + investmentAmount;
        
        const newInvestors = [
            ...(startup.investors || []),
            {
                investorId: currentUser.id,
                name: currentUser.name,
                avatarUrl: currentUser.avatarUrl,
                isAnonymous: isAnonymous
            }
        ];

        const updateData: Partial<Startup> = {
            fundsRaised: newFundsRaised,
            capTable: newCapTable,
            investors: newInvestors
        };

        const result = await updateStartupData(startup.id, updateData);
        if (result.success) {
            setStartup(prev => prev ? { ...prev, ...updateData } : null);
            toast({ title: "Investment Acknowledged", description: "Your investment has been added to the startup's profile." });
        } else {
            toast({ title: "Error", description: "Could not acknowledge investment.", variant: "destructive" });
        }

        setIsSubmitting(false);
        setIsInvestDialogOpen(false);
        setInvestmentAmount(undefined);
        setIsAnonymous(false);
    };


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
    const isFundraising = profile.objectives?.includes('fundraising') && startup.fundraisingGoal && startup.fundraisingGoal > 0;

    const getObjectiveLabel = (objectiveId: FounderObjective) => {
        return founderObjectives.find(o => o.id === objectiveId)?.label || objectiveId;
    }

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader><CardTitle>About {startup.companyName}</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{startup.description}</p>
                    </CardContent>
                </Card>
                {isFundraising && startup.showFundraisingProgress && (
                    <FundraisingProgressCard startup={startup} />
                )}
                {isFundraising && !startup.showFundraisingProgress && (
                    <FundraisingGoalCard startup={startup} />
                )}
                 {isIncorporated && showFinancials && (hasMonthlyFinancials || hasCapTable) && (
                    <>
                        {hasMonthlyFinancials ? (
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
                        ) : isOwner && (
                            <Card className="border-dashed border-2 text-center">
                                <CardHeader>
                                    <CardTitle>Add Your Monthly Performance</CardTitle>
                                    <CardDescription>
                                        Complete your financial profile by adding your monthly performance data.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild>
                                        <Link href="/profile/edit">
                                            Add Monthly Performance
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                        {hasCapTable ? (
                            <CapTableCard capTable={startup.capTable} />
                        ) : isOwner && (
                             <Card className="border-dashed border-2 text-center">
                                <CardHeader>
                                    <CardTitle>Add Your Capitalization Table</CardTitle>
                                    <CardDescription>
                                        Complete your financial profile by adding your cap table.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild>
                                        <Link href="/profile/edit">
                                            Add Cap Table
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
                
                {isIncorporated && isOwner && !hasMonthlyFinancials && !hasCapTable && (
                    <IncompleteFinancialsCard />
                )}

                {isIncorporated && !isOwner && !showFinancials && (
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
                        
                        {(isOwner || (showFinancialsToInvestor && isIncorporated)) && (
                            <>
                                <Separator />
                                <div className="space-y-3 pt-1">
                                    <h4 className="font-semibold flex items-center gap-2 text-base"><BookUser className="w-4 h-4 text-muted-foreground" /> Legal Details</h4>
                                    <div className="flex items-center gap-2">Country: <strong>{startup.incorporationDetails.country}</strong></div>
                                    <div className="flex items-center gap-2">Type: <strong>{startup.incorporationDetails.incorporationType}</strong></div>
                                    <div className="flex items-center gap-2">Date: <strong>{startup.incorporationDetails.incorporationDate ? format(parseISO(startup.incorporationDetails.incorporationDate), 'MMMM d, yyyy') : 'N/A'}</strong></div>
                                    {startup.incorporationDetails.entityNumber && <div className="flex items-center gap-2">Entity ID: <strong>{startup.incorporationDetails.entityNumber}</strong></div>}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
                {profile.objectives && profile.objectives.length > 0 && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Goal className="w-5 h-5 text-muted-foreground" />Seeking</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {profile.objectives.map(objective => (
                                <Badge key={objective} variant="secondary">{getObjectiveLabel(objective)}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                )}
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
                 {startup.investors && startup.investors.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Investors</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {startup.investors.map((investor) => (
                                <div key={investor.investorId} className="flex items-center gap-3">
                                    <UserAvatar
                                        name={investor.isAnonymous ? "Anonymous Investor" : investor.name}
                                        avatarUrl={investor.isAnonymous ? '' : investor.avatarUrl}
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">
                                            {investor.isAnonymous ? (
                                                "Anonymous Investor"
                                            ) : (
                                                <Link href={`/users/${investor.investorId}`} className="hover:underline">
                                                    {investor.name}
                                                </Link>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
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
            <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Acknowledge Investment in {startup.companyName}</DialogTitle>
                        <DialogDescription>
                            Your acknowledgment will be sent to the founder for confirmation. Once approved, this will update the startup's fundraising progress.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
                            <Input
                                id="investment-amount"
                                type="number"
                                placeholder="e.g., 50000"
                                value={investmentAmount || ''}
                                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="anonymous-investment"
                                checked={isAnonymous}
                                onCheckedChange={(checked) => setIsAnonymous(!!checked)}
                            />
                            <Label htmlFor="anonymous-investment">I want to invest anonymously</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleAcknowledgeInvestment} disabled={isSubmitting || !investmentAmount}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </DialogFooter>
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
                                {profile.investmentInterests?.map(interest => <Badge key={interest} variant="secondary">{interest}</Badge>)}
                                {(!profile.investmentInterests || profile.investmentInterests.length === 0) && <p className="text-sm text-muted-foreground">No industries specified.</p>}
                            </div>
                        </div>
                         <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-muted-foreground"/>Stages</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.investmentStages?.map(stage => <Badge key={stage} variant="outline">{stage}</Badge>)}
                                {(!profile.investmentStages || profile.investmentStages.length === 0) && <p className="text-sm text-muted-foreground">No stages specified.</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Portfolio</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {profile.portfolio?.map(company => (
                             <div key={company.companyName} className="flex items-center gap-3">
                                <Image src={company.companyLogoUrl} alt={company.companyName} width={40} height={40} className="w-10 h-10 rounded-md border" data-ai-hint="logo"/>
                                <a href={company.companyUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{company.companyName}</a>
                            </div>
                        ))}
                        {(!profile.portfolio || profile.portfolio.length === 0) && <p className="text-sm text-muted-foreground">No portfolio companies to display.</p>}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Exits</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {profile.exits?.map(exit => (
                             <div key={exit.companyName} className="flex items-center gap-3">
                                <a href={exit.companyUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{exit.companyName}</a>
                            </div>
                        ))}
                         {(!profile.exits || profile.exits.length === 0) && <p className="text-sm text-muted-foreground">No exits to display.</p>}
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

const FounderProfileHeader = ({ user, currentUser, onInvestClick }: { user: FullUserProfile, currentUser: FullUserProfile | null, onInvestClick: () => void }) => {
    const profile = user.profile as FounderProfile;
    const isOwnProfile = currentUser?.id === user.id;
    const showInvestButton = currentUser?.role === 'investor';
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

    if (loading) {
        return (
            <Card>
                <CardContent className="p-6 flex items-center gap-6">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-72" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    if (!startup) {
        return <Card><CardContent><p>Startup data not found.</p></CardContent></Card>
    }

    return (
        <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6 relative">
                <Image src={startup.companyLogoUrl || ''} alt={startup.companyName || ''} width={96} height={96} className="w-24 h-24 rounded-full border" data-ai-hint="logo" />
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold font-headline">{startup.companyName}</h1>
                    </div>
                    <p className="text-muted-foreground">{startup.tagline}</p>
                    
                    {!isOwnProfile && (
                        <div className="flex items-center gap-4 mt-4">
                            <Button>Connect</Button>
                            <Button variant="outline">Message</Button>
                            {showInvestButton && (
                                <Button variant="outline" onClick={onInvestClick}>
                                    <HandCoins className="mr-2 h-4 w-4" />
                                    Acknowledge Investment
                                </Button>
                            )}
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
};

const UserProfileHeader = ({ user, currentUser, onInvestClick }: { user: FullUserProfile, currentUser: FullUserProfile | null, onInvestClick: () => void }) => {
    const isOwnProfile = currentUser?.id === user.id;

    if (user.role === 'founder') {
        return <FounderProfileHeader user={user} currentUser={currentUser} onInvestClick={onInvestClick} />;
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
    
    return (
        <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6 relative">
                <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-24 h-24 text-3xl" />
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
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
    );
};


interface UserProfileClientProps {
  serverUser: FullUserProfile;
  serverCurrentUser: FullUserProfile | null;
}

export default function UserProfileClient({ serverUser, serverCurrentUser }: UserProfileClientProps) {
    const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false);

    return (
        <div className="space-y-6">
            <UserProfileHeader user={serverUser} currentUser={serverCurrentUser} onInvestClick={() => setIsInvestDialogOpen(true)} />
            {serverUser.role === 'founder' && <FounderProfileView user={serverUser} currentUser={serverCurrentUser} />}
            {serverUser.role === 'investor' && <InvestorProfileView user={serverUser} />}
            {serverUser.role === 'talent' && <TalentProfileView user={serverUser} />}
        </div>
    );
};
