
'use client';

import { FullUserProfile, FounderProfile } from '@/lib/types';
import UserProfileClient from './client';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { useParams, notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserProfilePage() {
    const params = useParams();
    const idFromParams = params?.id;
    const id = Array.isArray(idFromParams) ? idFromParams[0] : idFromParams;
    const { user: currentUser, isUserLoading: isCurrentUserLoading } = useUser();
    const [user, setUser] = useState<FullUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();

    useEffect(() => {
        const fetchUser = async () => {
            if (!db || !id) return;
            setLoading(true);
            const userDoc = await getDoc(doc(db, 'users', id));
            if (userDoc.exists()) {
                setUser(userDoc.data() as FullUserProfile);
            } else {
                notFound();
            }
            setLoading(false);
        };
        fetchUser();
    }, [id, db]);

    useEffect(() => {
        const incrementViewCount = async () => {
            if (!db || !id || !currentUser || isCurrentUserLoading || currentUser.id === id || !user) {
                return;
            }

            const viewedKey = `viewed-${id}`;
            if (sessionStorage.getItem(viewedKey)) {
                return;
            }

            try {
                if (user.role === 'founder') {
                    const companyId = (user.profile as FounderProfile).companyId;
                    if (companyId) {
                        const startupRef = doc(db, 'startups', companyId);
                        await updateDoc(startupRef, {
                            profileViewCount: increment(1)
                        });
                    }
                } else {
                     const userRef = doc(db, 'users', id);
                     await updateDoc(userRef, {
                        'profile.profileViewCount': increment(1)
                     });
                }
                sessionStorage.setItem(viewedKey, 'true');
            } catch (error) {
                console.error("Failed to increment profile view count", error);
            }
        };

        incrementViewCount();
    }, [id, db, currentUser, isCurrentUserLoading, user]);

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
