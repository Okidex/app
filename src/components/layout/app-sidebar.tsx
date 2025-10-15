
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
  User,
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
import { useUser, useFirestore } from '@/firebase';
import { logout } from '@/lib/auth';
import { getCurrentUser } from '@/lib/actions';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const menuItemsFounder = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/matches', label: 'Mobile', icon: Smartphone, notificationType: 'match' },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/messages', label: 'Messages', icon: MessageSquare, notificationType: 'message' },
  { href: '/jobs', label: 'Jobs', icon: Briefcase, premium: true },
  { href: '/theses', label: 'Theses', icon: FileText, premium: true },
];

const menuItemsInvestor = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/matches', label: 'Mobile', icon: Smartphone, notificationType: 'match' },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/messages', label: 'Messages', icon: MessageSquare, notificationType: 'message' },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/applicants', label: 'Applicants', icon: UsersIcon, notificationType: 'applicant' },
  { href: '/theses', label: 'Theses', icon: FileText },
];

const menuItemsTalent = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/matches', label: 'Mobile', icon: Smartphone, notificationType: 'match' },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/messages', label: 'Messages', icon: MessageSquare, notificationType: 'message' },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user: authUser, isUserLoading: authLoading } = useUser();
  const [user, setUser] = React.useState<FullUserProfile | null>(null);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const isMobile = useIsMobile();
  const db = useFirestore();

  React.useEffect(() => {
    if (authUser) {
      getCurrentUser().then(setUser);
    } else {
      setUser(null);
    }
  }, [authUser]);

  React.useEffect(() => {
    if (!user || !db) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id),
      where('isRead', '==', false)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(
        snapshot.docs.map((doc) => doc.data() as Notification)
      );
    });

    return () => unsubscribe();
  }, [user, db]);

  if (authLoading || !user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const isFounder = user.role === 'founder';
  const isTalent = user.role === 'talent';
  const isSeekingCoFounder =
    isTalent && (user.profile as TalentProfile).isSeekingCoFounder;

  const getMenuItems = () => {
    let baseItems;
    switch (user.role) {
      case 'founder':
        baseItems = menuItemsFounder;
        break;
      case 'investor':
        baseItems = menuItemsInvestor;
        break;
      case 'talent':
        let talentItems = [...menuItemsTalent];
        if (!isSeekingCoFounder) {
          talentItems = talentItems.filter((item) => item.href !== '/matches');
        }
        if ((user.profile as TalentProfile).subRole === 'co-founder') {
          talentItems.push({ href: '/theses', label: 'Theses', icon: FileText });
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
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarHeader className="hidden md:flex">
        <Logo />
      </SidebarHeader>
      <SidebarHeader className="flex md:hidden items-center justify-center p-6">
        <Logo />
      </SidebarHeader>
      <SidebarMenu className="p-2 flex-1">
        {menuItems.map(({ href, label, icon, premium, notificationType }) => {
          const notificationCount = notifications.filter(
            (n) => n.type === notificationType
          ).length;

          return (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname.startsWith(href) && (href !== '/profile' || pathname === href)
                }
                tooltip={label}
              >
                <Link href={href}>
                  <div style={{ display: 'contents' }}>
                    {React.createElement(icon)}
                    <span>{label}</span>
                    {notificationCount > 0 && (
                      <SidebarMenuBadge>{notificationCount}</SidebarMenuBadge>
                    )}
                    {isFounder && premium && !notificationCount && (
                      <SidebarMenuBadge className="flex items-center justify-center w-5 h-5 p-0 text-xs">
                        <Plus className="w-3 h-3" />
                      </SidebarMenuBadge>
                    )}
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      <SidebarSeparator />
      <SidebarFooter className="p-2">
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

    