
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getFirebaseAdmin } from './firebase-server-init';
import { FullUserProfile, FounderProfile } from './types';
import { toSerializable } from './serialize';


/**
 * Log in a user and establish a session cookie.
 */
export async function login(idToken: string) {
  const { auth } = getFirebaseAdmin();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    cookies().set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
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
  // This logic is identical to login for session establishment.
  return await login(idToken);
}

/**
 * Retrieves the FullUserProfile for the currently authenticated user from session.
 */
export async function getCurrentUser(): Promise<FullUserProfile | null> {
    const { auth, firestore } = getFirebaseAdmin();
    const sessionCookie = cookies().get('__session')?.value;

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
 * Delete the current user's account from Firebase Auth and Firestore.
 */
export async function deleteCurrentUserAccount(userId: string, role: string, companyId?: string) {
  const { auth, firestore } = getFirebaseAdmin();

  try {
    // Delete from Firebase Auth
    await auth.deleteUser(userId);

    // Delete user document from Firestore
    const userDocRef = firestore.collection('users').doc(userId);
    await userDocRef.delete();

    // If user is a founder and has a company, delete the startup document
    if (role === 'founder' && companyId) {
        const startupDocRef = firestore.collection('startups').doc(companyId);
        await startupDocRef.delete();
    }
    
    // Clear the session cookie
    cookies().delete('__session');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error("Delete Account Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Log out the current user and purge the session.
 */
export async function logout() {
  cookies().delete('__session');
  revalidatePath('/', 'layout');
  return { success: true };
}
