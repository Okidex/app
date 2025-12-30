'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; // Added for redirection
import { getFirebaseAdmin } from './firebase-server-init';
import { FullUserProfile } from './types';

function toSerializable<T>(data: any): T {
    if (data === null || data === undefined) return data;
    if (typeof data !== 'object') return data;
    if (data.toDate && typeof data.toDate === 'function') {
      return data.toDate().toISOString() as any;
    }
    if (Array.isArray(data)) return data.map(toSerializable) as any;
    const res: { [key: string]: any } = {};
    for (const key in data) {
      res[key] = toSerializable(data[key]);
    }
    return res as T;
}

/**
 * Log in a user and establish a session cookie.
 */
export async function login(idToken: string) {
  const { auth } = getFirebaseAdmin();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  let success = false;

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    const cookieStore = await cookies(); // Awaited for Next.js 15
    
    cookieStore.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: true, // Required for __session prefix
      sameSite: 'lax',
      path: '/',
    });
    success = true;
  } catch (error: any) {
    console.error('Login Error:', error);
    return { success: false, error: error.message };
  }

  if (success) {
    revalidatePath('/', 'layout');
    redirect('/dashboard'); // Change this to your desired post-login route
  }
}

/**
 * Create a user record and establish a session cookie.
 */
export async function createUserAndSetSession(idToken: string) {
  // This will now trigger the redirect inside the login function
  return await login(idToken);
}

/**
 * Retrieves the FullUserProfile for the currently authenticated user.
 */
export async function getCurrentUser(): Promise<FullUserProfile | null> {
    const { auth, firestore } = getFirebaseAdmin();
    const cookieStore = await cookies(); // Awaited for Next.js 15
    const sessionCookie = cookieStore.get('__session')?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userDoc = await firestore.collection('users').doc(decodedClaims.uid).get();
        if (userDoc.exists) {
            return toSerializable(userDoc.data()) as FullUserProfile;
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Delete account and clear session.
 */
export async function deleteCurrentUserAccount(userId: string, role: string, companyId?: string) {
  const { auth, firestore } = getFirebaseAdmin();
  let success = false;

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
    success = true;
  } catch (error: any) {
    console.error("Delete Account Error:", error);
    return { success: false, error: error.message };
  }

  if (success) {
    revalidatePath('/', 'layout');
    redirect('/login');
  }
}

/**
 * Log out and purge session.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('__session');
  revalidatePath('/', 'layout');
  redirect('/login'); // Redirecting ensures the UI updates to logged-out state
}
