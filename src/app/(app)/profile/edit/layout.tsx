
'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/firebase';
import { FounderProfile } from '@/lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProfileLayout({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useUser();
    const pathname = usePathname();

    if (isUserLoading || !user) {
        return (
            <div className="space-y-6">
                 <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>
                <Separator />
                <Skeleton className="h-12 w-full max-w-lg" />
                <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
        )
    }

    const isFounder = user.role === 'founder';
    const isInvestor = user.role === 'investor';
    const isIncorporated = isFounder && (user.profile as FounderProfile).companyId && true; // Placeholder for actual check

    const getActiveTab = () => {
        /**
         * 2026 Next.js 16 Fix: 
         * usePathname() returns string | null. 
         * Optional chaining (?.) ensures the build doesn't fail when pathname is null.
         */
        if (pathname?.includes('/general')) return 'general';
        if (pathname?.includes('/team')) return 'team';
        if (pathname?.includes('/fundraising')) return 'fundraising';
        if (pathname?.includes('/financials')) return 'financials';
        if (pathname?.includes('/captable')) return 'captable';
        if (pathname?.includes('/legal')) return 'legal';
        return 'general';
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Edit Profile</h1>
                <p className="text-muted-foreground">This is how others will see you on the site. Update your information to attract the right connections.</p>
            </div>
            <Separator />
            {!isInvestor && (
                <Tabs value={getActiveTab()} className="w-full">
                    <TabsList>
                        <TabsTrigger value="general" asChild><Link href="/profile/edit/general">General</Link></TabsTrigger>
                        {isFounder && (
                            <>
                                <TabsTrigger value="team" asChild><Link href="/profile/edit/team">Founding Team</Link></TabsTrigger>
                                <TabsTrigger value="fundraising" asChild><Link href="/profile/edit/fundraising">Fundraising</Link></TabsTrigger>
                                <TabsTrigger value="legal" asChild><Link href="/profile/edit/legal">Legal</Link></TabsTrigger>
                                {isIncorporated && (
                                    <>
                                        <TabsTrigger value="financials" asChild><Link href="/profile/edit/financials">Financials</Link></TabsTrigger>
                                        <TabsTrigger value="captable" asChild><Link href="/profile/edit/captable">Cap Table</Link></TabsTrigger>
                                    </>
                                )}
                            </>
                        )}
                    </TabsList>
                </Tabs>
            )}
            <div className="pt-4">
                {children}
            </div>
        </div>
    );
}
