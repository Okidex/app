'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileWrapper = dynamic(() => import('./ProfileWrapper'), {
  ssr: false,
});

export default function UserProfilePage() {
  return (
    <Suspense fallback={<div className="container py-8"><Skeleton className="h-64 w-full" /></div>}>
        <ProfileWrapper />
    </Suspense>
  );
}
