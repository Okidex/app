
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import HomePage from './home-page'; // The actual landing page content
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is loaded and is logged in, redirect to the dashboard.
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  // While loading, show a skeleton UI to prevent flash of content.
  if (isUserLoading) {
     return (
      <div className="flex flex-col min-h-screen">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </header>
        <main className="flex-1">
          <section className="py-20 md:py-32">
            <div className="container mx-auto text-center px-4">
              <Skeleton className="h-16 w-full max-w-3xl mx-auto mb-6" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-10" />
              <Skeleton className="h-12 w-48 mx-auto" />
            </div>
          </section>
        </main>
      </div>
    );
  }

  // If loading is finished and there's no user, show the public homepage.
  if (!user) {
    return <HomePage />;
  }

  // If user is logged in, this renders a skeleton while the redirect effect runs.
  // This prevents the homepage from flashing before redirecting to the dashboard.
  return (
      <div className="flex flex-col min-h-screen">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </header>
        <main className="flex-1">
          <section className="py-20 md:py-32">
            <div className="container mx-auto text-center px-4">
              <Skeleton className="h-16 w-full max-w-3xl mx-auto mb-6" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-10" />
              <Skeleton className="h-12 w-48 mx-auto" />
            </div>
          </section>
        </main>
      </div>
    );
}
