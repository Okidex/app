
'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { getDb, getAuth } from './firebase-server-init';
import { FullUserProfile, UserRole } from './types';
import { toSerializable } from '@/lib/serialize';

async function createSessionCookie(idToken: string) {
    const auth = getAuth();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    const cookieStore = await cookies();
    cookieStore.set('__session', sessionCookie, {
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
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session');
    if (!sessionCookie) return null;
    try {
        const auth = getAuth();
        const decodedToken = await auth.verifySessionCookie(sessionCookie.value, true);
        return decodedToken.uid;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;
    if (sessionCookie) {
        try {
            const auth = getAuth();
            const decodedToken = await auth.verifySessionCookie(sessionCookie);
            await auth.revokeRefreshTokens(decodedToken.sub);
        } catch (e) {}
    }
    cookieStore.delete('__session');
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
        if (role === 'founder' && companyId) {
            batch.delete(db.collection('startups').doc(companyId));
        }
        await batch.commit();
        await auth.deleteUser(userId);
        const cookieStore = await cookies();
        cookieStore.delete('__session');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
