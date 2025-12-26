'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getFirebaseAdmin } from './firebase-server-init';

/**
 * Log in a user and establish a session cookie.
 */
export async function login(idToken: string) {
  const { auth } = getFirebaseAdmin();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    const cookieStore = await cookies();
    cookieStore.set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Login Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * FIX: Restore missing function for Register Forms
 * Used by founder-register-form.tsx, investor-register-form.tsx, talent-register-form.tsx
 */
export async function createUserAndSetSession(idToken: string) {
  // Logic is identical to login for session establishment
  return await login(idToken);
}

/**
 * FIX: Restore missing function for Settings Page
 * Used by src/app/(app)/settings/client.tsx
 */
export async function deleteCurrentUserAccount() {
  const { auth } = getFirebaseAdmin();
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('__session')?.value;

  try {
    if (sessionCookie) {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie);
      // Delete from Firebase Auth
      await auth.deleteUser(decodedClaims.uid);
      // Note: Add logic here to delete Firestore user data if required
    }
    
    cookieStore.delete('__session');
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
  const cookieStore = await cookies();
  cookieStore.delete('__session');
  revalidatePath('/', 'layout');
  return { success: true };
}
