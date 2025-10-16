
"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getUserById } from "@/lib/actions";
import { FullUserProfile, Startup, FounderProfile, InvestorProfile, TalentProfile, UserRole } from "@/lib/types";
import { Check, DollarSign, MessageCircle, TrendingUp, X, Briefcase, BrainCircuit, UserCheck } from "lucide-react";
import UserAvatar from "@/components/shared/user-avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

const formatCurrency = (value: number) => {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
}

const FounderCard = ({ user, startup, style, ...props }: { user: FullUserProfile, startup?: Startup, style?: React.CSSProperties, [key: string]: any }) => {
    const profile = user.profile as FounderProfile;

    if (!startup) {
        return (
            <Card style={style} {...props} className="absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm touch-none items-center justify-center">
                <p>Startup not found.</p>
            </Card>
        )
    }

    return (
        <Card style={style} {...props} className="absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm touch-none">
            <CardHeader className="flex flex-col items-center text-center p-6 border-b">
                 <Image src={startup.companyLogoUrl} alt={startup.companyName} width={96} height={96} className="rounded-full border-4 border-background bg-background mb-4" data-ai-hint="logo" />
                 <div className="flex-1">
                    <h3 className="text-2xl font-bold">{startup.companyName}</h3>
                    <p className="text-md text-muted-foreground whitespace-normal">{startup.tagline}</p>
                 </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
                <div>
                     <div className="flex justify-center gap-2 mb-4">
                        <Badge variant="secondary">{startup.industry}</Badge>
                        <Badge variant="outline">{startup.stage}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 text-center">
                        {startup.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <div className="font-bold">{formatCurrency(startup.financials.revenue)}</div>
                                <div className="text-xs text-muted-foreground">Revenue (Ann.)</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <div className="font-bold">{formatCurrency(startup.financials.monthlyRecurringRevenue)}</div>
                                <div className="text-xs text-muted-foreground">MRR</div>
                            </div>
                        </div>
                    </div>
                </div>
                 <CardFooter className="p-0 mt-4">
                     <div className="flex items-center gap-3 w-full p-3 bg-secondary/50 rounded-lg">
                        <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-12 h-12" />
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{profile.title}</p>
                        </div>
                    </div>
                </CardFooter>
            </CardContent>
        </Card>
    )
}

const GenericUserCard = ({ user, style, ...props }: { user: FullUserProfile, style?: React.CSSProperties, [key: string]: any }) => {
    const getProfileInfo = (user: FullUserProfile) => {
        if (user.role === 'investor') {
            const profile = user.profile as InvestorProfile;
            return {
                title: 'Investor',
                badges: profile.investmentInterests.slice(0, 2),
                description: profile.thesis,
                icon: DollarSign
            };
        }
        if (user.role === 'talent') {
            const profile = user.profile as TalentProfile;
            const isCoFounder = profile.isSeekingCoFounder;
            return {
                title: isCoFounder ? 'Seeking Co-founder Role' : 'Talent for Hire',
                badges: profile.skills?.slice(0, 2) || [],
                description: profile.experience,
                icon: isCoFounder ? UserCheck : Briefcase
            };
        }
        return { title: 'User', badges: [], description: '', icon: BrainCircuit };
    }

    const { title, badges, description, icon: Icon } = getProfileInfo(user);

    return (
        <Card style={style} {...props} className="absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm touch-none">
            <CardHeader className="flex flex-col items-center text-center p-6 border-b">
                <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-24 h-24 rounded-full border-4 border-background bg-background mb-4" />
                <div className="flex-1">
                    <h3 className="text-2xl font-bold">{user.name}</h3>
                    <p className="text-md text-muted-foreground capitalize">{user.role}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center p-6 text-center">
                <div>
                    <div className="flex justify-center gap-2 mb-4">
                        {badges.map(badge => <Badge key={badge} variant="secondary">{badge}</Badge>)}
                    </div>
                     <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                        {description}
                    </p>
                </div>
            </CardContent>
             <CardFooter className="p-6 pt-0">
                <div className="flex items-center gap-2 w-full p-3 bg-secondary/50 rounded-lg justify-center text-sm">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{title}</p>
                </div>
            </CardFooter>
        </Card>
    );
};

export default function MatchesPage() {
    const { user: authUser, isUserLoading: authLoading } = useUser();
    const [currentUser, setCurrentUser] = useState<FullUserProfile | null>(null);
    const [allMatches, setAllMatches] = useState<FullUserProfile[]>([]);
    const [startups, setStartups] = useState<Startup[]>([]);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!authUser || !db) {
                setLoading(false);
                return
            };
            setLoading(true);
            const userProfile = await getCurrentUser();
            if (!userProfile) {
                setLoading(false);
                return;
            }
            setCurrentUser(userProfile);

            const usersSnap = await getDocs(collection(db, "users"));
            const allUsers = usersSnap.docs.map(doc => doc.data() as FullUserProfile).filter(u => u.id !== userProfile.id);
            
            const startupsSnap = await getDocs(collection(db, "startups"));
            setStartups(startupsSnap.docs.map(doc => doc.data() as Startup));

            setAllMatches(getMatchableUsers(userProfile, allUsers));
            setLoading(false);
        };
        fetchInitialData();
    }, [authUser, db]);

    const getMatchableUsers = (currentUser: FullUserProfile, allUsers: FullUserProfile[]): FullUserProfile[] => {
        switch (currentUser.role) {
            case 'investor':
                return allUsers.filter(u => 
                    u.role === 'investor' || 
                    u.role === 'talent' ||
                    (u.role === 'founder' && (u.profile as FounderProfile).isPremium)
                );
            case 'founder':
                const founderProfile = currentUser.profile as FounderProfile;
                return allUsers.filter(u => {
                    if (u.role === 'talent') {
                        const talentProfile = u.profile as TalentProfile;
                        if (founderProfile.isSeekingCoFounder) {
                            return talentProfile.isSeekingCoFounder;
                        }
                        return !talentProfile.isSeekingCoFounder;
                    }
                    if (u.role === 'founder' && founderProfile.isSeekingCoFounder) {
                        return (u.profile as FounderProfile).isSeekingCoFounder;
                    }
                    return false;
                });
            case 'talent':
                const talentProfile = currentUser.profile as TalentProfile;
                return allUsers.filter(u => {
                    if (u.role === 'founder') {
                         const founderProfile = u.profile as FounderProfile;
                        if(talentProfile.isSeekingCoFounder) {
                            return founderProfile.isSeekingCoFounder;
                        }
                        return true;
                    }
                    if (u.role === 'talent' && talentProfile.isSeekingCoFounder) {
                        return (u.profile as TalentProfile).isSeekingCoFounder;
                    }
                    return false;
                });
            default:
                return [];
        }
    }
    
    const [filter, setFilter] = useState<UserRole | 'all' | 'co-founder'>('all');
    
    const matches = useMemo(() => {
        if (filter === 'all') return allMatches;
        if (filter === 'co-founder') {
             return allMatches.filter(u =>
                (u.role === 'founder' && (u.profile as FounderProfile).isSeekingCoFounder) ||
                (u.role === 'talent' && (u.profile as TalentProfile).isSeekingCoFounder)
            );
        }
        return allMatches.filter(u => u.role === filter);
    }, [allMatches, filter]);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const startPos = useRef({ x: 0, y: 0 });

    const handleSwipe = (direction: 'left' | 'right' | 'message') => {
        if (direction === 'message') {
            // handle message logic
        } else {
            setCurrentIndex(prev => prev + 1);
        }
        setPosition({ x: 0, y: 0 });
    };

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        startPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging || !cardRef.current) return;
        const currentX = e.clientX;
        const deltaX = currentX - startPos.current.x;
        setPosition({ x: deltaX, y: 0 });
    };

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        setIsDragging(false);
        const swipeThreshold = 100;
        if (position.x > swipeThreshold) {
            handleSwipe('right');
        } else if (position.x < -swipeThreshold) {
            handleSwipe('left');
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };
    
    const handleFilterChange = (value: UserRole | 'all' | 'co-founder') => {
        setFilter(value);
        setCurrentIndex(0);
        setPosition({ x: 0, y: 0 });
    }
    
    const founderCount = useMemo(() => allMatches.filter(u => u.role === 'founder' && !(u.profile as FounderProfile).isSeekingCoFounder).length, [allMatches]);
    const investorCount = useMemo(() => allMatches.filter(u => u.role === 'investor').length, [allMatches]);
    const talentCount = useMemo(() => allMatches.filter(u => u.role === 'talent' && !(u.profile as TalentProfile).isSeekingCoFounder).length, [allMatches]);
    const cofounderCount = useMemo(() => allMatches.filter(u => (u.role === 'founder' && (u.profile as FounderProfile).isSeekingCoFounder) || (u.role === 'talent' && (u.profile as TalentProfile).isSeekingCoFounder)).length, [allMatches]);

    if (authLoading || loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 overflow-hidden">
                <Skeleton className="h-10 w-80 mb-6" />
                <Skeleton className="h-[550px] w-full max-w-sm rounded-2xl" />
                <div className="flex justify-center items-center gap-4 mt-6">
                    <Skeleton className="w-20 h-20 rounded-full" />
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <Skeleton className="w-20 h-20 rounded-full" />
                </div>
            </div>
        )
    }

    if(matches.length === 0 && filter !== 'all') {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Card className="w-full max-w-md p-8">
                    <CardHeader>
                        <CardTitle>No Profiles to Match</CardTitle>
                        <CardDescription>There are currently no new profiles that match your criteria. Check back later!</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    if(allMatches.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Card className="w-full max-w-md p-8">
                    <CardHeader>
                        <CardTitle>No Profiles to Match</CardTitle>
                        <CardDescription>There are currently no new profiles that match your criteria. Check back later!</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    if(currentIndex >= matches.length) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Card className="w-full max-w-md p-8">
                    <CardHeader>
                        <CardTitle>No More Profiles</CardTitle>
                        <CardDescription>You've seen all available profiles in this category. Try a different filter or check back later!</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }
    
    const getCardStyle = (dragX: number) => {
        const rotation = dragX / 20; // Control rotation angle
        return {
            transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        };
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 overflow-hidden">
            <div className="mb-6">
                <Tabs value={filter} onValueChange={(value) => handleFilterChange(value as UserRole | 'all' | 'co-founder')}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        {founderCount > 0 && <TabsTrigger value="founder">Founders</TabsTrigger>}
                        {investorCount > 0 && <TabsTrigger value="investor">Investors</TabsTrigger>}
                        {talentCount > 0 && <TabsTrigger value="talent">Talent</TabsTrigger>}
                        {cofounderCount > 0 && <TabsTrigger value="co-founder">Co-founders</TabsTrigger>}
                    </TabsList>
                </Tabs>
            </div>

             <div className="relative w-full max-w-sm mx-auto h-[550px] flex items-center justify-center">
                {matches.slice(currentIndex, currentIndex + 2).reverse().map((user, index) => {
                    const isTopCard = index === 1;
                    const style = isTopCard
                        ? getCardStyle(position.x)
                        : { transform: `scale(${1 - 0.05 * (1 - index)}) translateY(${-10 * (1-index)}px)`, transition: 'transform 0.3s ease-out' };

                    const cardProps = isTopCard ? {
                        ref: cardRef,
                        onPointerDown: onPointerDown,
                        onPointerMove: onPointerMove,
                        onPointerUp: onPointerUp,
                        onPointerLeave: onPointerUp,
                    } : {};

                    if (user.role === 'founder') {
                        const startup = startups.find(s => s.id === (user.profile as FounderProfile).companyId);
                        return <FounderCard key={user.id} user={user} startup={startup} style={style} {...cardProps} />
                    }

                    return <GenericUserCard key={user.id} user={user} style={style} {...cardProps} />;
                })}
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
                <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-red-500 text-red-500 hover:bg-red-500/10" onClick={() => handleSwipe('left')}>
                    <X className="w-10 h-10" />
                </Button>
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-blue-500 text-blue-500 hover:bg-blue-500/10" onClick={() => handleSwipe('message')}>
                     <MessageCircle className="w-8 h-8" />
                </Button>
                <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-green-500 text-green-500 hover:bg-green-500/10" onClick={() => handleSwipe('right')}>
                    <Check className="w-10 h-10" />
                </Button>
            </div>
        </div>
    );
}
