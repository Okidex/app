
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuBadge,
  SidebarSeparator,
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
import Logo from '../logo';
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

const menuItemsFounder = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/matches', label: 'Matches', icon: Smartphone, notificationType: 'match' },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/messages', label: 'Messages', icon: MessageSquare, notificationType: 'message' },
  { href: '/applicants', label: 'Applicants', icon: UsersIcon, notificationType: 'applicant', premium: true },
  { href: '/jobs', label: 'Jobs', icon: Briefcase, premium: true },
  { href: '/theses', label: 'Theses', icon: FileText, premium: true },
];

const menuItemsInvestor = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/matches', label: 'Matches', icon: Smartphone, notificationType: 'match' },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/messages', label: 'Messages', icon: MessageSquare, notificationType: 'message' },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/applicants', label: 'Applicants', icon: UsersIcon, notificationType: 'applicant' },
  { href: '/theses', label: 'Theses', icon: FileText },
];

const menuItemsTalent = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/matches', label: 'Matches', icon: Smartphone, notificationType: 'match' },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/messages', label: 'Messages', icon: MessageSquare, notificationType: 'message' },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading: authLoading } = useUser();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const isMobile = useIsMobile();
  const db = useFirestore();
  const auth = useAuth();

  React.useEffect(() => {
    if (!user || !db) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => doc.data() as Notification);
      // Sort client-side
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

  const menuItems = React.useMemo(() => {
    if (!user) return [];
    
    const { role, profile } = user;

    const isSeekingCoFounder = (role === 'founder' || role === 'talent') && (profile as FounderProfile | TalentProfile)?.isSeekingCoFounder;
    const isCoFounderTalent = role === 'talent' && (profile as TalentProfile)?.subRole === 'co-founder';
    
    let baseItems;
    switch (role) {
      case 'founder':
        baseItems = menuItemsFounder.filter(item => !item.premium || isPremiumFounder);
        break;
      case 'investor':
        baseItems = menuItemsInvestor;
        break;
      case 'talent':
        let talentItems = [...menuItemsTalent];
        if (!isSeekingCoFounder) {
          talentItems = talentItems.filter((item) => item.href !== '/matches');
        }
        if (isCoFounderTalent) {
          talentItems.push({ href: '/theses', label: 'Theses', icon: FileText, notificationType: 'applicant' });
        }
        baseItems = talentItems;
        break;
      default:
        baseItems = [];
    }

    if (!isMobile) {
      return baseItems.filter((item) => item.href !== '/matches');
    }
    return baseItems;
  }, [user, isMobile, isPremiumFounder]);

  if (authLoading || !user) {
    return (
      <Sidebar>
        <SidebarHeader className="hidden md:flex">
          <Logo />
        </SidebarHeader>
        <SidebarMenu className="p-2 flex-1">
          {Array.from({ length: 7 }).map((_, i) => (
             <SidebarMenuItem key={i} className="p-2">
                <Skeleton className="h-5 w-full" />
             </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader className="hidden md:flex">
        <Logo />
      </SidebarHeader>
      <SidebarHeader className="flex md:hidden items-center justify-center p-6">
        <Logo />
      </SidebarHeader>
      <SidebarMenu className="p-2 flex-1">
        {menuItems.map(({ href, label, icon: Icon, premium, notificationType }) => {
          const notificationCount = notifications.filter(
            (n) => n.type === notificationType && !n.isRead
          ).length;
          
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
                    {Icon && <Icon />}
                    <span>{label}</span>
                    {notificationCount > 0 && (
                      <SidebarMenuBadge>{notificationCount}</SidebarMenuBadge>
                    )}
                    {user.role === 'founder' && premium && !isPremiumFounder && !notificationCount && (
                      <SidebarMenuBadge className="flex items-center justify-center w-5 h-5 p-0 text-xs">
                        <Plus className="w-3 h-3" />
                      </SidebarMenuBadge>
                    )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      <SidebarSeparator />
      <SidebarFooter className="p-2">
        <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Oki+">
                <Link href="/settings/billing">
                    <Plus />
                    <span>Oki+</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Settings">
            <Link href="/settings">
              <Settings />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
