'use client';

import { useState, useEffect } from "react";
import { 
    FullUserProfile, Startup, FounderProfile, InvestorProfile, 
    TalentProfile, Match 
} from "@/lib/types";
import { 
    getStartupById, sendConnectionRequest, 
    getOrCreateConversation, respondToConnectionRequest 
} from "@/lib/actions";
import { useUser, useAuth, useFirestore, useCollection } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { 
    Users, Loader2, Check, X,
    Building2, Briefcase, GraduationCap, Target, MapPin, Search, Edit, Globe, Activity, Code, List, Scale
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { collection, query, where } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LockedFinancialsCard from "@/components/profile/locked-financials-card";
import CapTableCard from "@/components/profile/cap-table-card";
import { cn } from "@/lib/utils";

const ProfileSection = ({ title, children, icon: Icon, className = "" }: { title: string, children: React.ReactNode, icon: React.ElementType, className?: string }) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
                <Icon className="w-5 h-5 text-muted-foreground" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
            {children}
        </CardContent>
    </Card>
);

const formatCurrency = (value: number) => {
    if (value === 0) return "-";
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
};

export default function UserProfileClient({ initialUser }: { initialUser: FullUserProfile }) {
    const userResult = useUser() as any;
    const currentUser = userResult.user;
    const authLoading = userResult.isUserLoading;
    const auth = useAuth() as any; 
    
    const { toast } = useToast();
    const router = useRouter();
    const db = useFirestore();
    const [isConnecting, setIsConnecting] = useState(false);
    
    const [startup, setStartup] = useState<Startup | null>(null);

    useEffect(() => {
        if (initialUser.role === 'founder' && (initialUser.profile as FounderProfile).companyId) {
            getStartupById((initialUser.profile as FounderProfile).companyId as string)
                .then(data => setStartup(data))
                .catch(console.error);
        }
    }, [initialUser]);

    const connectionsQuery = useMemoFirebase(() => 
        db && currentUser?.id ? query(
            collection(db, "matches"), 
            where("participantIds", "array-contains", currentUser.id)
        ) : null, [db, currentUser]);
    
    const { data: matches } = useCollection<Match>(connectionsQuery);

    const isOwnProfile = currentUser?.id === initialUser.id;
    const connection = matches?.find(m => !isOwnProfile && m.participantIds?.includes(initialUser.id));
    const isConnected = !isOwnProfile && (connection as any)?.status === 'connected';
    const sentRequest = !isOwnProfile && (connection as any)?.status === 'pending' && (connection as any).createdBy === currentUser?.id;
    const receivedRequests = !isOwnProfile ? matches?.filter(m => (m as any).status === 'pending' && (m as any).createdBy === initialUser.id) : [];

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            const idToken = auth?.currentUser ? await auth.currentUser.getIdToken() : undefined;
            const res = await sendConnectionRequest(initialUser.id, idToken);
            if (res.success) {
                toast({ title: "Connection Request Sent" });
            } else {
                toast({ title: "Error", description: res.error, variant: "destructive" });
            }
        } finally {
            setIsConnecting(false);
        }
    };

    const handleMessage = async () => {
        setIsConnecting(true);
        try {
            const idToken = auth?.currentUser ? await auth.currentUser.getIdToken() : undefined;
            const res = await getOrCreateConversation(initialUser.id, idToken);
            if (res.success && res.conversationId) {
                router.push(`/messages?id=${res.conversationId}`);
            } else {
                toast({ title: "Error", description: res.error, variant: "destructive" });
            }
        } finally {
            setIsConnecting(false);
        }
    };

    const handleRespond = async (status: 'accept' | 'declined') => {
        setIsConnecting(true);
        try {
            const idToken = auth?.currentUser ? await auth.currentUser.getIdToken() : undefined;
            const requestId = (receivedRequests?.[0] as any)?.id;
            if (requestId) {
                const res = await respondToConnectionRequest(requestId, status, idToken);
                if (res.success) {
                    toast({ title: status === 'accept' ? "Connection Established!" : "Request Declined" });
                } else {
                    toast({ title: "Error", description: res.error, variant: "destructive" });
                }
            }
        } finally {
            setIsConnecting(false);
        }
    };

    if (authLoading) return <div className="container max-w-6xl py-8"><Skeleton className="h-64 w-full" /></div>;

    const renderRoleSpecificContent = () => {
        if (initialUser.role === 'founder') {
            const profile = initialUser.profile as FounderProfile;
            return (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ProfileSection title="About" icon={Users}>
                            <p>{profile.about || "No description provided."}</p>
                        </ProfileSection>
                        
                        {startup && (
                            <ProfileSection title="Startup Details" icon={Building2}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 bg-muted rounded overflow-hidden">
                                            {startup.companyLogoUrl && <img src={startup.companyLogoUrl} alt={startup.companyName} className="object-cover w-full h-full" />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground">{startup.companyName}</h3>
                                            <p className="text-sm">{startup.tagline}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                        <div>
                                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Industry</span>
                                            <span className="text-foreground">{startup.industry || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stage</span>
                                            <span className="text-foreground">{startup.stage || 'N/A'}</span>
                                        </div>
                                        {startup.website && (
                                            <div className="col-span-2">
                                                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Website</span>
                                                <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{startup.website}</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-2">
                                        <p>{startup.description}</p>
                                    </div>
                                </div>
                            </ProfileSection>
                        )}

                        {startup && (isOwnProfile || (currentUser?.role === 'investor' && isConnected)) && (
                            <ProfileSection title="Legal & Incorporation" icon={Scale}>
                                {startup.incorporationDetails?.isIncorporated ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal Status</span>
                                            <Badge variant="outline" className="text-green-600 border-green-600/30 bg-green-500/5 font-semibold mt-1">Incorporated</Badge>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity Type</span>
                                            <span className="text-foreground font-medium mt-1 block">{startup.incorporationDetails.incorporationType || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Jurisdiction</span>
                                            <span className="text-foreground font-medium mt-1 block">{startup.incorporationDetails.country || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date of Incorporation</span>
                                            <span className="text-foreground font-medium mt-1 block">{formatDate(startup.incorporationDetails.incorporationDate)}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity Number (UEN)</span>
                                            <span className="text-foreground font-mono text-sm mt-1 block">{startup.incorporationDetails.entityNumber || 'N/A'}</span>
                                        </div>
                                        {startup.incorporationDetails.taxId && (
                                            <div>
                                                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Tax ID / EIN</span>
                                                <span className="text-foreground font-mono text-sm mt-1 block">{startup.incorporationDetails.taxId}</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">This startup is currently unincorporated or legal registration is not specified.</span>
                                        <Badge variant="secondary" className="font-semibold text-xs whitespace-nowrap">Not Incorporated</Badge>
                                    </div>
                                )}
                            </ProfileSection>
                        )}

                        {(() => {
                            const isViewerInvestor = currentUser?.role === 'investor';
                            const hasFinancials = startup?.monthlyFinancials && startup.monthlyFinancials.length > 0;
                            const hasCapTable = startup?.capTable && startup.capTable.length > 0;
                            const showFinancialsSection = isViewerInvestor && (hasFinancials || hasCapTable);

                            if (!showFinancialsSection) return null;

                            return isConnected ? (
                                <div className="space-y-6 pt-2">
                                    {hasCapTable && (
                                        <CapTableCard capTable={startup.capTable!} />
                                    )}
                                    {hasFinancials && (
                                        <ProfileSection title="Monthly Financials" icon={Activity}>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Month</TableHead>
                                                        <TableHead className="text-right">Revenue</TableHead>
                                                        <TableHead className="text-right">MRR</TableHead>
                                                        <TableHead className="text-right">Expenses</TableHead>
                                                        <TableHead className="text-right">Net Income</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {startup.monthlyFinancials!.map((fin, idx) => (
                                                        <TableRow key={idx}>
                                                            <TableCell className="font-medium">{fin.month}</TableCell>
                                                            <TableCell className="text-right">{formatCurrency(fin.revenue)}</TableCell>
                                                            <TableCell className="text-right">{formatCurrency(fin.monthlyRecurringRevenue)}</TableCell>
                                                            <TableCell className="text-right text-red-500">{formatCurrency(fin.expenses)}</TableCell>
                                                            <TableCell className={cn("text-right font-semibold", fin.netIncome >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                                                                {formatCurrency(fin.netIncome)}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </ProfileSection>
                                    )}
                                </div>
                            ) : (
                                <div className="pt-2">
                                    <LockedFinancialsCard onConnect={handleConnect} isPending={sentRequest} />
                                </div>
                            );
                        })()}
                    </div>
                    <div className="space-y-6">
                        <ProfileSection title="Founder Objectives" icon={Target}>
                            <div className="flex flex-col gap-2">
                                {profile.isLookingForCoFounder && (
                                    <Badge variant="default" className="w-fit">Looking for Co-Founder</Badge>
                                )}
                                {profile.objectives?.map((obj, i) => (
                                    <Badge key={i} variant="secondary" className="w-fit capitalize">{obj.replace(/([A-Z])/g, ' $1').trim()}</Badge>
                                ))}
                                {(!profile.objectives?.length && !profile.isLookingForCoFounder) && <p>No specific objectives listed.</p>}
                            </div>
                        </ProfileSection>
                    </div>
                </div>
            );
        }

        if (initialUser.role === 'investor') {
            const profile = initialUser.profile as InvestorProfile;
            return (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ProfileSection title="About" icon={Users}>
                            <p>{profile.about || "No description provided."}</p>
                        </ProfileSection>
                        
                        {(profile.companyName || profile.companyLogoUrl) && (
                            <ProfileSection title="Company Details" icon={Building2}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        {profile.companyLogoUrl && (
                                            <div className="h-16 w-16 bg-muted rounded overflow-hidden flex items-center justify-center border">
                                                <img src={profile.companyLogoUrl} alt={profile.companyName} className="object-cover w-full h-full" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground">{profile.companyName || 'Company'}</h3>
                                            {profile.companyUrl && (
                                                <a href={profile.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">{profile.companyUrl}</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ProfileSection>
                        )}
                        
                        <ProfileSection title="Investment Focus" icon={Activity}>
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Interests</span>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.investmentInterests?.map((interest, i) => (
                                            <Badge key={i} variant="secondary">{interest}</Badge>
                                        )) || "None specified"}
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Preferred Stages</span>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.investmentStages?.map((stage, i) => (
                                            <Badge key={i} variant="outline">{stage}</Badge>
                                        )) || "None specified"}
                                    </div>
                                </div>
                            </div>
                        </ProfileSection>
                    </div>
                    <div className="space-y-6">
                        <ProfileSection title="Seeking" icon={Search}>
                            <div className="flex flex-col gap-2">
                                {profile.isHiring && <Badge variant="default" className="w-fit">Currently Hiring</Badge>}
                                {profile.seeking?.map((item, i) => (
                                    <Badge key={i} variant="secondary" className="w-fit">{item}</Badge>
                                ))}
                                {(!profile.seeking?.length && !profile.isHiring) && <p>No preferences listed.</p>}
                            </div>
                        </ProfileSection>

                        {profile.exits && profile.exits.length > 0 && (
                            <ProfileSection title="Exits" icon={List}>
                                <div className="space-y-3">
                                    {profile.exits.map((exit, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                                            <span className="text-foreground">{exit.companyName}</span>
                                            {exit.companyUrl && (
                                                <a href={exit.companyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center">
                                                    <Globe className="w-3 h-3 mr-1" /> Link
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ProfileSection>
                        )}
                    </div>
                </div>
            );
        }

        if (initialUser.role === 'talent') {
            const profile = initialUser.profile as TalentProfile;
            return (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ProfileSection title="About" icon={Users}>
                            <p>{profile.about || "No description provided."}</p>
                        </ProfileSection>
                        
                        <ProfileSection title="Experience" icon={Briefcase}>
                            <p className="whitespace-pre-line">{profile.experience || "No experience details provided."}</p>
                        </ProfileSection>
                        
                        <ProfileSection title="Education" icon={GraduationCap}>
                            <p className="whitespace-pre-line">{profile.education || "No education details provided."}</p>
                        </ProfileSection>
                    </div>
                    <div className="space-y-6">
                        <ProfileSection title="Skills" icon={Code}>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills?.map((skill, i) => (
                                    <Badge key={i} variant="secondary">{skill}</Badge>
                                )) || "No skills listed."}
                            </div>
                        </ProfileSection>
                        <ProfileSection title="Organization" icon={Building2}>
                            <p className="text-foreground font-medium">{profile.organization || "None specified"}</p>
                        </ProfileSection>
                        
                        {(profile.linkedin || profile.github) && (
                            <ProfileSection title="Links" icon={Globe}>
                                <div className="flex flex-col gap-2">
                                    {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center"><Globe className="w-4 h-4 mr-2" /> LinkedIn</a>}
                                    {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center"><Globe className="w-4 h-4 mr-2" /> GitHub</a>}
                                </div>
                            </ProfileSection>
                        )}
                    </div>
                </div>
            );
        }

        return <div />;
    };

    return (
        <div className="container max-w-6xl py-8 space-y-8">
            <Card className="overflow-hidden border-none bg-background/50 backdrop-blur">
                <CardContent className="p-0">
                    <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background" />
                    <div className="px-8 pb-8 -mt-12 flex flex-col md:flex-row gap-6 items-end justify-between">
                        <div className="flex gap-6 items-end">
                            <UserAvatar name={initialUser.name} avatarUrl={initialUser.avatarUrl} className="w-32 h-32 border-4 border-background shadow-xl" />
                            <div className="space-y-1 mb-2">
                                <h1 className="text-3xl font-bold">{initialUser.name}</h1>
                                <div className="flex gap-2 items-center flex-wrap">
                                    {!(initialUser.role === 'founder' && (initialUser.profile as FounderProfile).title) && (
                                        <Badge variant="secondary" className="capitalize">{initialUser.role}</Badge>
                                    )}
                                    {(initialUser.role === 'founder' && (initialUser.profile as FounderProfile).title) && (
                                        <Badge variant="outline">{(initialUser.profile as FounderProfile).title}</Badge>
                                    )}
                                    {(initialUser.role === 'investor' && (initialUser.profile as InvestorProfile).investorType) && (
                                        <Badge variant="outline">{(initialUser.profile as InvestorProfile).investorType}</Badge>
                                    )}
                                    {(initialUser.role === 'investor' && (initialUser.profile as InvestorProfile).companyName) && (
                                        <Badge variant="outline" className="bg-primary/5">{(initialUser.profile as InvestorProfile).companyName}</Badge>
                                    )}
                                    {(initialUser.role === 'talent' && (initialUser.profile as TalentProfile).headline) && (
                                        <Badge variant="outline">{(initialUser.profile as TalentProfile).headline}</Badge>
                                    )}
                                    {isConnected && <Badge variant="outline" className="text-green-500 border-green-500/50">Connected</Badge>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-2">
                            {isOwnProfile ? (
                                <Button onClick={() => router.push('/profile/edit')} variant="outline">
                                    <Edit className="w-4 h-4 mr-2" /> Edit Profile
                                </Button>
                            ) : isConnected ? (
                                <Button onClick={handleMessage} disabled={isConnecting}>
                                    {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Message"}
                                </Button>
                            ) : sentRequest ? (
                                <Button disabled variant="outline">Request Sent</Button>
                            ) : receivedRequests && receivedRequests.length > 0 ? (
                                <div className="flex gap-2">
                                    <Button onClick={() => handleRespond('accept')} disabled={isConnecting}>
                                        <Check className="w-4 h-4 mr-2" /> Accept
                                    </Button>
                                    <Button variant="outline" onClick={() => handleRespond('declined')} disabled={isConnecting}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={handleConnect} disabled={isConnecting}>
                                    {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {renderRoleSpecificContent()}
        </div>
    );
}

function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
    const [val, setVal] = useState<T>(factory);
    useEffect(() => { setVal(factory()); }, deps);
    return val;
}
