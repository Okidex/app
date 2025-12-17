"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading: loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex min-h-screen">
            <Skeleton className="hidden md:block w-64 h-screen" />
            <div className="flex-1 flex flex-col">
                <Skeleton className="h-16 w-full" />
                <div className="flex-1 p-8">
                    <Skeleton className="w-full h-64" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
