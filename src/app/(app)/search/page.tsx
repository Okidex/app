
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const SearchResults = dynamic(() => import('./client'), {
  ssr: false,
  loading: () => (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center gap-4">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-6 w-full max-w-2xl" />
        <Skeleton className="h-12 w-full max-w-2xl" />
      </div>
    </div>
  ),
});


export default function SearchPage() {
    return (
        <Suspense>
            <SearchResults />
        </Suspense>
    );
}
