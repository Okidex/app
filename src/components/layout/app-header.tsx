
'use client';

import { useEffect, useState, useTransition } from "react";
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
import UserAvatar from "../shared/user-avatar";
import Notifications from "./notifications";
import { useUser, useAuth } from "@/firebase";
import { logout as serverLogout } from "@/lib/auth-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "firebase/auth";
import { FounderProfile, Startup } from "@/lib/types";
import { getStartupById } from "@/lib/actions";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader() {
  const { user, isUserLoading: loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [startupName, setStartupName] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartup = async () => {
        if(user?.role === 'founder' && !loading) {
            const companyId = (user.profile as FounderProfile).companyId;
            if (companyId) {
                const startupData = await getStartupById(companyId);
                if (startupData) {
                    setStartupName(startupData.companyName);
                }
            }
        }
    }
    fetchStartup();
  }, [user, loading]);



  const handleLogout = async () => {
    if (!auth) return;
    
    startTransition(async () => {
      await signOut(auth); 
      await serverLogout(); 
      router.push("/");
    });
  };
  
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {user && !loading && (
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="font-semibold">{user.name}</span>
            {startupName && (
              <span className="text-muted-foreground">({startupName})</span>
            )}
          </div>
        )}
        <div className="ml-auto"></div>
        {loading || isPending ? (
            <Skeleton className="h-8 w-8 rounded-full" />
        ) : user ? (
          <>
            <Notifications />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full overflow-hidden">
                  <UserAvatar 
                    name={user.name || ""} 
                    avatarUrl={user.avatarUrl || ""} 
                    className="h-8 w-8"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/users/${user.id}`}>Profile</Link>
                </DropdownMenuItem>
                
                {user.role === 'founder' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/billing">Oki+ Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/edit/financials">Company Financials</Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuItem asChild>
                  <Link href="/feedback">Support</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button asChild size="sm">
            <Link href="/login">Log In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
