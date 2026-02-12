'use client';

import { FullUserProfile } from '@/lib/types';
import UserProfileClient from './client';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { incrementProfileView } from '@/lib/actions';

export default function UserProfilePage() {
    const params = useParams();
    const idFromParams = params?.id;
    const id = Array.isArray(idFromParams) ? idFromParams[0] : idFromParams;
    const { user: currentUser, isUserLoading: isCurrentUserLoading } = useUser();
    const [user, setUser] = useState<FullUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const db = useFirestore();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            if (!db || !id) return;
            setLoading(true);
            const userDoc = await getDoc(doc(db, 'users', id));
            if (userDoc.exists()) {
                setUser(userDoc.data() as FullUserProfile);
            } else {
                router.replace('/search');
            }
            setLoading(false);
        };
        fetchUser();
    }, [id, db, router]);

    useEffect(() => {
        const handleView = async () => {
            if (!id || isCurrentUserLoading) return;

            // Don't count view if it's the user's own profile or they are not logged in
            if (!currentUser || currentUser.id === id) {
                return;
            }

            const viewedKey = `viewed-${id}`;
            if (sessionStorage.getItem(viewedKey)) {
                return;
            }
            
            // Call the server action
            await incrementProfileView(id);
            sessionStorage.setItem(viewedKey, 'true');
        };

        handleView();
    }, [id, currentUser, isCurrentUserLoading]);

    if (loading || isCurrentUserLoading || !user) {
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
        <UserProfileClient initialUser={user} />
    );
}
