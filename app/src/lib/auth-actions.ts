
'use server';

import { cookies } from 'next/headers';
import { db, auth } from './firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import type { UserRole, FounderProfile } from './types';

// =======================================================
// AUTH & SESSION HELPERS
// =======================================================

/**
 * Retrieves the current user UID from the session cookie.
 * Includes detailed logging of all available cookies for debugging.
 */
export async function getSessionUser() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    // Log all cookie names to verify if __session is present
    const cookieNames = allCookies.map(c => c.name).join(', ');
    console.log(`[DEBUG-AUTH-ACTION] getSessionUser: available cookies: [${cookieNames}]`);
    
    const session = cookieStore.get('__session')?.value;
    
    if (!session) {
        console.error('[DEBUG-AUTH-ACTION] getSessionUser: ERROR - "__session" cookie is missing from request');
        throw new Error("Unauthorized: Session cookie not found.");
    }
    
    try {
        console.log('[DEBUG-AUTH-ACTION] getSessionUser: Verifying session cookie...');
        const decodedToken = await auth.verifySessionCookie(session, false);
        console.log('[DEBUG-AUTH-ACTION] getSessionUser: SUCCESS - User UID:', decodedToken.uid);
        return decodedToken.uid;
    } catch (error: any) {
        console.error('[DEBUG-AUTH-ACTION] getSessionUser: ERROR - Session verification failed:', error.message);
        throw new Error("Unauthorized: Invalid session.");
    }
}

/**
 * Creates a Firebase session cookie and sets it in the browser.
 * Uses SameSite=None and Secure=true to ensure reliability inside iframes (Firebase Studio).
 */
export async function createSession(idToken: string) {
    console.log('[DEBUG-AUTH-ACTION] createSession: starting...');
    try {
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        
        if (!auth) {
            console.error('[DEBUG-AUTH-ACTION] FATAL: auth object is null. Firebase Admin did not initialize correctly.');
            throw new Error('Server Auth Error: Firebase Admin SDK is not initialized.');
        }
        
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        
        const cookieStore = await cookies();
        const isProd = process.env.NODE_ENV === 'production';
        cookieStore.set('__session', sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: isProd,
            path: '/',
            sameSite: isProd ? 'none' : 'lax',
        });

        console.log('[DEBUG-AUTH-ACTION] createSession: SUCCESS - Cookie "__session" has been set');
        return { success: true };
    } catch (error: any) {
        console.error('[DEBUG-AUTH-ACTION] createSession: FAILED', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Clears the session cookie from the browser.
 */
export async function deleteSession() {
    console.log('[DEBUG-AUTH-ACTION] deleteSession: clearing __session cookie');
    try {
        const cookieStore = await cookies();
        cookieStore.set('__session', '', { maxAge: 0, sameSite: 'none', secure: true });
        console.log('[DEBUG-AUTH-ACTION] deleteSession: SUCCESS');
        return { success: true };
    } catch (error: any) {
        console.error('[DEBUG-AUTH-ACTION] deleteSession: FAILED', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Deletes a user account and their associated data.
 */
export async function deleteUser(userId: string, role: UserRole, origin: string, companyId?: string) {
    console.log('[DEBUG-AUTH-ACTION] deleteUser: starting for UID:', userId);
    try {
        const uid = await getSessionUser();
        if (!uid || uid !== userId) throw new Error("Unauthorized");

        const batch = db.batch();

        batch.delete(db.collection('users').doc(userId));
        if (role === 'founder' && companyId) {
            batch.delete(db.collection('startups').doc(companyId));
        }

        await batch.commit();
        await auth.deleteUser(userId);

        // Clear the session cookie
        await deleteSession();

        console.log('[DEBUG-AUTH-ACTION] deleteUser: SUCCESS');
        return { success: true };
    } catch (error: any) {
        console.error('[DEBUG-AUTH-ACTION] deleteUser: FAILED', error.message);
        return { success: false, error: error.message };
    }
}
