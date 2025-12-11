'use client';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardClientContent = dynamic(
  () => import('./DashboardClientContent'),
  { 
    ssr: false,
    loading: () => (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-64" />
                <div className="w-full max-w-sm">
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
        </div>
    ),
  }
);

export default function DashboardPage() {
  return <DashboardClientContent />;
}
