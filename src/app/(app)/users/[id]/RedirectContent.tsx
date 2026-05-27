'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function RedirectContent() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (id) {
            // Perform a client-side redirect to bypass the broken server-side redirect logic
            router.replace(`/user?id=${id}`);
        } else {
            router.replace('/search');
        }
    }, [id, router]);

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground animate-pulse text-lg">Redirecting to profile...</p>
            </div>
        </div>
    );
}
