"use client";

import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function RootPage() {
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading) {
      if (user && (pathname === '/' || pathname === '/home')) {
        redirect('/dashboard');
      } else if (!user && pathname === '/') {
        redirect('/home');
      }
    }
  }, [user, isUserLoading, pathname]);

  // Render a loading skeleton while checking auth state or if user is logged in
  if (isUserLoading || (user && (pathname === '/' || pathname === '/home'))) {
     return (
      <div className="flex flex-col min-h-screen">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
           <Skeleton className="h-8 w-32" />
           <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Skeleton className="h-[400px] w-full" />
        </main>
      </div>
    );
  }

  // This component intentionally returns null when no user is found
  // and the path is not the root, because its primary job is redirection.
  // The actual page content for /home is rendered by its own component.
  return null;
}
