'use client';

import { useState } from "react";
import { FullUserProfile, Job, FounderProfile, TalentProfile } from "@/lib/types";
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Briefcase, CheckCheck, DollarSign, FileText, Mail, Star, UserCheck, Users as UsersIcon, X } from "lucide-react";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import Image from "next/image";

export default function DashboardClient({ currentUser, dashboardData }: { currentUser: FullUserProfile, dashboardData: any }) {
    const [isUpgradeCardVisible, setIsUpgradeCardVisible] = useState(true);

    const isFounder = currentUser.role === 'founder';
    const isPremiumFounder = isFounder && (currentUser.profile as FounderProfile).isPremium;

    const renderFounderDashboard = () => (
        <>
             {!isPremiumFounder && isUpgradeCardVisible && (
                <Card className="bg-primary/5 border-primary/20 relative mb-6">
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
            <div className="grid gap-4 mt-6">
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

    const renderInvestorDashboard = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/theses"><StatsCard title="Theses Posted" value={dashboardData.myThesesCount.toString()} icon={FileText} description="Share your focus" /></Link>
            <Link href="/applicants"><StatsCard title="Thesis Applicants" value={dashboardData.thesisInterestsCount.toString()} icon={UsersIcon} description="Interest in your theses" /></Link>
            <Link href="/applicants"><StatsCard title="Job Applicants" value={dashboardData.jobInterestsCount.toString()} icon={Briefcase} description="Interest in your jobs" /></Link>
            <StatsCard title="Startups Viewed" value="89" icon={Activity} description="+15 from last week" />
            <Link href="/matches"><StatsCard title="Active Matches" value="5" icon={CheckCheck} description="Ready for outreach" /></Link>
            <Link href="/search"><StatsCard title="New Opportunities" value="18" icon={DollarSign} description="In your target industries" /></Link>
        </div>
    );

    const RecommendedJobCard = ({ job }: { job: Job }) => (
        <div className="flex items-start gap-4">
            <Image src={job.companyLogoUrl} alt={job.companyName} width={40} height={40} className="rounded-full border" />
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
    
    // FIXED: Removed displayName as it doesn't exist on FullUserProfile type
    const userFirstName = (currentUser.name || 'User').split(' ')[0];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userFirstName}!</h1>
                <p className="text-muted-foreground">Here is what is happening with your network today.</p>
            </div>

            {isFounder && renderFounderDashboard()}
            {currentUser.role === 'investor' && renderInvestorDashboard()}
            {currentUser.role === 'talent' && renderTalentDashboard()}
        </div>
    );
}
