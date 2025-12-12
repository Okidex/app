'use client';

import { notFound, useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export const dynamic = 'force-dynamic';

const UserProfileClient = dynamic(() => import("./client"), {
  loading: () => (
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
  ),
  ssr: false,
});


export default function UserProfilePage() {
    const params = useParams();
    const id = params.id as string;
    
    return <UserProfileClient userId={id} />;
}