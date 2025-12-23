
'use client';

import { FullUserProfile } from '@/lib/types';
import UserProfileClient from './client';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserProfilePage() {
    const { id } = useParams();
    const { user: currentUser } = useUser();
    const [user, setUser] = useState<FullUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        const fetchUser = async () => {
            if (!db || !id) return;
            setLoading(true);
            const userDoc = await getDoc(doc(db, 'users', id as string));
            if (userDoc.exists()) {
                setUser(userDoc.data() as FullUserProfile);
            } else {
                notFound();
            }
            setLoading(false);
        };
        fetchUser();
    }, [id, db]);

    if (loading || !user) {
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
        )
    }

    return (
        <UserProfileClient serverUser={user} serverCurrentUser={currentUser} />
    );
}
