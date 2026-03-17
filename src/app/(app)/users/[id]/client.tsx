'use client';

import { useState, useEffect } from "react";
import { 
    FullUserProfile, Startup, FounderProfile, InvestorProfile, 
    TalentProfile, PortfolioCompany, Exit, UserRole, Match 
} from "@/lib/types";
import { 
    getStartupById, sendConnectionRequest, 
    getOrCreateConversation, respondToConnectionRequest 
} from "@/lib/actions";
import { useUser, useAuth, useFirestore, useCollection } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { 
    Building, DollarSign, Link as LinkIcon, Users, 
    Lightbulb, Briefcase, GraduationCap, Loader2, Check, X,
    MapPin
} from "lucide-react";
import Image from "next/image";
import LockedFinancialsCard from "@/components/profile/locked-financials-card";
import CapTableCard from "@/components/profile/cap-table-card";
import AddFinancialsPrompt from "@/components/profile/add-financials-prompt";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { collection, query, where } from "firebase/firestore";

// --- Helper Components ---
const ProfileSection = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon: React.ElementType }) => (
    <Card>
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

/**
 * Main Client Component
 */
export default function UserProfileClient({ initialUser }: { initialUser: FullUserProfile }) {
    /**
     * [FIX] Type-casting bypass for useUser and useAuth
     */
    const userResult = useUser() as any;
    const currentUser = userResult.user;
    const authLoading = userResult.loading || userResult.isLoading;
    const auth = useAuth() as any; 
    
    const { toast } = useToast();
    const router = useRouter();
    const db = useFirestore();
    const [isConnecting, setIsConnecting] = useState(false);

    // Fetch existing connection/request status
    const connectionsQuery = useMemoFirebase(() => 
        db && currentUser?.id ? query(
            collection(db, "matches"), 
            where("users", "array-contains", currentUser.id)
        ) : null, [db, currentUser]);
    
    const { data: matches } = useCollection<Match>(connectionsQuery);

    /**
     * [FIX] Type assertions to bypass WithId<Match> property visibility issues
     */
    const connection = matches?.find(m => (m as any).users?.includes(initialUser.id));
    const isConnected = (connection as any)?.status === 'connected';
    const sentRequest = (connection as any)?.status === 'pending' && (connection as any).createdBy === currentUser?.id;
    const receivedRequests = matches?.filter(m => (m as any).status === 'pending' && (m as any).createdBy === initialUser.id);

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
                                <div className="flex gap-2 items-center">
                                    <Badge variant="secondary" className="capitalize">{initialUser.role}</Badge>
                                    {isConnected && <Badge variant="outline" className="text-green-500 border-green-500/50">Connected</Badge>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-2">
                            {isConnected ? (
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
                                currentUser?.id !== initialUser.id && (
                                    <Button onClick={handleConnect} disabled={isConnecting}>
                                        {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <ProfileSection title="About" icon={Users}>
                        <p>{(initialUser.profile as any)?.about || "No description provided."}</p>
                    </ProfileSection>
                </div>
            </div>
        </div>
    );
}

/**
 * Utility to handle Firebase Query logic in hooks
 */
function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
    const [val, setVal] = useState<T>(factory);
    useEffect(() => { setVal(factory()); }, deps);
    return val;
}
