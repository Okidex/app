
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfileRedirectPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/profile/edit/general');
    }, [router]);
    return null;
}
