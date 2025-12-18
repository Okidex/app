'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Define the loading skeleton component separately for readability
const ProviderSkeleton = () => (
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

const FirebaseProvider = dynamic(
  () => import('@/firebase/client-provider').then((mod) => mod.FirebaseClientProvider),
  { 
    ssr: false,
    loading: ProviderSkeleton
  }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <FirebaseProvider>{children}</FirebaseProvider>;
}
