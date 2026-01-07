
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "../logo";
import UserAvatar from "../shared/user-avatar";
import Notifications from "./notifications";
import { useUser, useAuth } from "@/firebase";
import { logout as serverLogout } from "@/lib/auth-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { FounderProfile, Startup } from "@/lib/types";
import { getStartupById } from "@/lib/actions";

export default function AppHeader() {
  const { user, isUserLoading: loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [startup, setStartup] = useState<Startup | null>(null);

  useEffect(() => {
    if (user?.role === 'founder') {
      const companyId = (user.profile as FounderProfile).companyId;
      if (companyId) {
        getStartupById(companyId).then(setStartup);
      }
    }
  }, [user]);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth); // Sign out from client
    await serverLogout(); // Clear server session
    router.push("/");
  };
  
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:flex items-center gap-2 text-lg font-semibold">
        <Logo />
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto"></div>
        {loading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
        ) : user ? (
          <>
            <Notifications />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                <UserAvatar name={user.name || ""} avatarUrl={user.avatarUrl || ""} className="h-8 w-8"/>
                <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href={`/users/${user.id}`}>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/settings/billing">Oki+</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/profile/edit/financials">Financials</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/feedback">Feedback & Support</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
           <Button asChild>
              <Link href="/login">Log In</Link>
            </Button>
        )}
      </div>
    </header>
  );
}
