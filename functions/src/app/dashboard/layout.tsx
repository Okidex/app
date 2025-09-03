
'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  DollarSign,
  MessageSquare,
  PanelLeft,
  Plus,
  Search,
  Smartphone,
  Target,
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User as UserData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

import UserNav from '@/components/user-nav';
import Notifications from '@/components/notifications';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';

const navItems = [
    { view: 'mobile', label: 'Mobile', icon: Smartphone, roles: ['Founder', 'Investor', 'Talent'] },
    { view: 'search', label: 'Search', icon: Search, roles: ['Founder', 'Investor'] },
    { view: 'challenges', label: 'Challenges', icon: Target, roles: ['Founder', 'Investor'] },
    { view: 'messages', label: 'Messages', icon: MessageSquare, roles: ['Founder', 'Investor', 'Talent'] },
    { view: 'financials', label: 'Financials', icon: DollarSign, roles: ['Founder'] },
    { type: 'separator', roles: ['Founder'] },
    { view: 'billing', label: 'Oki+', icon: Plus, roles: ['Founder'] },
];

function NavContent({ currentUser, isMobile }: { currentUser: UserData, isMobile?: boolean }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'mobile';

    return (
        <nav className={cn("grid items-start px-2 text-sm font-medium lg:px-4", isMobile && "gap-4 text-lg")}>
            {navItems.map((item, index) => {
                if (!item.roles.includes(currentUser.role as any)) {
                    return null;
                }
                 // Do not show Challenges to non-premium founders
                if (item.view === 'challenges' && currentUser.role === 'Founder' && !currentUser.isPremium) {
                    return null;
                }

                if ('type' in item && item.type === 'separator') {
                    return <Separator key={`sep-${index}`} className="my-2" />;
                }
                
                if ('view' in item) {
                    const isActive = currentView === item.view;
                    return (
                        <a
                            key={item.view}
                            href={`/dashboard?view=${item.view}`}
                            onClick={(e) => { e.preventDefault(); router.push(`/dashboard?view=${item.view}`); }}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                isActive && "bg-muted text-primary",
                                isMobile && "py-3"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </a>
                    )
                }
                return null;
            })}
        </nav>
    )
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [user, authLoading] = useAuthState(auth);
  const [currentUser, setCurrentUser] = React.useState<UserData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initialize = async () => {
      if (authLoading) return;

      if (!user) {
        router.push('/');
        return;
      }

      setIsLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          setCurrentUser(userData);

          if (!userData.profile || Object.keys(userData.profile).length === 0) {
            router.push('/onboarding');
            return;
          }

        } else {
          toast({ variant: 'destructive', title: 'Error', description: 'Could not find your user profile. Please try signing in again.' });
          router.push('/');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'There was a problem loading your data.' });
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [user, authLoading, router, toast]);

  if (isLoading || !currentUser) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin" />
        </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo />
                </div>
                <div className="flex-1 py-2">
                    <NavContent currentUser={currentUser} />
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                 <Sheet>
                    <SheetTrigger asChild>
                        <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                        >
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                         <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 mb-4">
                            <Logo />
                        </div>
                        <NavContent currentUser={currentUser} isMobile />
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                </div>
                <Notifications />
                <UserNav />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background overflow-auto">
                 {children}
            </main>
        </div>
        <Toaster />
    </div>
  );
}
