
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const MatchesPageClient = dynamic(() => import('./client'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full p-4 overflow-hidden">
        <Skeleton className="h-10 w-80 mb-6" />
        <Skeleton className="h-[550px] w-full max-w-sm rounded-2xl" />
        <div className="flex justify-center items-center gap-4 mt-6">
            <Skeleton className="w-20 h-20 rounded-full" />
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-20 h-20 rounded-full" />
        </div>
    </div>
  ),
});


export default function MatchesPage() {
    return (
        <Suspense>
            <MatchesPageClient />
        </Suspense>
    );
}
