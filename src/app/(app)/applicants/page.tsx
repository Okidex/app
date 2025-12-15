// app/applicants/page.tsx

'use client'; // Must be the absolute first line

import { useState, useEffect } from "react";
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
import { getUsersByIds } from "@/lib/actions";

// Forces this page to be rendered at request time, bypassing static generation issues.
export const dynamic = 'force-dynamic';

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
            if (!db || !currentUser?.id) return;
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
                 interestsData.forEach(i => {
                    if (!allUserIds.includes(i.userId)) allUserIds.push(i.userId);
                });
                setThesisInterests(interestsData.map(i => ({
                    ...i,
                    user: undefined,
                    targetName: myTheses.find(t => t.id === i.targetId)?.title || 'a thesis'
                })));
            }

            // Fetch interests for jobs
            if (myJobs.length > 0) {
                const jobInterestsQuery = query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", myJobs.map(j => j.id)));
                const jobInterestsSnap = await getDocs(jobInterestsQuery);
                const interestsData = jobInterestsSnap.docs.map(doc => doc.data() as Interest);
                 interestsData.forEach(i => {
                    if (!allUserIds.includes(i.userId)) allUserIds.push(i.userId);
                });
                setJobInterests(interestsData.map(i => ({
                    ...i,
                    user: undefined,
                    targetName: myJobs.find(j => j.id === i.targetId)?.title || 'a job'
                })));
            }
            
            // Fetch user profiles for all interests
            if(allUserIds.length > 0) {
                const users = await getUsersByIds(allUserIds);
                setThesisInterests(prev => prev.map(item => ({...item, user: users.find(u => u.id === item.userId)})));
                setJobInterests(prev => prev.map(item => ({...item, user: users.find(u => u.id === item.userId)})));
            }
            
            setLoading(false);
        };
        if(currentUser?.id) {
            fetchInterests();
        }
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
            if (!db || !currentUser?.id) return;
            const jobsQuery = query(collection(db, "jobs"), where("founderId", "==", currentUser.id));
            const jobsSnap = await getDocs(jobsQuery);
            const myJobs = jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));

            if (myJobs.length > 0) {
                const interestsQuery = query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", myJobs.map(j => j.id)));
                const interestsSnap = await getDocs(interestsQuery);
                const interestsData = interestsSnap.docs.map(doc => doc.data() as Interest);
                
                const userIds = interestsData.map(i => i.userId);
                
                if (userIds.length > 0) {
                    const users = await getUsersByIds(userIds);
                    setJobInterests(interestsData.map(i => ({
                        ...i,
                        user: users.find(u => u.id === i.userId),
                        targetName: myJobs.find(j => j.id === i.targetId)?.title || 'a job'
                    })));
                }
// Code was cut off here, assuming end of function 
                setLoading(false); 
            }
        };
        if(currentUser?.id) {
            fetchInterests();
        }
    }, [currentUser.id, db]);

    if (loading) return <div><Skeleton className="h-10 w-64 mb-4" /><Skeleton className="h-32 w-full" /></div>;

    const founderProfile = currentUser.profile as FounderProfile;

    if (!founderProfile?.isPremium) {
        return (
            <Card className="text-center p-8">
                <Lock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Premium Feature</h3>
                <p className="mt-1 text-sm text-gray-500">View applicants by upgrading to a premium account.</p>
                <div className="mt-6">
                    <Button>Upgrade Now</Button>
                </div>
            </Card>
        );
    }
    return (
        <ApplicantList title="Job Applicants" items={jobInterests} />
    )
}

export default function ApplicantsPage() {
    const { user: currentUser, isUserLoading: loading } = useUser();

    if (loading) return <div><Skeleton className="h-10 w-64 mb-4" /><Skeleton className="h-96 w-full" /></div>;

    if (!currentUser) return null; // Should ideally redirect to login via layout logic/router logic

    if (currentUser.role === 'investor') {
        return <InvestorApplicantsView currentUser={currentUser} />;
    } else if (currentUser.role === 'founder') {
        return <FounderApplicantsView currentUser={currentUser} />;
    }

    return (
        <Card className="text-center p-8">
            <p className="text-muted-foreground">You do not have access to the applicants page with your current role.</p>
        </Card>
    )
}
