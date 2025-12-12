'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

const BillingClient = dynamic(() => import('./client'), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  ),
});

export default function BillingPage() {
  return <BillingClient />;
}