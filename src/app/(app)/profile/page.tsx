
"use client";

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isUserLoading: loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      redirect(`/users/${user.uid}`);
    } else if (!loading && !user) {
      redirect('/login');
    }
  }, [user, loading]);

  // Render a skeleton while loading, to avoid flash of content before redirect.
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
