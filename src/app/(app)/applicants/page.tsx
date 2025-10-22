
"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FullUserProfile, Interest, FounderProfile, Job, InvestmentThesis } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Lock } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

type ApplicantItem = Interest & { user: FullUserProfile | undefined; targetName: string };

const ApplicantList = ({ title, items }: { title: string; items: ApplicantItem[] }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {items.length > 0 ? (
                <div className="space-y-4">
                    {items.map(interest => (
                        <Card key={interest.id}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <UserAvatar name={interest.user?.name || ''} avatarUrl={interest.user?.avatarUrl || ''} />
                                    <div>
                                        <p><span className="font-semibold">{interest.user?.name}</span> expressed interest in <span className="font-semibold">{interest.targetName}</span></p>
                                        <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(interest.timestamp), { addSuffix: true })}</p>
                                    </div>
                                </div>
                                <Button asChild variant="outline">
                                    <Link href={`/users/${interest.userId}`}>View Profile</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="text-center p-8">
                    <p className="text-muted-foreground">No applicants for this category yet.</p>
                </Card>
            )}
        </div>
    )
}

const InvestorApplicantsView = ({ currentUser }: { currentUser: FullUserProfile }) => {
    const [thesisInterests, setThesisInterests] = useState<ApplicantItem[]>([]);
    const [jobInterests, setJobInterests] = useState<ApplicantItem[]>([]);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        const fetchInterests = async () => {
            if (!db) return;
            // Fetch theses created by investor
            const thesesQuery = query(collection(db, "theses"), where("investorId", "==", currentUser.id));
            const thesesSnap = await getDocs(thesesQuery);
            const myTheses = thesesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestmentThesis));

            // Fetch jobs created by investor
            const jobsQuery = query(collection(db, "jobs"), where("founderId", "==", currentUser.id));
            const jobsSnap = await getDocs(jobsQuery);
            const myJobs = jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));

            const allUserIds: string[] = [];

            // Fetch interests for theses
            if (myTheses.length > 0) {
                const thesisInterestsQuery = query(collection(db, "interests"), where("targetType", "==", "thesis"), where("targetId", "in", myTheses.map(t => t.id)));
                const thesisInterestsSnap = await getDocs(thesisInterestsQuery);
                const interestsData = thesisInterestsSnap.docs.map(doc => doc.data() as Interest);
                setThesisInterests(interestsData.map(i => {
                    if (!allUserIds.includes(i.userId)) allUserIds.push(i.userId);
                    return {
                        ...i,
                        user: undefined,
                        targetName: myTheses.find(t => t.id === i.targetId)?.title || 'a thesis'
                    }
                }));
            }

            // Fetch interests for jobs
            if (myJobs.length > 0) {
                const jobInterestsQuery = query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", myJobs.map(j => j.id)));
                const jobInterestsSnap = await getDocs(jobInterestsQuery);
                const interestsData = jobInterestsSnap.docs.map(doc => doc.data() as Interest);
                setJobInterests(interestsData.map(i => {
                    if (!allUserIds.includes(i.userId)) allUserIds.push(i.userId);
                    return {
                        ...i,
                        user: undefined,
                        targetName: myJobs.find(j => j.id === i.targetId)?.title || 'a job'
                    }
                }));
            }
            
            // Fetch user profiles for all interests
            if(allUserIds.length > 0) {
                const usersQuery = query(collection(db, "users"), where("id", "in", allUserIds));
                const usersSnap = await getDocs(usersQuery);
                const users = usersSnap.docs.map(doc => doc.data() as FullUserProfile);

                setThesisInterests(prev => prev.map(item => ({...item, user: users.find(u => u.id === item.userId)})));
                setJobInterests(prev => prev.map(item => ({...item, user: users.find(u => u.id === item.userId)})));
            }
            
            setLoading(false);
        };
        fetchInterests();
    }, [currentUser.id, db]);

    if (loading) return <div><Skeleton className="h-10 w-64 mb-4" /><Skeleton className="h-32 w-full" /></div>;

    return (
        <Tabs defaultValue="theses">
            <TabsList>
                <TabsTrigger value="theses">Thesis Interests ({thesisInterests.length})</TabsTrigger>
                <TabsTrigger value="jobs">Job Applicants ({jobInterests.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="theses" className="pt-4">
                <ApplicantList title="Investment Thesis Interests" items={thesisInterests} />
            </TabsContent>
            <TabsContent value="jobs" className="pt-4">
                <ApplicantList title="Job Applicants" items={jobInterests} />
            </TabsContent>
        </Tabs>
    );
};

const FounderApplicantsView = ({ currentUser }: { currentUser: FullUserProfile }) => {
    const [jobInterests, setJobInterests] = useState<ApplicantItem[]>([]);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        const fetchInterests = async () => {
            if (!db) return;
            const jobsQuery = query(collection(db, "jobs"), where("founderId", "==", currentUser.id));
            const jobsSnap = await getDocs(jobsQuery);
            const myJobs = jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));

            if (myJobs.length > 0) {
                const interestsQuery = query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", myJobs.map(j => j.id)));
                const interestsSnap = await getDocs(interestsQuery);
                const interestsData = interestsSnap.docs.map(doc => doc.data() as Interest);
                
                const userIds = interestsData.map(i => i.userId);
                
                if (userIds.length > 0) {
                    const usersQuery = query(collection(db, "users"), where("id", "in", userIds));
                    const usersSnap = await getDocs(usersQuery);
                    const users = usersSnap.docs.map(doc => doc.data() as FullUserProfile);

                    setJobInterests(interestsData.map(i => ({
                        ...i,
                        user: users.find(u => u.id === i.userId),
                        targetName: myJobs.find(j => j.id === i.targetId)?.title || 'a job'
                    })));
                }
            }
            setLoading(false);
        };
        fetchInterests();
    }, [currentUser.id, db]);

    if (loading) return <div><Skeleton className="h-10 w-64 mb-4" /><Skeleton className="h-32 w-full" /></div>;

    return <ApplicantList title="Job Applicants" items={jobInterests} />;
};

