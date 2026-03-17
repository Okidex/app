"use client";

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
import { useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsersByIds } from "@/lib/actions";
import { toSerializable } from "@/lib/serialize";

/**
 * Shared Types
 */
type ApplicantItem = Interest & { user: FullUserProfile | undefined; targetName: string };

/**
 * Shared UI Component: Applicant List
 */
const ApplicantList = ({ title, items }: { title: string; items: ApplicantItem[] }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {items.length > 0 ? (
                <div className="space-y-4">
                    {items.map(interest => {
                        const parsedDate = interest.timestamp ? new Date(interest.timestamp) : new Date();
                        const safeDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

                        return (
                            <Card key={interest.id}>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <UserAvatar name={interest.user?.name || ''} avatarUrl={interest.user?.avatarUrl || ''} />
                                        <div>
                                            <p><span className="font-semibold">{interest.user?.name}</span> expressed interest in <span className="font-semibold">{interest.targetName}</span></p>
                                            <p className="text-sm text-muted-foreground">{formatDistanceToNow(safeDate, { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                    <Button asChild variant="outline">
                                        <Link href={`/users/${interest.userId}`}>View Profile</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Card className="text-center p-8">
                    <p className="text-muted-foreground">No applicants for this category yet.</p>
                </Card>
            )}
        </div>
    );
};

/**
 * View for Investors
 */
const InvestorApplicantsView = ({ currentUser }: { currentUser: FullUserProfile }) => {
    const [thesisInterests, setThesisInterests] = useState<ApplicantItem[]>([]);
    const [jobInterests, setJobInterests] = useState<ApplicantItem[]>([]);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    const thesesQuery = useMemoFirebase(() => db && currentUser?.id ? query(collection(db, "theses"), where("investorId", "==", currentUser.id)) : null, [db, currentUser]);
    const jobsQuery = useMemoFirebase(() => db && currentUser?.id ? query(collection(db, "jobs"), where("founderId", "==", currentUser.id)) : null, [db, currentUser]);

    useEffect(() => {
        const fetchInterests = async () => {
            if (!db || !currentUser?.id) return;
            
            const thesesSnap = thesesQuery ? await getDocs(thesesQuery) : null;
            const myTheses = thesesSnap ? thesesSnap.docs.map(doc => toSerializable({ id: doc.id, ...doc.data() }) as InvestmentThesis) : [];

            const jobsSnap = jobsQuery ? await getDocs(jobsQuery) : null;
            const myJobs = jobsSnap ? jobsSnap.docs.map(doc => toSerializable({ id: doc.id, ...doc.data() }) as Job) : [];

            const allUserIds: string[] = [];

            if (myTheses.length > 0) {
                const thesisInterestsQuery = query(collection(db, "interests"), where("targetType", "==", "thesis"), where("targetId", "in", myTheses.map(t => t.id)));
                const thesisInterestsSnap = await getDocs(thesisInterestsQuery);
                const interestsData = thesisInterestsSnap.docs.map(doc => toSerializable(doc.data()) as Interest);
                interestsData.forEach(i => { if (!allUserIds.includes(i.userId)) allUserIds.push(i.userId); });
                setThesisInterests(interestsData.map(i => ({
                    ...i,
                    user: undefined,
                    targetName: myTheses.find(t => t.id === i.targetId)?.title || 'a thesis'
                })));
            }

            if (myJobs.length > 0) {
                const jobInterestsQuery = query(collection(db, "interests"), where("targetType", "==", "job"), where("targetId", "in", myJobs.map(j => j.id)));
                const jobInterestsSnap = await getDocs(jobInterestsQuery);
                const interestsData = jobInterestsSnap.docs.map(doc => toSerializable(doc.data()) as Interest);
                interestsData.forEach(i => { if (!allUserIds.includes(i.userId)) allUserIds.push(i.userId); });
                setJobInterests(interestsData.map(i => ({
                    ...i,
                    user: undefined,
                    targetName: myJobs.find(j => j.id === i.targetId)?.title || 'a job'
                })));
            }
            
            if(allUserIds.length > 0) {
                const users = await getUsersByIds(allUserIds);
                setThesisInterests(prev => prev.map(item => ({...item, user: users.find(u => u.id === item.userId)})));
                setJobInterests(prev => prev.map(item => ({...item, user: users.find(u => u.id === item.userId)})));
            }
            
            setLoading(false);
        };
        fetchInterests();
    }, [currentUser, db, thesesQuery, jobsQuery]);

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

/**
 * View for Oki+ Founders
 */
const FounderApplicantsView = ({ currentUser }: { currentUser: FullUserProfile }) => {
    const [jobInterests, setJobInterests] = useState<ApplicantItem[]>([]);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        const fetchInterests = async () => {
            if (!db || !currentUser?.id) return;
            setLoading(false);
        };
        fetchInterests();
    }, [currentUser, db]);

    if (loading) return <div><Skeleton className="h-10 w-64 mb-4" /><Skeleton className="h-32 w-full" /></div>;

    return (
        <div className="space-y-6">
            <ApplicantList title="Job Applicants" items={jobInterests} />
        </div>
    );
};

/**
 * Restricted Access UI
 */
const RestrictedAccess = () => (
    <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md w-full text-center p-8">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <CardTitle>Restricted Access</CardTitle>
                <CardDescription>
                    This page is only available to Investors and Oki+ Founders.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/settings/billing">Upgrade to Oki+</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);

/**
 * Main Page Component
 */
export default function ApplicantsClientContent() {
    const userResult = useUser() as any;
    const currentUser = userResult.user;
    // Fallback logic to satisfy whichever property name the hook uses
    const isLoading = userResult.isLoading || userResult.loading;

    if (isLoading) return (
        <div className="p-8">
            <Skeleton className="h-12 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
        </div>
    );

    if (!currentUser) return <RestrictedAccess />;

    const isInvestor = currentUser.role === 'investor';
    const isPremiumFounder = currentUser.role === 'founder' && (currentUser.profile as FounderProfile)?.isPremium;

    if (isInvestor) return <InvestorApplicantsView currentUser={currentUser} />;
    if (isPremiumFounder) return <FounderApplicantsView currentUser={currentUser} />;

    return <RestrictedAccess />;
}
