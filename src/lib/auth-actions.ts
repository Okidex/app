'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { getDb, getAuth } from './firebase-server-init';
import { toSerializable } from '@/lib/serialize';

// Use import type for internal build stability
import type { FullUserProfile, UserRole } from './types';

const SESSION_COOKIE_NAME = '__session';

async function createSessionCookie(idToken: string) {
    const auth = getAuth();
    // 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
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
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) return null;
    
    try {
        const auth = getAuth();
        // Set checkRevoked to false for general speed; only use true for high-security actions
        const decodedToken = await auth.verifySessionCookie(sessionCookie.value, false);
        return decodedToken.uid;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    
    if (sessionCookie) {
        try {
            const auth = getAuth();
            const decodedToken = await auth.verifySessionCookie(sessionCookie);
            await auth.revokeRefreshTokens(decodedToken.sub);
        } catch (e) {
            // Ignore token verification errors during logout
        }
    }
    
    // Explicitly set path when deleting to ensure it clears globally
    cookieStore.delete({ name: SESSION_COOKIE_NAME, path: '/' });
}

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const uid = await getCurrentUserId();
  if (!uid) return null;
  
  try {
    const db = getDb();
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) return null;
    return toSerializable({ id: userDoc.id, ...userDoc.data() }) as FullUserProfile;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function deleteCurrentUserAccount(userId: string, role: UserRole, companyId?: string): Promise<{ success: boolean, error?: string }> {
    try {
        const currentUser = await getCurrentUserId();
        if (currentUser !== userId) return { success: false, error: "Unauthorized" };

        const db = getDb();
        const auth = getAuth();
        const batch = db.batch();
        
        batch.delete(db.collection('users').doc(userId));
        
        // If they have a profile doc in the user_profiles collection, delete that too
        batch.delete(db.collection('user_profiles').doc(userId));

        if (role === 'founder' && companyId) {
            batch.delete(db.collection('startups').doc(companyId));
        }
        
        await batch.commit();
        await auth.deleteUser(userId);
        
        const cookieStore = await cookies();
        cookieStore.delete({ name: SESSION_COOKIE_NAME, path: '/' });
        
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting account:", error);
        return { success: false, error: error.message };
    }
}
