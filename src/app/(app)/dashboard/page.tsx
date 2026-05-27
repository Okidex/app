
'use client';

import { useState, useEffect, useMemo } from 'react';
import { FullUserProfile, Job, FounderProfile, TalentProfile, InvestmentThesis, Interest, Match, Startup, Notification } from "@/lib/types";
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit, getCountFromServer, getDocs, doc } from 'firebase/firestore';
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Briefcase, CheckCheck, DollarSign, FileText, Mail, Star, UserCheck, Users as UsersIcon, X, AlertTriangle, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import SearchBar from "@/components/shared/search-bar";
import Image from "next/image";
import { Skeleton } from '@/components/ui/skeleton';
import { useOkiAgent } from '@/context/oki-agent-context';

export default function DashboardPage() {
    const { user: currentUser, isUserLoading } = useUser();
    const db = useFirestore();
    const [isUpgradeCardVisible, setIsUpgradeCardVisible] = useState(true);
    const [agentInput, setAgentInput] = useState("");
    const { openAgentWithQuery } = useOkiAgent();

    const companyId = currentUser?.role === 'founder' ? (currentUser.profile as FounderProfile).companyId : undefined;
    
    const startupDocRef = useMemoFirebase(() => {
      if (!db || !companyId) return null;
      return doc(db, "startups", companyId);
    }, [db, companyId]);

    const { data: startupData, isLoading: isStartupLoading } = useDoc<Startup>(startupDocRef);
    

    // --- Data Fetching ---

    // Founder: Job Applicants (Interests on jobs posted by founder)
    const founderJobsQuery = useMemoFirebase(() =>
        currentUser?.role === 'founder' && db && currentUser.id
            ? query(collection(db, "jobs"), where("founderId", "==", currentUser.id))
            : null
    , [currentUser, db]);
    const { data: founderJobs } = useCollection<Job>(founderJobsQuery);
    const founderJobIds = useMemo(() => founderJobs?.map(j => j.id) || [], [founderJobs]);

    const founderJobApplicantsQuery = useMemoFirebase(() =>
        db && founderJobIds.length > 0
            ? query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", founderJobIds))
            : null
    , [db, founderJobIds]);
    const { data: founderJobApplicants, isLoading: founderJobApplicantsLoading } = useCollection<Interest>(founderJobApplicantsQuery);
    
    // Founder: Investor Interest & Matches
    const founderMatchesQuery = useMemoFirebase(() =>
        currentUser?.id && db
            ? query(collection(db, "matches"), where("participantIds", "array-contains", currentUser.id))
            : null
    , [currentUser, db]);
    const { data: founderMatches, isLoading: founderMatchesLoading } = useCollection<Match>(founderMatchesQuery);
    
    // Founder: New matches to display
    const newFounderMatchesQuery = useMemoFirebase(() => 
        currentUser?.role === 'founder' && db
            ? query(collection(db, "users"), where("role", "in", ["investor", "talent"]), limit(3))
            : null
    , [currentUser, db]);
    const { data: newFounderMatches, isLoading: newFounderMatchesLoading } = useCollection<FullUserProfile>(newFounderMatchesQuery);


    // Investor: Theses and Jobs posted by them
    const investorThesesQuery = useMemoFirebase(() =>
        currentUser?.role === 'investor' && db && currentUser.id
            ? query(collection(db, "theses"), where("investorId", "==", currentUser.id))
            : null
    , [currentUser, db]);
    const { data: myTheses, isLoading: thesesLoading } = useCollection<InvestmentThesis>(investorThesesQuery);

    const investorJobsQuery = useMemoFirebase(() =>
        currentUser?.role === 'investor' && db && currentUser.id
            ? query(collection(db, "jobs"), where("founderId", "==", currentUser.id))
            : null
    , [currentUser, db]);
    const { data: myJobs, isLoading: jobsLoading } = useCollection<Job>(investorJobsQuery);
    
    // Investor: Applicants for their theses and jobs
    const thesisIds = useMemo(() => myTheses?.map(t => t.id) || [], [myTheses]);
    const thesisInterestsQuery = useMemoFirebase(() => 
        db && thesisIds.length > 0
        ? query(collection(db, "interests"), where("targetType", "==", "thesis"), where("targetId", "in", thesisIds))
        : null
    , [db, thesisIds]);
    const { data: thesisInterests, isLoading: thesisInterestsLoading } = useCollection<Interest>(thesisInterestsQuery);

    const jobIds = useMemo(() => myJobs?.map(j => j.id) || [], [myJobs]);
    const jobInterestsQuery = useMemoFirebase(() =>
      db && jobIds.length > 0
        ? query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", jobIds))
        : null
    , [db, jobIds]);
    const { data: jobInterests, isLoading: jobInterestsLoading } = useCollection<Interest>(jobInterestsQuery);
    
    // Investor: Matches
    const investorMatchesQuery = useMemoFirebase(() =>
        currentUser?.role === 'investor' && db && currentUser.id
            ? query(collection(db, "matches"), where("participantIds", "array-contains", currentUser.id))
            : null
    , [currentUser, db]);
    const { data: investorMatches, isLoading: investorMatchesLoading } = useCollection<Match>(investorMatchesQuery);

    // Talent: Recommended jobs and their applications
    const talentJobsQuery = useMemoFirebase(() =>
        currentUser?.role === 'talent' && db
            ? query(collection(db, "jobs"), limit(3))
            : null
    , [currentUser, db]);
    const { data: recommendedJobs, isLoading: talentJobsLoading } = useCollection<Job>(talentJobsQuery);

    const talentApplicationsQuery = useMemoFirebase(() =>
        currentUser?.role === 'talent' && db && currentUser.id
            ? query(collection(db, "interests"), where("userId", "==", currentUser.id), where("targetType", "==", "job"))
            : null
    , [currentUser, db]);
    const { data: talentApplications, isLoading: talentApplicationsLoading } = useCollection<Interest>(talentApplicationsQuery);
    
    const talentMatchesQuery = useMemoFirebase(() =>
        currentUser?.id && db
            ? query(collection(db, "matches"), where("participantIds", "array-contains", currentUser.id))
            : null
    , [currentUser, db]);
    const { data: talentMatches, isLoading: talentMatchesLoading } = useCollection<Match>(talentMatchesQuery);
    
    // Unread Messages for all roles
    const unreadMessagesQuery = useMemoFirebase(() =>
        currentUser?.id && db
            ? query(collection(db, "notifications"), where("userId", "==", currentUser.id), where("type", "==", "message"), where("isRead", "==", false))
            : null
    , [currentUser, db]);
    const { data: unreadMessages, isLoading: unreadMessagesLoading } = useCollection<Notification>(unreadMessagesQuery);


    const loading = isUserLoading || newFounderMatchesLoading || founderMatchesLoading || thesesLoading || jobsLoading || thesisInterestsLoading || jobInterestsLoading || talentJobsLoading || founderJobApplicantsLoading || talentApplicationsLoading || talentMatchesLoading || investorMatchesLoading || isStartupLoading || unreadMessagesLoading;
    
    if (loading) {
        return (
             <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-64" />
                    <div className="w-full max-w-sm">
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }
    
    if (!currentUser) {
        return null; // Auth wrapper will handle redirect
    }

    const isFounder = currentUser.role === 'founder';
    const isPremiumFounder = isFounder && (currentUser.profile as FounderProfile).isPremium;

    const renderFounderDashboard = () => (
        <>
             {!isPremiumFounder && isUpgradeCardVisible && (
                <Card className="bg-primary/5 border-primary/20 relative">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-6 w-6 text-muted-foreground"
                        onClick={() => setIsUpgradeCardVisible(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center">
                            <Star className="w-6 h-6" />
                        </div>
                        <div>
                            <CardTitle>Unlock Your Full Potential with Oki+</CardTitle>
                            <CardDescription>Showcase your profile to investors, post jobs, and view exclusive investment theses.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/settings/billing">Upgrade to Oki+</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Profile Views" value={startupData?.profileViewCount?.toLocaleString() ?? '0'} icon={UsersIcon} description="Total profile views" />
                <Link href="/matches"><StatsCard title="Active Matches" value={founderMatches?.length.toString() ?? '0'} icon={CheckCheck} description="Connections made" /></Link>
                <Link href="/applicants"><StatsCard title="Job Applicants" value={founderJobApplicants?.length.toString() ?? '0'} icon={Briefcase} description="Total applications received" /></Link>
                <Link href="/messages"><StatsCard title="Messages" value={unreadMessages?.length.toString() ?? '0'} icon={Mail} description="Unread messages" /></Link>
            </div>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>New Matches</CardTitle>
                        <CardDescription>
                            New potential investors and talent.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {newFounderMatches && newFounderMatches.map((match: FullUserProfile) => (
                            <div key={match.id} className="flex items-center gap-4">
                                <UserAvatar name={match.name} avatarUrl={match.avatarUrl} />
                                <div className="flex-1">
                                    <p className="font-medium">{match.name}</p>
                                    <p className="text-sm text-muted-foreground capitalize">{match.role}</p>
                                </div>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/user?id=${match.id}`}>View</Link>
                                </Button>
                            </div>
                        ))}
                         {(!newFounderMatches || newFounderMatches.length === 0) && (
                            <p className="text-sm text-muted-foreground text-center">No new matches right now.</p>
                         )}
                    </CardContent>
                </Card>
            </div>
        </>
    );

    const renderInvestorDashboard = () => {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/theses"><StatsCard title="Theses Posted" value={myTheses?.length?.toString() ?? '0'} icon={FileText} description="Share your focus" /></Link>
                <Link href="/applicants"><StatsCard title="Thesis Applicants" value={thesisInterests?.length?.toString() ?? '0'} icon={UsersIcon} description="Interest in your theses" /></Link>
                <Link href="/applicants"><StatsCard title="Job Applicants" value={jobInterests?.length?.toString() ?? '0'} icon={Briefcase} description="Interest in your jobs" /></Link>
                <Link href="/messages"><StatsCard title="Messages" value={unreadMessages?.length.toString() ?? '0'} icon={Mail} description="Unread messages" /></Link>
                <Link href="/matches"><StatsCard title="Active Matches" value={investorMatches?.length?.toString() ?? '0'} icon={CheckCheck} description="Ready for outreach" /></Link>
                <Link href="/search"><StatsCard title="New Opportunities" value="0" icon={DollarSign} description="New startups to discover" /></Link>
            </div>
        );
    }

    const RecommendedJobCard = ({ job }: { job: Job }) => (
        <div className="flex items-start gap-4">
            <Image src={job.companyLogoUrl} alt={job.companyName} width={40} height={40} className="rounded-full border" data-ai-hint="logo" />
            <div className="flex-1">
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.companyName}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{job.description}</p>
            </div>
            <Button asChild variant="outline" size="sm">
                <Link href={`/jobs`}>View</Link>
            </Button>
        </div>
    );

    const renderTalentDashboard = () => {
        const profile = currentUser.profile as TalentProfile;
        const isCoFounder = profile.subRole === 'co-founder';
        
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Matches ({recommendedJobs?.length ?? 0})</CardTitle>
                            <CardDescription>Recommended jobs that match your profile and skills.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {recommendedJobs && recommendedJobs.map((job: Job) => <RecommendedJobCard key={job.id} job={job} />)}
                            {(!recommendedJobs || recommendedJobs.length === 0) && (
                                <p className="text-sm text-muted-foreground text-center">No recommended jobs right now.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                     <div className="grid gap-4">
                        <StatsCard title="Profile Views" value={currentUser.profile?.profileViewCount?.toLocaleString() ?? '0'} icon={UsersIcon} description="Total profile views" />
                        <Link href="/jobs"><StatsCard title="Applications" value={talentApplications?.length.toString() ?? '0'} icon={FileText} description="Jobs you've applied to" /></Link>
                        {isCoFounder && <Link href="/matches"><StatsCard title="Co-founder Matches" value={talentMatches?.length.toString() ?? '0'} icon={UserCheck} description="Potential co-founders" /></Link>}
                        <Link href="/messages"><StatsCard title="Messages" value={unreadMessages?.length.toString() ?? '0'} icon={Mail} description="Unread messages" /></Link>
                    </div>
                </div>
            </div>
        );
    }
    
    const getConsolePlaceholder = (role?: string) => {
        switch (role) {
            case 'founder':
                return "Ask: 'Find active Seed SaaS investors' or 'Draft a reply to Charles'...";
            case 'investor':
                return "Ask: 'Show me AI startups in Seed stage' or 'Find fractional leaders'...";
            case 'talent':
                return "Ask: 'Search open HealthTech jobs' or 'Find co-founder matches'...";
            default:
                return "Ask OkiAgent: 'Find connections', 'Match investment thesis', or navigate app...";
        }
    };

    const getConsoleSuggestions = (role?: string) => {
        switch (role) {
            case 'founder':
                return [
                    { label: "🔍 Find Seed investors", query: "Can you recommend Seed investors focused on B2B SaaS?" },
                    { label: "👥 Recruit fractional COO", query: "I want to hire a fractional COO with startup scaling experience." },
                    { label: "💬 Draft response to investor", query: "Draft a professional reply to an investor named Charles who asked about our cap table." },
                    { label: "🧭 Navigating Okidex", query: "How do I use this platform to raise capital?" }
                ];
            case 'investor':
                return [
                    { label: "🚀 Search AI startups", query: "Show me B2B SaaS or AI startups currently in Seed stage." },
                    { label: "💼 Recruit portfolio talent", query: "Find me fractional product leaders or CTOs for my portfolio companies." },
                    { label: "🔍 Match investment thesis", query: "Find startups that match an investment thesis of fintech/logistics." },
                    { label: "🧭 Guide to platform", query: "What are the key pages and features of the Okidex platform?" }
                ];
            case 'talent':
                return [
                    { label: "💼 Browse HealthTech jobs", query: "Show me job listings in HealthTech or biotech." },
                    { label: "🤝 Find co-founder opportunities", query: "Search for founders who are seeking a technical co-founder." },
                    { label: "🧭 Navigation help", query: "Explain how to apply for jobs and connect with startups." },
                    { label: "📈 Google: Tech compensation trends", query: "What are the latest compensation and remote work trends for senior React developers in 2026?" }
                ];
            default:
                return [
                    { label: "🧭 Navigation guide", query: "Can you guide me on how to navigate this app?" },
                    { label: "🔍 Search startups", query: "Search for startups in London." }
                ];
        }
    };

    const handleAgentSearch = () => {
        if (!agentInput.trim()) {
            return;
        }
        openAgentWithQuery(agentInput);
        setAgentInput("");
    };

    const handleSuggestionClick = (query: string) => {
        openAgentWithQuery(query);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold tracking-tight font-headline">Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}!</h1>
            </div>

            {/* OkiAgent Hero Console */}
            <style>{`
                @keyframes border-rotate {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .ai-gradient-border {
                    position: relative;
                    border-radius: 0.85rem;
                    padding: 2.5px;
                    background: linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6);
                    background-size: 300% 300%;
                    animation: border-rotate 6s ease infinite;
                    box-shadow: 0 0 15px rgba(139, 92, 246, 0.15);
                }
                .ai-gradient-inner {
                    background: hsl(var(--background));
                    border-radius: calc(0.85rem - 2.5px);
                    display: flex;
                    align-items: center;
                }
            `}</style>

            <Card className="relative overflow-hidden border border-violet-500/15 bg-gradient-to-tr from-violet-600/5 via-transparent to-transparent shadow-sm p-2 rounded-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                    <Sparkles className="h-32 w-32 text-violet-600" />
                </div>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="bg-violet-600/15 text-violet-600 text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <Sparkles className="h-3 w-3 text-violet-600 fill-current" />
                            OKIAGENT AI
                        </span>
                        <span className="bg-amber-600/10 text-amber-600 dark:text-amber-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border border-amber-500/20">
                            Alpha
                        </span>
                    </div>
                    <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground">
                        How can I help you grow today?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Ask Input Bar with animated glowing gradient border */}
                    <div className="flex gap-2.5">
                        <div className="ai-gradient-border flex-1">
                            <div className="relative w-full ai-gradient-inner">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-600 dark:text-violet-400" />
                                <input
                                    type="text"
                                    placeholder={getConsolePlaceholder(currentUser.role)}
                                    value={agentInput}
                                    onChange={(e) => setAgentInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAgentSearch();
                                        }
                                    }}
                                    className="pl-11 pr-4 w-full h-11 text-sm bg-transparent border-0 rounded-xl focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60"
                                />
                            </div>
                        </div>
                        <Button 
                            onClick={handleAgentSearch}
                            className="bg-violet-600 hover:bg-violet-700 text-white h-[49px] px-6 rounded-xl font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            Search
                            <Sparkles className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    {/* Suggestions (Mini chips, very clean & unobtrusive) */}
                    <div className="flex flex-wrap gap-1.5">
                        {getConsoleSuggestions(currentUser.role).map((s, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSuggestionClick(s.query)}
                                className="bg-background hover:bg-violet-600/5 hover:text-violet-700 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-800 text-[11px] px-3.5 py-1.5 rounded-full border border-border/60 text-muted-foreground transition-all duration-150 cursor-pointer font-semibold shadow-xs"
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>


            {currentUser.email && !(currentUser.email.endsWith('@example.com') || (currentUser as any).emailVerified) && (
                <Card className="bg-amber-50 border-amber-200">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-600" />
                        <div>
                            <CardTitle className="text-amber-900">Verify Your Email Address</CardTitle>
                            <CardDescription className="text-amber-700">Please check your inbox for a verification link. Access to some features may be limited until your email is confirmed.</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            )}
            
            {currentUser.role === 'founder' && renderFounderDashboard()}
            {currentUser.role === 'investor' && renderInvestorDashboard()}
            {currentUser.role === 'talent' && renderTalentDashboard()}
        </div>
    );
}
