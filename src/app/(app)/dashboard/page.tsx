
'use client';

import { useState, useEffect, useMemo } from 'react';
import { FullUserProfile, Job, FounderProfile, TalentProfile, InvestmentThesis, Interest, Match } from "@/lib/types";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit, getCountFromServer, getDocs } from 'firebase/firestore';
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Briefcase, CheckCheck, DollarSign, FileText, Mail, Star, UserCheck, Users as UsersIcon, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import SearchBar from "@/components/shared/search-bar";
import Image from "next/image";
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const { user: currentUser, isUserLoading } = useUser();
    const db = useFirestore();
    const [isUpgradeCardVisible, setIsUpgradeCardVisible] = useState(true);

    // --- Data Fetching ---

    // Founder: Job Applicants (Interests on jobs posted by founder)
    const founderJobsQuery = useMemoFirebase(() =>
        currentUser?.role === 'founder' && db
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
    const thesisIds = myTheses?.map(t => t.id) || [];
    const thesisInterestsQuery = useMemoFirebase(() => 
        db && thesisIds.length > 0
        ? query(collection(db, "interests"), where("targetType", "==", "thesis"), where("targetId", "in", thesisIds))
        : null
    , [db, thesisIds]);
    const { data: thesisInterests, isLoading: thesisInterestsLoading } = useCollection<Interest>(thesisInterestsQuery);

    const jobIds = myJobs?.map(j => j.id) || [];
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


    const loading = isUserLoading || newFounderMatchesLoading || founderMatchesLoading || thesesLoading || jobsLoading || thesisInterestsLoading || jobInterestsLoading || talentJobsLoading || founderJobApplicantsLoading || talentApplicationsLoading || talentMatchesLoading || investorMatchesLoading;
    
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
                <StatsCard title="Profile Views" value="1,204" icon={UsersIcon} description="+20.1% from last month" />
                <Link href="/matches"><StatsCard title="Active Matches" value={founderMatches?.length.toString() ?? '0'} icon={CheckCheck} description="Connections made" /></Link>
                <Link href="/applicants"><StatsCard title="Job Applicants" value={founderJobApplicants?.length.toString() ?? '0'} icon={Briefcase} description="Total applications received" /></Link>
                <Link href="/matches"><StatsCard title="Investor Interest" value={founderMatches?.filter(m => (m.participants?.find(p => p.id !== currentUser.id)?.role === 'investor')).length.toString() ?? '0'} icon={DollarSign} description="Investors you've matched with" /></Link>
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
                                    <Link href={`/users/${match.id}`}>View</Link>
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
                <StatsCard title="Startups Viewed" value="0" icon={Activity} description="Track startups you view" />
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
        const isCoFounder = (currentUser.profile as TalentProfile).subRole === 'co-founder';
        
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
                        <StatsCard title="Profile Views" value="350" icon={UsersIcon} description="+32 from last week" />
                        <Link href="/jobs"><StatsCard title="Applications" value={talentApplications?.length.toString() ?? '0'} icon={FileText} description="Jobs you've applied to" /></Link>
                        {isCoFounder && <Link href="/matches"><StatsCard title="Co-founder Matches" value={talentMatches?.length.toString() ?? '0'} icon={UserCheck} description="Potential co-founders" /></Link>}
                        <Link href="/messages"><StatsCard title="Messages" value="1" icon={Mail} description="From InnovateAI" /></Link>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold font-headline">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
                <div className="w-full max-w-sm">
                    <SearchBar userRole={currentUser.role} />
                </div>
            </div>

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
