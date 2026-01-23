'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { getFirebaseAdmin } from './firebase-server-init';
import { FullUserProfile, UserRole, FounderProfile } from './types';
import { toSerializable } from '@/lib/serialize';

async function createSessionCookie(idToken: string) {
    const { auth: adminAuth } = await getFirebaseAdmin();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    cookies().set('__session', sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    });
}

export async function login(idToken: string) {
    await createSessionCookie(idToken);
}

export async function createUserAndSetSession(idToken: string) {
    try {
        await createSessionCookie(idToken);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getCurrentUserId(): Promise<string | null> {
    const { auth } = await getFirebaseAdmin();
    const sessionCookie = cookies().get('__session');

    if (!sessionCookie) return null;
    
    try {
        const decodedToken = await auth.verifySessionCookie(sessionCookie.value, true);
        return decodedToken.uid;
    } catch (error) {
        cookies().delete('__session');
        return null;
    }
}

export async function logout() {
    const { auth: adminAuth } = await getFirebaseAdmin();
    const sessionCookie = cookies().get('__session')?.value;

    if (sessionCookie) {
        try {
            const decodedToken = await adminAuth.verifySessionCookie(sessionCookie);
            await adminAuth.revokeRefreshTokens(decodedToken.sub);
        } catch (error) {
            // Stale cookie, ignore
        }
    }
    cookies().delete('__session');
}

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const { firestore } = await getFirebaseAdmin();
  const uid = await getCurrentUserId();
  
  if (!uid) return null;
  
  try {
    const userDoc = await firestore.collection('users').doc(uid).get();
    if (!userDoc.exists) return null;
    return toSerializable({ id: userDoc.id, ...userDoc.data() }) as FullUserProfile;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function deleteCurrentUserAccount(userId: string, role: UserRole, companyId?: string): Promise<{ success: boolean, error?: string }> {
    const { auth, firestore, storage } = await getFirebaseAdmin();

    try {
        const currentUser = await getCurrentUserId();
        if (currentUser !== userId) {
            return { success: false, error: "Unauthorized action." };
        }

        const batch = firestore.batch();
        
        const userRef = firestore.collection('users').doc(userId);
        batch.delete(userRef);

        if (role === 'founder' && companyId) {
            const startupRef = firestore.collection('startups').doc(companyId);
            batch.delete(startupRef);
        }
        
        // TODO: Add deletion of other user-related data (jobs, theses, etc.)

        await batch.commit();
        await auth.deleteUser(userId);

        const profilePicturePath = `profiles/${userId}/`;
        const bucket = storage.bucket();
        await bucket.deleteFiles({ prefix: profilePicturePath });
        
        cookies().delete('__session');

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting user account:", error);
        return { success: false, error: error.message };
    }
}
