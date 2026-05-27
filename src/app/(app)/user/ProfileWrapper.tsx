'use client';

import { FullUserProfile } from '@/lib/types';
import UserProfileClient from './client';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileWrapper() {
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const { user: currentUser, isUserLoading: isCurrentUserLoading } = useUser();
    const [user, setUser] = useState<FullUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            if (!db || !id) return;
            setLoading(true);
            try {
                const userDoc = await getDoc(doc(db, 'users', id));
                if (userDoc.exists()) {
                    setUser(userDoc.data() as FullUserProfile);
                } else {
                    router.replace('/search');
                }
            } catch (e) {
                console.error("[DEBUG-PROFILE] Fetch failed:", e);
            }
            setLoading(false);
        };
        fetchUser();
    }, [id, db, router]);

    useEffect(() => {
        const handleView = async () => {
            if (!id || isCurrentUserLoading || !db) return;

            if (!currentUser || currentUser.id === id) {
                return;
            }

            const viewedKey = `viewed-${id}`;
            if (sessionStorage.getItem(viewedKey)) {
                return;
            }
            
            try {
                await updateDoc(doc(db, "users", id), {
                    profileViewCount: increment(1)
                });
                sessionStorage.setItem(viewedKey, 'true');
            } catch (e) {
                console.error("[DEBUG-PROFILE] View increment failed:", e);
            }
        };

        handleView();
    }, [id, currentUser, isCurrentUserLoading, db]);

    if (!id) {
        router.replace('/search');
        return null;
    }

    if (loading || isCurrentUserLoading || !user) {
        return (
            <div className="space-y-6 container py-8">
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
        )
    }

    return (
        <UserProfileClient initialUser={user} />
    );
}
