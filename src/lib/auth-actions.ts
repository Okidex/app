'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getFirebaseAdmin } from './firebase-server-init';
import { FullUserProfile } from './types';

/**
 * Helper to convert Firestore data into plain JSON.
 * Essential for Next.js 15 Server Actions.
 */
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
  console.log("[AUTH_DEBUG] Starting login flow...");
  const { auth } = getFirebaseAdmin();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  let success = false;

  try {
    // 1. Verify ID Token and create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    console.log("[AUTH_DEBUG] Session cookie generated.");

    // 2. Access Cookie Store (Awaited for Next.js 15)
    const cookieStore = await cookies();
    
    /**
     * SECURITY NOTE:
     * Firebase Hosting requires the name '__session'.
     * In Cloud Workstations, ensure your preview URL is HTTPS.
     * If 'secure' is true and the browser detects HTTP, the cookie will be dropped.
     */
    cookieStore.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' || requestIsSecure(), // Dynamic security
      sameSite: 'lax',
      path: '/',
    });

    console.log("[AUTH_DEBUG] Cookie set in store.");
    success = true;
  } catch (error: any) {
    console.error('[AUTH_DEBUG_ERROR] Login failure:', {
      message: error.message,
      code: error.code,
      stack: error.stack?.split('\n')[1] // Log just the top of the stack for clarity
    });
    return { success: false, error: "Authentication failed. Check server logs." };
  }

  if (success) {
    console.log("[AUTH_DEBUG] Redirecting to /dashboard...");
    revalidatePath('/', 'layout');
    return redirect('/dashboard');
  }
}

/**
 * Helper to detect if we are on a secure workstation link
 */
function requestIsSecure() {
  // Cloud Workstations URLs usually contain 'https'
  return true;
}

export async function createUserAndSetSession(idToken: string) {
  return await login(idToken);
}

export async function getCurrentUser(): Promise<FullUserProfile | null> {
    const { auth, firestore } = getFirebaseAdmin();
    const cookieStore = await cookies();
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

export async function deleteCurrentUserAccount(userId: string, role: string, companyId?: string) {
  const { auth, firestore } = getFirebaseAdmin();
  let success = false;

  try {
    await auth.deleteUser(userId);
    const userDocRef = firestore.collection('users').doc(userId);
    await userDocRef.delete();

    if (role === 'founder' && companyId) {
        await firestore.collection('startups').doc(companyId).delete();
    }
    
    const cookieStore = await cookies();
    cookieStore.delete('__session');
    success = true;
  } catch (error: any) {
    console.error("[AUTH_DEBUG_ERROR] Delete Account Error:", error);
    return { success: false, error: error.message };
  }

  if (success) {
    revalidatePath('/', 'layout');
    return redirect('/login');
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('__session');
  revalidatePath('/', 'layout');
  return redirect('/login');
}