export default function ApplicantsPage() {
    const { user: authUser, isUserLoading: authLoading } = useUser();
    const [currentUser, setCurrentUser] = useState<FullUserProfile | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!authLoading && authUser) {
            getCurrentUser().then(user => {
                setCurrentUser(user);
                setLoading(false);
            });
        } else if (!authLoading && !authUser) {
            setLoading(false);
        }
    }, [authUser, authLoading]);

    if (loading) {
        return <div className="space-y-6">
            <div>
                <Skeleton className="h-8 w-48 mb-2"/>
                <Skeleton className="h-4 w-72"/>
            </div>
            <Skeleton className="h-48 w-full"/>
        </div>
    }

    if (!currentUser) {
        // This can be a redirect or a login prompt
        return <div>Please log in to view applicants.</div>;
    }
    
    const isInvestor = currentUser.role === 'investor';
    const isFounder = currentUser.role === 'founder';
    const isPremiumFounder = isFounder && (currentUser.profile as FounderProfile).isPremium;
    
    if (isFounder && !isPremiumFounder) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Card className="w-full max-w-md p-8">
                    <CardHeader>
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8" />
                        </div>
                        <CardTitle>Upgrade to Oki+</CardTitle>
                        <CardDescription>This feature is available exclusively for Oki+ members. Upgrade your plan to view and manage job applicants.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild size="lg">
                            <Link href="/settings/billing">Upgrade to Oki+</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!isInvestor && !isPremiumFounder) {
         return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Card className="w-full max-w-md p-8">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>This page is only available to Investors and Oki+ Founders.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Applicants</h1>
                <p className="text-muted-foreground">See who has expressed interest in your content.</p>
            </div>
            {isInvestor ? <InvestorApplicantsView currentUser={currentUser} /> : <FounderApplicantsView currentUser={currentUser} />}
        </div>
    );
}

    