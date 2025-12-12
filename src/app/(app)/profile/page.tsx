'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { user: currentUser, isUserLoading: loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        router.push(`/users/${currentUser.id}`);
      } else {
        router.push('/login');
      }
    }
  }, [currentUser, loading, router]);

  return (
    <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    </div>
  );
}