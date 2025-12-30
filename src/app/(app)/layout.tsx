'use client';

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { useUser } from "@/firebase";
// Removed useRouter and useEffect for auth redirection

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();

  // NOTE: Redirection to /login is now handled by middleware.ts.
  // We only show a loading state if the Firebase Client SDK is still 
  // synchronizing the user object for the UI (Sidebar/Header).
  if (isUserLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="animate-pulse space-y-4">
             <div className="h-12 w-12 bg-secondary rounded-full mx-auto" />
             <div className="h-4 w-32 bg-secondary rounded mx-auto" />
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
