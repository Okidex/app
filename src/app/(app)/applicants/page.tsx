
'use client';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ApplicantsClientContent = dynamic(
  () => import('./ApplicantsClientContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    ),
  }
);

export default function ApplicantsPage() {
  return <ApplicantsClientContent />;
}
