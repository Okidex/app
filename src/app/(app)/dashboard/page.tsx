
"use client";

import { useState, useEffect } from "react";
import { FullUserProfile, Job, Startup, InvestmentThesis, FounderProfile, TalentProfile } from "@/lib/types";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Briefcase, CheckCheck, DollarSign, FileText, Mail, Star, UserCheck, Users as UsersIcon, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import SearchBar from "@/components/shared/search-bar";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/actions";


export default function DashboardPage() {
    const { user: authUser, isUserLoading: authLoading } = useUser();
    const [currentUser, setCurrentUser] = useState<FullUserProfile | null>(null);
    const [isUpgradeCardVisible, setIsUpgradeCardVisible] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        if (authLoading) return;
        if (!authUser) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            const userProfile = await getCurrentUser();
            setCurrentUser(userProfile);
            
            if (!userProfile || !db) {
                setLoading(false);
                return;
            }

            let data: any = {};

            if (userProfile.role === 'founder') {
                const q = query(collection(db, "users"), where("role", "!=", "founder"), limit(3));
                const querySnapshot = await getDocs(q);
                data.matches = querySnapshot.docs.map(doc => doc.data() as FullUserProfile);
            }

            if (userProfile.role === 'investor') {
                const thesesQuery = query(collection(db, "theses"), where("investorId", "==", userProfile.id));
                const myThesesSnap = await getDocs(thesesQuery);
                const myTheses = myThesesSnap.docs.map(doc => doc.data() as InvestmentThesis);
                data.myThesesCount = myTheses.length;

                const myJobsQuery = query(collection(db, "jobs"), where("founderId", "==", userProfile.id));
                const myJobsSnap = await getDocs(myJobsQuery);
                const myJobs = myJobsSnap.docs.map(doc => doc.data() as Job);

                if (myTheses.length > 0) {
                    const thesisInterestsQuery = query(collection(db, "interests"), where("targetType", "==", "thesis"), where("targetId", "in", myTheses.map(t => t.id)));
                    const thesisInterestsSnap = await getDocs(thesisInterestsQuery);
                    data.thesisInterestsCount = thesisInterestsSnap.size;
                } else {
                    data.thesisInterestsCount = 0;
                }

                if (myJobs.length > 0) {
                    const jobInterestsQuery = query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", myJobs.map(j => j.id)));
                    const jobInterestsSnap = await getDocs(jobInterestsQuery);
                    data.jobInterestsCount = jobInterestsSnap.size;
                } else {
                     data.jobInterestsCount = 0;
                }
            }

            if (userProfile.role === 'talent') {
                const jobsQuery = query(collection(db, "jobs"), limit(3));
                const jobsSnapshot = await getDocs(jobsQuery);
                data.recommendedJobs = jobsSnapshot.docs.map(doc => doc.data() as Job);
            }

            setDashboardData(data);
            setLoading(false);
        };

        fetchData();

    }, [authUser, authLoading, db]);

    if (authLoading || loading || !currentUser || !dashboardData) {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-12 w-full max-w-sm" />
                </div>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <Skeleton className="h-64" />
            </div>
        )
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
                <Link href="/matches"><StatsCard title="Active Matches" value="12" icon={CheckCheck} description="+180.1% from last month" /></Link>
                <Link href="/applicants"><StatsCard title="Job Applicants" value="32" icon={Briefcase} description="+19% from last month" /></Link>
                <Link href="/applicants"><StatsCard title="Investor Interest" value="4" icon={DollarSign} description="From top-tier VCs" /></Link>
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
                        {dashboardData.matches.map((match: FullUserProfile) => (
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
                    </CardContent>
                </Card>
            </div>
        </>
    );

    const renderInvestorDashboard = () => {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/theses"><StatsCard title="Theses Posted" value={dashboardData.myThesesCount.toString()} icon={FileText} description="Share your focus" /></Link>
                <Link href="/applicants"><StatsCard title="Thesis Applicants" value={dashboardData.thesisInterestsCount.toString()} icon={UsersIcon} description="Interest in your theses" /></Link>
                <Link href="/applicants"><StatsCard title="Job Applicants" value={dashboardData.jobInterestsCount.toString()} icon={Briefcase} description="Interest in your jobs" /></Link>
                <StatsCard title="Startups Viewed" value="89" icon={Activity} description="+15 from last week" />
                <Link href="/matches"><StatsCard title="Active Matches" value="5" icon={CheckCheck} description="Ready for outreach" /></Link>
                <Link href="/search"><StatsCard title="New Opportunities" value="18" icon={DollarSign} description="In your target industries" /></Link>
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
                <Link href="/jobs">View</Link>
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
                            <CardTitle>Job Matches ({dashboardData.recommendedJobs.length})</CardTitle>
                            <CardDescription>Recommended jobs that match your profile and skills.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {dashboardData.recommendedJobs.map((job: Job) => <RecommendedJobCard key={job.id} job={job} />)}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                     <div className="grid gap-4">
                        <StatsCard title="Profile Views" value="350" icon={UsersIcon} description="+32 from last week" />
                        <Link href="/jobs"><StatsCard title="Applications" value="3" icon={FileText} description="2 viewed, 1 pending" /></Link>
                        {isCoFounder && <Link href="/matches"><StatsCard title="Co-founder Matches" value="8" icon={UserCheck} description="Potential co-founders" /></Link>}
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

            {authUser && !authUser.emailVerified && (
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
