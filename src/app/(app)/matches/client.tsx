
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FullUserProfile, Startup, FounderProfile, InvestorProfile, TalentProfile } from "@/lib/types";
import { DollarSign, TrendingUp, Briefcase, BrainCircuit, UserCheck } from "lucide-react";
import UserAvatar from "@/components/shared/user-avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import { toSerializable } from "@/lib/serialize";

const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
}

const FounderCard = ({ user, startup, style, ...props }: { user: FullUserProfile, startup?: Startup, style?: React.CSSProperties, [key: string]: any }) => {
    const profile = user.profile as FounderProfile;

    if (!startup) {
        return (
            <Card style={style} {...props} className="absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm items-center justify-center">
                <p>Startup not found.</p>
            </Card>
        )
    }

    return (
        <Card style={style} {...props} className="absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm">
            <CardHeader className="flex flex-col items-center text-center p-6 border-b">
                 <Image src={startup.companyLogoUrl} alt={startup.companyName} width={96} height={96} className="rounded-full border-4 border-background bg-background mb-4" />
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
                                <div className="font-bold">{formatCurrency(startup.financials?.revenue ?? 0)}</div>
                                <div className="text-xs text-muted-foreground">Revenue (Ann.)</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <div className="font-bold">{formatCurrency(startup.financials?.monthlyRecurringRevenue ?? 0)}</div>
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
            return { title: 'Investor', badges: profile.investmentInterests?.slice(0, 2) || [], description: profile.thesis, icon: DollarSign };
        }
        if (user.role === 'talent') {
            const profile = user.profile as TalentProfile;
            return { title: user.isLookingForCoFounder ? 'Seeking Co-founder' : 'Talent', badges: profile.skills?.slice(0, 2) || [], description: profile.experience, icon: UserCheck };
        }
        return { title: 'User', badges: [], description: '', icon: BrainCircuit };
    }

    const { title, badges, description, icon: Icon } = getProfileInfo(user);

    return (
        <Card style={style} {...props} className="absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm">
            <CardHeader className="flex flex-col items-center text-center p-6 border-b">
                <UserAvatar name={user.name} avatarUrl={user.avatarUrl} className="w-24 h-24 rounded-full border-4 border-background bg-background mb-4" />
                <div className="flex-1">
                    <h3 className="text-2xl font-bold">{user.name}</h3>
                    <p className="text-md text-muted-foreground capitalize">{user.role}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center p-6 text-center">
                <div className="flex justify-center gap-2 mb-4">
                    {badges.map(badge => <Badge key={badge} variant="secondary">{badge}</Badge>)}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{description}</p>
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

export default function MatchesPageClient() {
    const { user: currentUser } = useUser();
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        if (currentUser && db) {
            setLoading(false);
        }
    }, [currentUser, db]);

    if (loading) return <div className="p-8 text-center">Loading matches...</div>;

    return (
        <div className="container max-w-4xl py-10">
            <h1 className="text-3xl font-bold mb-6">Your Matches</h1>
            <div className="flex flex-wrap gap-6 justify-center">
                <p className="text-muted-foreground">Discover potential connections here.</p>
            </div>
        </div>
    );
}
