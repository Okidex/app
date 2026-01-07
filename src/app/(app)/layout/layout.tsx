
'use client';

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// This AuthWrapper is a simplified guard. The main redirection logic is now in the root page.tsx.
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading: loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If after loading there is definitively no user, redirect to login.
    // This serves as a client-side failsafe.
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // While loading, or if the user is not yet available, show a skeleton screen.
  if (loading || !user) {
    return (
        <div className="flex min-h-screen">
            <div className="hidden md:block">
              <Skeleton className="w-64 h-screen" />
            </div>
            <div className="flex-1 flex flex-col">
                <Skeleton className="h-16 w-full" />
                <div className="flex-1 p-8">
                    <Skeleton className="w-full h-64" />
                </div>
            </div>
        </div>
    );
  }

  // If user is authenticated, render the children.
  return <>{children}</>;
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <AuthWrapper>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </AuthWrapper>
  );
}
