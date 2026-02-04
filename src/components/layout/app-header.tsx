'use client';

import { useEffect, useState, useTransition, useCallback } from "react";
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
import { getStartupById } from "@/lib/actions";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Use 'import type' for types to avoid bundling issues
import type { FounderProfile } from "@/lib/types";

export default function AppHeader() {
  const { user, isUserLoading: loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [startupName, setStartupName] = useState<string | null>(null);

  // Memoized fetcher to prevent unnecessary re-renders
  const fetchStartup = useCallback(async () => {
    if (user?.role === 'founder' && user.profile) {
        const companyId = (user.profile as FounderProfile).companyId;
        if (companyId) {
            const startupData = await getStartupById(companyId);
            if (startupData) {
                setStartupName(startupData.companyName);
            }
        }
    }
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
        fetchStartup();
    }
  }, [user, loading, fetchStartup]);

  const handleLogout = async () => {
    if (!auth) return;
    
    startTransition(async () => {
      try {
        await signOut(auth); // Clear Firebase Client SDK
        await serverLogout(); // Clear Next.js Session Cookie
        router.refresh();    // Refresh server components
        router.push("/");    // Redirect
      } catch (error) {
        console.error("Logout failed:", error);
      }
    });
  };
  
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-50">
      <SidebarTrigger />
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* User Identity Display */}
        <div className="hidden md:flex items-center gap-2 text-sm ml-auto">
          {loading ? (
            <Skeleton className="h-4 w-32" />
          ) : user ? (
            <>
              <span className="font-semibold">{user.name}</span>
              {startupName && (
                <span className="text-muted-foreground italic">({startupName})</span>
              )}
            </>
          ) : null}
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-2">
          {loading || isPending ? (
              <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <>
              <Notifications />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 overflow-hidden border">
                    <UserAvatar 
                      name={user.name || "User"} 
                      avatarUrl={user.avatarUrl || ""} 
                      className="h-full w-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${user.id}`} className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  
                  {user.role === 'founder' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/settings/billing" className="cursor-pointer">Oki+ Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile/edit/financials" className="cursor-pointer">Company Financials</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuItem asChild>
                    <Link href="/feedback" className="cursor-pointer">Support</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
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
      </div>
    </header>
  );
}
