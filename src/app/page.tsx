"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function RootPage() {
  const router = useRouter();
  const { user, isUserLoading: loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/home');
      }
    }
  }, [user, loading, router]);

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
