"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

const MessagesClientContent = dynamic(
  () => import('./client'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-10rem)] flex">
           <div className="w-1/3 border-r pr-4 flex flex-col">
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-16 w-full mb-2" />
              <Skeleton className="h-16 w-full mb-2" />
              <Skeleton className="h-16 w-full" />
          </div>
           <div className="w-2/3 pl-4 flex flex-col">
              <Skeleton className="h-6 w-48 mb-4 border-b pb-2" />
              <div className="flex-1 space-y-4 p-4">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-12 w-3/4 ml-auto" />
                  <Skeleton className="h-12 w-3/4" />
              </div>
              <form className="mt-4 flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-10" />
              </form>
          </div>
      </div>
    ),
  }
);

export default function MessagesPage() {
  return <MessagesClientContent />;
}