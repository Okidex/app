
'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { initializeAdminApp } from './firebase-server-init';
import { FullUserProfile, FounderProfile, UserRole, Profile, TalentSubRole, Startup, InvestorProfile, TalentProfile } from './types';
import { FieldValue } from 'firebase-admin/firestore';
import { toSerializable } from '@/lib/serialize';
import { getAuth } from 'firebase-admin/auth';

async function createSessionCookie(idToken: string) {
    const { auth: adminAuth } = await initializeAdminApp();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    cookies().set('__session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
}

export async function login(idToken: string):Promise<{success: boolean, error?: string}> {
  try {
    await createSessionCookie(idToken);
    return { success: true };
  } catch(error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
    const { auth: adminAuth } = await initializeAdminApp();
    const sessionCookie = cookies().get('__session')?.value;
    if (sessionCookie) {
        try {
            const decodedToken = await adminAuth.verifySessionCookie(sessionCookie);
            await adminAuth.revokeRefreshTokens(decodedToken.sub);
        } catch (error) {
            console.error("Error revoking refresh tokens during logout:", error);
        }
    }
    cookies().set('__session', '', { maxAge: 0, path: '/' });
}

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const { firestore } = await initializeAdminApp();
  const uid = await getCurrentUserId();
  
  if (!uid) {
    return null;
  }
  
  const userDoc = await firestore.collection('users').doc(uid).get();

  if (!userDoc.exists) {
    return null;
  }

  return toSerializable(userDoc.data()) as FullUserProfile;
}

export async function getCurrentUserId(): Promise<string | null> {
    const { auth } = await initializeAdminApp();
    const sessionCookie = cookies().get('__session');

    if (!sessionCookie) {
        return null;
    }
    
    try {
        const decodedToken = await auth.verifySessionCookie(sessionCookie.value, true);
        return decodedToken.uid;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}

// This function now only handles setting the session cookie.
// User and profile creation is handled on the client.
export async function createUserAndSetSession(idToken: string) {
    try {
        await createSessionCookie(idToken);
        return { success: true };
    } catch (error: any) {
        console.error("Error creating session cookie:", error);
        return { success: false, error: error.message };
    }
}


export async function deleteCurrentUserAccount(userId: string, role: UserRole, companyId?: string) {
    const { auth, firestore } = await initializeAdminApp();
    try {
        await firestore.collection("users").doc(userId).delete();
        if (role === 'founder' && companyId) {
            await firestore.collection("startups").doc(companyId).delete();
        }
        await auth.deleteUser(userId);
        await logout();

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting user account:", error);
        let errorMessage = "An unexpected error occurred.";
        if (error.code === 'auth/requires-recent-login') {
            errorMessage = "This is a sensitive operation and requires recent authentication. Please log in again before retrying.";
        } else {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
}
