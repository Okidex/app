
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
import { useUser } from "@/firebase";
import { logout } from "@/lib/auth-actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppHeader() {
  const { user, isUserLoading: loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
      <div className="hidden md:block">
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
                <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
           <Button asChild>
              <Link href="/signin">Log In</Link>
            </Button>
        )}
      </div>
    </header>
  );
}
