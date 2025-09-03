
'use client';

import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { FinancialRecord, User } from '@/lib/types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, TrendingUp, Award, Target, Flame } from 'lucide-react';
import { format, subMonths } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

const achievementConfig = {
    'first-log': { icon: Award, title: 'First Entry!', description: "You've logged your first month of financials." },
    'three-month-streak': { icon: Flame, title: 'On Fire!', description: 'Logged financials for 3 consecutive months.' },
    'six-month-streak': { icon: Flame, title: 'Blazing Hot!', description: 'Logged financials for 6 consecutive months.' },
    'first-revenue': { icon: Target, title: 'We Have Liftoff!', description: 'Logged your first month of revenue (MRR > 0).' },
    'ten-thousand-mrr': { icon: TrendingUp, title: 'Growth Engine', description: 'Reached $10,000 in Monthly Recurring Revenue.' },
};

type AchievementId = keyof typeof achievementConfig;


export default function FinancialsView() {
    const [user, authLoading] = useAuthState(auth);
    const [userData, setUserData] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);
    const { toast } = useToast();

    const [currentMonth, setCurrentMonth] = React.useState(format(new Date(), 'yyyy-MM'));
    const [mrr, setMrr] = React.useState('');
    const [burnRate, setBurnRate] = React.useState('');
    
    React.useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setIsLoading(false);
            return;
        }

        const fetchUserData = async () => {
            setIsLoading(true);
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data() as User;
                setUserData(data);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, [user, authLoading]);

    const handleLogMonth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !userData || !userData.profile) return;
        
        setIsSaving(true);
        const newRecord: FinancialRecord = {
            month: currentMonth,
            mrr: parseFloat(mrr) || 0,
            burnRate: parseFloat(burnRate) || 0,
        };

        const existingRecords = userData.profile.financialHistory || [];
        const updatedRecords = existingRecords.filter(rec => rec.month !== currentMonth).concat(newRecord);
        updatedRecords.sort((a, b) => a.month.localeCompare(b.month));
        
        const newAchievements = checkForNewAchievements(updatedRecords, userData.profile.achievements || []);

        try {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                'profile.financialHistory': updatedRecords,
                'profile.mrr': newRecord.mrr,
                'profile.burnRate': newRecord.burnRate,
                'profile.achievements': arrayUnion(...newAchievements)
            });

            setUserData(prev => prev ? ({ ...prev, profile: {...prev.profile, financialHistory: updatedRecords, mrr: newRecord.mrr, burnRate: newRecord.burnRate, achievements: [...(prev.profile.achievements || []), ...newAchievements]} }) : null);

            toast({ title: "Success", description: `Financials for ${format(new Date(currentMonth + '-02'), 'MMMM yyyy')} have been logged.` });
            if(newAchievements.length > 0) {
                 setTimeout(() => {
                    toast({ title: "Achievement Unlocked!", description: achievementConfig[newAchievements[0]].title, variant: 'default' });
                }, 500)
            }

            setMrr('');
            setBurnRate('');

        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsSaving(false);
        }
    };
    
    const checkForNewAchievements = (history: FinancialRecord[], existing: string[]): AchievementId[] => {
        const unlocked: AchievementId[] = [];

        if (history.length > 0 && !existing.includes('first-log')) unlocked.push('first-log');
        if (history.some(r => r.mrr && r.mrr > 0) && !existing.includes('first-revenue')) unlocked.push('first-revenue');
        if (history.some(r => r.mrr && r.mrr >= 10000) && !existing.includes('ten-thousand-mrr')) unlocked.push('ten-thousand-mrr');
        
        const checkStreak = (months: number): boolean => {
            if (history.length < months) return false;
            let consecutive = 0;
            let expectedMonth = new Date(history[history.length-1].month + '-02');
            for(let i = history.length -1; i >= 0; i--) {
                const recordMonth = new Date(history[i].month + '-02');
                if(format(recordMonth, 'yyyy-MM') === format(expectedMonth, 'yyyy-MM')) {
                    consecutive++;
                    if (consecutive >= months) return true;
                    expectedMonth = subMonths(expectedMonth, 1);
                } else {
                    break;
                }
            }
            return false;
        }

        if(checkStreak(6) && !existing.includes('six-month-streak')) unlocked.push('six-month-streak')
        else if (checkStreak(3) && !existing.includes('three-month-streak')) unlocked.push('three-month-streak');
        
        return unlocked;
    }


    const financialHistory = userData?.profile?.financialHistory || [];
    const chartData = financialHistory.slice(-12).map(rec => ({
        name: format(new Date(rec.month + '-02'), 'MMM yy'),
        MRR: rec.mrr,
        'Burn Rate': rec.burnRate,
    }));

    if (isLoading) {
        return (
             <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Log Monthly Financials</CardTitle>
                    <CardDescription>Update your key metrics for {format(new Date(currentMonth + '-02'), 'MMMM yyyy')}. This keeps your profile fresh for investors.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogMonth}>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="month">Month</Label>
                            <Input id="month" type="month" value={currentMonth} onChange={e => setCurrentMonth(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mrr">MRR ($)</Label>
                            <Input id="mrr" type="number" placeholder="e.g., 15000" value={mrr} onChange={e => setMrr(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="burn-rate">Burn Rate ($)</Label>
                            <Input id="burn-rate" type="number" placeholder="e.g., 10000" value={burnRate} onChange={e => setBurnRate(e.target.value)} required />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Log Month
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Performance Dashboard</CardTitle>
                         <CardDescription>Your last 12 months of performance.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                         {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--destructive))" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="MRR" fill="hsl(var(--primary))" />
                                    <Bar yAxisId="right" dataKey="Burn Rate" fill="hsl(var(--destructive))" />
                                </BarChart>
                            </ResponsiveContainer>
                         ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <p>Log your first month to see your performance chart.</p>
                            </div>
                         )}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                        <CardDescription>Milestones you've unlocked.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(achievementConfig).map(([id, config]) => {
                             const isUnlocked = userData?.profile?.achievements?.includes(id);
                             const Icon = config.icon;
                            return (
                                <div key={id} className={`flex items-center gap-4 transition-opacity ${isUnlocked ? 'opacity-100' : 'opacity-40'}`}>
                                    <div className={`p-2 rounded-full ${isUnlocked ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{config.title}</p>
                                        <p className="text-sm text-muted-foreground">{config.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
