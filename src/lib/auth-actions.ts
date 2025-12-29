'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getFirebaseAdmin } from './firebase-server-init';
import { FullUserProfile } from './types';
import { toSerializable } from './serialize';

/**
 * Log in a user and establish a session cookie.
 * UPDATED FOR NEXT.JS 15: cookies() must be awaited.
 */
export async function login(idToken: string) {
  const { auth } = getFirebaseAdmin();
  // 5 days in milliseconds
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    const cookieStore = await cookies();
    
    cookieStore.set('__session', sessionCookie, {
      // maxAge is in seconds
      maxAge: Math.floor(expiresIn / 1000),
      httpOnly: true,
      // Use secure: true for production/Firebase Hosting,
      // but allow it to be flexible for local proxy environments if needed.
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Login Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create a user record and establish a session cookie during registration.
 */
export async function createUserAndSetSession(idToken: string) {
  return await login(idToken);
}

/**
 * Retrieves the FullUserProfile for the currently authenticated user from session.
 */
export async function getCurrentUser(): Promise<FullUserProfile | null> {
    const { auth, firestore } = getFirebaseAdmin();
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userDoc = await firestore.collection('users').doc(decodedClaims.uid).get();
        if (userDoc.exists) {
            return toSerializable(userDoc.data()) as FullUserProfile;
        }
        return null;
    } catch (error) {
        // Session cookie is invalid or expired.
        console.error("Error verifying session cookie in getCurrentUser:", error);
        return null;
    }
}

/**
 * Delete account and clear session.
 */
export async function deleteCurrentUserAccount(userId: string, role: string, companyId?: string) {
  const { auth, firestore } = getFirebaseAdmin();

  try {
    await auth.deleteUser(userId);
    const userDocRef = firestore.collection('users').doc(userId);
    await userDocRef.delete();

    if (role === 'founder' && companyId) {
        const startupDocRef = firestore.collection('startups').doc(companyId);
        await startupDocRef.delete();
    }
    
    const cookieStore = await cookies();
    cookieStore.delete('__session');
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error("Delete Account Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Log out and purge session.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('__session');
  
  // Clear the cache for all routes to ensure the UI updates
  revalidatePath('/', 'layout');
  return { success: true };
}
