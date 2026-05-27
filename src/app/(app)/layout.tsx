'use client';

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { OkiAgentProvider, useOkiAgent } from "@/context/oki-agent-context";
import OkiAgentDrawer from "@/components/dashboard/oki-agent-drawer";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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

function GlobalOkiAgentDrawer({ userRole }: { userRole?: any }) {
  const { isAgentOpen, setIsAgentOpen, agentInitialQuery, setAgentInitialQuery } = useOkiAgent();
  
  return (
    <OkiAgentDrawer
      isOpen={isAgentOpen}
      onOpenChange={(open) => {
        setIsAgentOpen(open);
        if (!open) {
          setAgentInitialQuery("");
        }
      }}
      userRole={userRole}
      initialQuery={agentInitialQuery}
    />
  );
}

function GlobalOkiAgentFloatingButton() {
  const { setIsAgentOpen } = useOkiAgent();
  
  return (
    <Button
      onClick={() => setIsAgentOpen(true)}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-violet-700 hover:to-indigo-700 transition-all hover:scale-105 active:scale-95 border border-violet-500/20"
      size="icon"
      aria-label="Ask OkiAgent"
    >
      <Sparkles className="h-6 w-6 animate-pulse" />
    </Button>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  return (
      <AuthWrapper>
        <OkiAgentProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <AppHeader />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
                {children}
              </main>
              <GlobalOkiAgentDrawer userRole={user?.role} />
              <GlobalOkiAgentFloatingButton />
            </SidebarInset>
          </SidebarProvider>
        </OkiAgentProvider>
      </AuthWrapper>
  );
}

