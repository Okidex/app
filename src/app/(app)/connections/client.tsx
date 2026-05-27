"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFirestore, useUser, useAuth, useMemoFirebase, useCollection } from "@/firebase";
import { FullUserProfile, Startup, FounderProfile, InvestorProfile, TalentProfile, Match } from "@/lib/types";
import { getOrCreateConversation } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/shared/user-avatar";
import {
    Users,
    MessageSquare,
    ExternalLink,
    Briefcase,
    Building2,
    TrendingUp,
    Sparkles,
    Loader2,
    HeartHandshake
} from "lucide-react";
import Link from "next/link";

export default function ConnectionsClient() {
    const { user: currentUser, isUserLoading: authLoading } = useUser();
    const auth = useAuth() as any;
    const db = useFirestore();
    const router = useRouter();
    const { toast } = useToast();

    const [connectedUsers, setConnectedUsers] = useState<FullUserProfile[]>([]);
    const [startups, setStartups] = useState<Map<string, Startup>>(new Map());
    const [usersLoading, setUsersLoading] = useState(false);
    const [isMessagingId, setIsMessagingId] = useState<string | null>(null);

    // 1. Listen for matches involving current user
    const matchesQuery = useMemoFirebase(() => 
        db && currentUser?.id ? query(
            collection(db, "matches"), 
            where("participantIds", "array-contains", currentUser.id)
        ) : null, [db, currentUser]);

    const { data: matches, isLoading: matchesLoading } = useCollection<Match>(matchesQuery);

    // 2. Extract connected user IDs from the matches
    const otherUserIds = useMemo(() => {
        if (!matches) return [];
        return matches
            .filter(m => (m as any).status === 'connected')
            .map(m => m.participantIds.find(id => id !== currentUser?.id))
            .filter(Boolean) as string[];
    }, [matches, currentUser?.id]);

    const otherUserIdsKey = otherUserIds.join(",");

    // 3. Fetch user profiles of connected users
    useEffect(() => {
        if (!db || otherUserIds.length === 0) {
            setConnectedUsers([]);
            return;
        }

        const fetchUsers = async () => {
            setUsersLoading(true);
            try {
                const chunks: string[][] = [];
                for (let i = 0; i < otherUserIds.length; i += 30) {
                    chunks.push(otherUserIds.slice(i, i + 30));
                }

                const fetched: FullUserProfile[] = [];
                for (const chunk of chunks) {
                    const q = query(collection(db, "users"), where("id", "in", chunk));
                    const snap = await getDocs(q);
                    snap.forEach(doc => {
                        fetched.push({ id: doc.id, ...doc.data() } as FullUserProfile);
                    });
                }
                setConnectedUsers(fetched);
            } catch (e) {
                console.error("Error fetching connected users:", e);
            } finally {
                setUsersLoading(false);
            }
        };

        fetchUsers();
    }, [db, otherUserIdsKey]);

    // 4. Fetch startup information for connected founders
    useEffect(() => {
        const companyIds = connectedUsers
            .filter(u => u.role === 'founder')
            .map(u => (u.profile as FounderProfile)?.companyId)
            .filter(Boolean) as string[];

        if (!db || companyIds.length === 0) {
            setStartups(new Map());
            return;
        }

        const fetchStartups = async () => {
            try {
                const chunks: string[][] = [];
                for (let i = 0; i < companyIds.length; i += 30) {
                    chunks.push(companyIds.slice(i, i + 30));
                }

                const newStartups = new Map<string, Startup>();
                for (const chunk of chunks) {
                    const q = query(collection(db, "startups"), where("id", "in", chunk));
                    const snap = await getDocs(q);
                    snap.forEach(doc => {
                        newStartups.set(doc.id, { id: doc.id, ...doc.data() } as Startup);
                    });
                }
                setStartups(newStartups);
            } catch (e) {
                console.error("Error fetching startups:", e);
            }
        };

        fetchStartups();
    }, [db, connectedUsers]);

    // 5. Handle starting/viewing conversation
    const handleMessage = async (targetUid: string) => {
        setIsMessagingId(targetUid);
        try {
            const idToken = auth?.currentUser ? await auth.currentUser.getIdToken() : undefined;
            const res = await getOrCreateConversation(targetUid, idToken);
            if (res.success && res.conversationId) {
                router.push(`/messages?id=${res.conversationId}`);
            } else {
                toast({
                    title: "Error starting conversation",
                    description: res.error || "Please try again later.",
                    variant: "destructive"
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "An unexpected error occurred.",
                variant: "destructive"
            });
        } finally {
            setIsMessagingId(null);
        }
    };

    // 6. Filter connections by role
    const founders = useMemo(() => connectedUsers.filter(u => u.role === "founder"), [connectedUsers]);
    const talent = useMemo(() => connectedUsers.filter(u => u.role === "talent"), [connectedUsers]);
    const investors = useMemo(() => connectedUsers.filter(u => u.role === "investor"), [connectedUsers]);

    const isPageLoading = authLoading || matchesLoading || usersLoading;

    if (isPageLoading) {
        return (
            <div className="container max-w-6xl py-8 space-y-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="h-5 w-96" />
                </div>
                <Skeleton className="h-10 w-full max-w-md" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="border-none shadow-sm">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-24" />
                                    <Skeleton className="h-8 w-24" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="container max-w-md py-20 text-center space-y-4">
                <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                <h2 className="text-xl font-bold">Please log in</h2>
                <p className="text-muted-foreground">You must be logged in to view your connections.</p>
            </div>
        );
    }

    const renderEmptyState = (roleName: string) => (
        <Card className="border-dashed border-2 border-muted bg-background/30 backdrop-blur-sm p-12 text-center max-w-xl mx-auto my-8">
            <CardContent className="space-y-4 flex flex-col items-center justify-center p-0">
                <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground">
                    <Users className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-bold">No connected {roleName} yet</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Build your network by searching the ecosystem and sending connection requests.
                    </p>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-2">
                    <Link href="/search">Explore Ecosystem</Link>
                </Button>
            </CardContent>
        </Card>
    );

    const renderUserCard = (user: FullUserProfile) => {
        let detailsNode = null;
        let badges: string[] = [];

        if (user.role === "founder") {
            const profile = user.profile as FounderProfile;
            const startup = profile.companyId ? startups.get(profile.companyId) : null;
            detailsNode = (
                <div className="space-y-2 mt-2">
                    <p className="text-sm text-muted-foreground line-clamp-1">
                        {profile.title || "Founder"}
                    </p>
                    {startup && (
                        <div className="flex items-center gap-2 text-xs border border-border/40 bg-secondary/30 rounded-lg p-2 max-w-full">
                            {startup.companyLogoUrl ? (
                                <img
                                    src={startup.companyLogoUrl}
                                    alt={startup.companyName}
                                    className="h-6 w-6 object-cover rounded bg-background shrink-0"
                                />
                            ) : (
                                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                            )}
                            <span className="font-semibold text-foreground truncate">{startup.companyName}</span>
                        </div>
                    )}
                </div>
            );
        } else if (user.role === "talent") {
            const profile = user.profile as TalentProfile;
            detailsNode = (
                <div className="space-y-1 mt-2">
                    <p className="text-sm text-foreground line-clamp-2 italic">
                        &ldquo;{profile.headline || "Talent Network Member"}&rdquo;
                    </p>
                </div>
            );
            badges = profile.skills?.slice(0, 3) || [];
        } else if (user.role === "investor") {
            const profile = user.profile as InvestorProfile;
            detailsNode = (
                <div className="space-y-2 mt-2">
                    <p className="text-sm text-muted-foreground font-medium truncate">
                        {profile.companyName || "Angel Investor"}
                    </p>
                    {profile.thesis && (
                        <p className="text-xs text-muted-foreground line-clamp-2 bg-secondary/20 p-2 rounded">
                            {profile.thesis}
                        </p>
                    )}
                </div>
            );
            badges = profile.investmentInterests?.slice(0, 2) || [];
        }

        return (
            <Card
                key={user.id}
                className="overflow-hidden border border-border/50 bg-background/50 hover:bg-background/80 backdrop-blur hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
                <CardHeader className="p-5 pb-3">
                    <div className="flex items-start gap-4">
                        <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-12 h-12 shrink-0 border-2 border-background shadow-sm" />
                        <div className="space-y-1 overflow-hidden flex-1">
                            <h3 className="font-bold text-base text-foreground leading-tight truncate hover:text-primary transition-colors">
                                <Link href={`/user?id=${user.id}`}>
                                    {user.name}
                                </Link>
                            </h3>
                            <Badge className="capitalize text-[10px] py-0.5 px-2 bg-primary/10 text-primary hover:bg-primary/20 border-none w-fit">
                                {user.role}
                            </Badge>
                            {detailsNode}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                        {badges.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {badges.map((badge, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-[10px] font-normal">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2.5 pt-4 border-t border-border/40">
                        <Button
                            onClick={() => handleMessage(user.id)}
                            disabled={isMessagingId === user.id}
                            size="sm"
                            className="flex-1 text-xs gap-1.5 shadow-sm active:scale-95 transition-all"
                        >
                            {isMessagingId === user.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <MessageSquare className="h-3.5 w-3.5" />
                            )}
                            Message
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="text-xs shrink-0 px-2.5 active:scale-95 transition-all"
                        >
                            <Link href={`/user?id=${user.id}`}>
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="container max-w-6xl py-8 space-y-8 animate-in fade-in duration-300">
            {/* Header section with gradient background */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 md:p-8 border border-primary/10 shadow-sm">
                <div className="space-y-2 relative z-10">
                    <div className="flex items-center gap-2">
                        <HeartHandshake className="h-6 w-6 text-primary animate-pulse" />
                        <h1 className="text-3xl font-extrabold tracking-tight font-headline">My Connections</h1>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        Keep track of your professional relationships on Okidex. You can start messaging and exchanging opportunities with anyone listed here.
                    </p>
                </div>
                <div className="absolute top-0 right-0 h-full w-1/3 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
            </div>

            {/* Segmented tab view for Founders, Talent, Investors */}
            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="bg-secondary/40 border border-border/40 p-1 w-full max-w-lg justify-start backdrop-blur-sm">
                    <TabsTrigger value="all" className="flex-1 text-xs md:text-sm gap-1.5 py-2">
                        All <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-background/50">{connectedUsers.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="founders" className="flex-1 text-xs md:text-sm gap-1.5 py-2">
                        Founders <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-background/50">{founders.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="talent" className="flex-1 text-xs md:text-sm gap-1.5 py-2">
                        Talent <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-background/50">{talent.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="investors" className="flex-1 text-xs md:text-sm gap-1.5 py-2">
                        Investors <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 bg-background/50">{investors.length}</Badge>
                    </TabsTrigger>
                </TabsList>

                {/* All tab content */}
                <TabsContent value="all" className="outline-none">
                    {connectedUsers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {connectedUsers.map(renderUserCard)}
                        </div>
                    ) : renderEmptyState("people")}
                </TabsContent>

                {/* Founders tab content */}
                <TabsContent value="founders" className="outline-none">
                    {founders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {founders.map(renderUserCard)}
                        </div>
                    ) : renderEmptyState("founders")}
                </TabsContent>

                {/* Talent tab content */}
                <TabsContent value="talent" className="outline-none">
                    {talent.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {talent.map(renderUserCard)}
                        </div>
                    ) : renderEmptyState("talent")}
                </TabsContent>

                {/* Investors tab content */}
                <TabsContent value="investors" className="outline-none">
                    {investors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {investors.map(renderUserCard)}
                        </div>
                    ) : renderEmptyState("investors")}
                </TabsContent>
            </Tabs>
        </div>
    );
}
