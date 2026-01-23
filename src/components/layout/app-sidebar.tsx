
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuBadge,
  SidebarSeparator,
  useSidebar,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Smartphone,
  Plus,
  Search,
  Users as UsersIcon,
} from 'lucide-react';
import {
  FullUserProfile,
  FounderProfile,
  TalentProfile,
  Notification,
} from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser, useFirestore, useAuth, FirestorePermissionError, errorEmitter } from '@/firebase';
import { logout as serverLogout } from "@/lib/auth-actions";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';
import UserAvatar from '../shared/user-avatar';
import { signOut } from 'firebase/auth';
import { cn } from '@/lib/utils';

const allMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['founder', 'investor', 'talent'] },
  { href: '/matches', label: 'Matches', icon: Smartphone, notificationType: 'match', roles: ['founder', 'investor', 'talent'] },
  { href: '/search', label: 'Search', icon: Search, roles: ['founder', 'investor', 'talent'] },
  { href: '/messages', label: 'Messages', icon: MessageSquare, notificationType: 'message', roles: ['founder', 'investor', 'talent'] },
  { href: '/jobs', label: 'Jobs', icon: Briefcase, roles: ['founder', 'investor', 'talent'] },
  { href: '/theses', label: 'Theses', icon: FileText, roles: ['founder', 'investor', 'talent'] },
  { href: '/applicants', label: 'Applicants', icon: UsersIcon, notificationType: 'applicant', roles: ['founder', 'investor'], premium: true },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading: authLoading } = useUser();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const isMobile = useIsMobile();
  const db = useFirestore();
  const auth = useAuth();
  const { state: sidebarState } = useSidebar();

  React.useEffect(() => {
    if (!user || !db) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => doc.data() as Notification);
      notifs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setNotifications(notifs);
    },
    (serverError) => {
        const contextualError = new FirestorePermissionError({
            path: `notifications`,
            operation: 'list',
        });
        errorEmitter.emit('permission-error', contextualError);
    });

    return () => unsubscribe();
  }, [user, db]);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    await serverLogout();
    router.push("/");
  };
  
  const isPremiumFounder = user?.role === 'founder' && (user.profile as FounderProfile)?.isPremium;
  const isFounder = user?.role === 'founder';

  const filteredMenuItems = React.useMemo(() => {
    if (!user) return [];
    
    const { role, profile } = user;
    
    return allMenuItems.filter(item => {
      if (!item.roles.includes(role)) {
        return false;
      }
      
      if (item.href === '/applicants' && role === 'talent') {
        return false;
      }

      if (role === 'founder' && item.premium && !isPremiumFounder) {
        return false;
      }
      
      const isSeekingCoFounder = role === 'talent' && (profile as TalentProfile)?.isSeekingCoFounder;
      if (item.href === '/matches' && role === 'talent' && !isSeekingCoFounder) {
        return false;
      }
      
      const isCoFounderTalent = role === 'talent' && (profile as TalentProfile)?.subRole === 'co-founder';
      if(item.href === '/theses' && role === 'talent' && !isCoFounderTalent){
        return false;
      }
      
      if (isMobile === false && item.href === '/matches') {
        return false;
      }
      
      return true;
    });
  }, [user, isMobile, isPremiumFounder]);

  if (authLoading || !user) {
    return (
      <Sidebar>
        <SidebarHeader>
          <Skeleton className="h-8 w-full" />
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-2 p-2">
            {Array.from({ length: 7 }).map((_, i) => (
                <SidebarMenuSkeleton key={i} showIcon />
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-16 p-2 justify-center">
         <Link href="/" className="flex items-center gap-2 font-headline font-normal tracking-tight">
            <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary h-6 w-auto shrink-0">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
                <path d="M34 1L23 12L34 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={cn('text-2xl transition-opacity duration-300 ease-in-out', sidebarState === 'collapsed' ? 'opacity-0 w-0' : 'opacity-100 w-auto')}>
                Okidex
            </span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="p-2">
            {filteredMenuItems.map(({ href, label, icon: Icon, premium, notificationType }) => {
            const notificationCount = notifications.filter(
                (n) => n.type === notificationType && !n.isRead
            ).length;
            
            const showPlusBadge = user.role === 'founder' && premium && !isPremiumFounder && !notificationCount;

            return (
                <SidebarMenuItem key={href}>
                <SidebarMenuButton
                    asChild
                    isActive={
                    pathname.startsWith(href) && (href !== '/' || pathname === href)
                    }
                    tooltip={label}
                >
                    <Link href={href}>
                        {Icon && <Icon className="shrink-0" />}
                        <span className="group-data-[state=collapsed]:hidden">{label}</span>
                        {notificationCount > 0 && (
                        <SidebarMenuBadge>{notificationCount}</SidebarMenuBadge>
                        )}
                        {showPlusBadge && (
                        <SidebarMenuBadge className="flex items-center justify-center w-5 h-5 p-0 text-xs">
                            <Plus className="w-3 h-3" />
                        </SidebarMenuBadge>
                        )}
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            );
            })}
             {isFounder && (
              <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Oki+">
                      <Link href="/settings/billing">
                          <Plus />
                          <span className="group-data-[state=collapsed]:hidden">Oki+</span>
                      </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator />
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Settings">
            <Link href="/settings">
              <Settings />
              <span className="group-data-[state=collapsed]:hidden">Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Logout" onClick={handleLogout}>
            <button>
              <LogOut />
              <span className="group-data-[state=collapsed]:hidden">Logout</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
