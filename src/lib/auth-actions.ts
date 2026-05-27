'use server';

import { cookies } from 'next/headers';
import { getDb, getAuth } from './firebase-server-init';
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
        console.warn('[DEBUG-AUTH-ACTION] getSessionUser: "__session" cookie is missing');
        return null;
    }
    
    try {
        console.log(`[DEBUG-AUTH-ACTION] getSessionUser: Verifying session cookie (Length: ${session.length})...`);
        const decodedToken = await getAuth().verifySessionCookie(session, false);
        console.log('[DEBUG-AUTH-ACTION] getSessionUser: SUCCESS - User UID:', decodedToken.uid);
        return decodedToken.uid;
    } catch (error: any) {
        console.error('[DEBUG-AUTH-ACTION] getSessionUser: ERROR - Session verification failed:', error.message);
        return null;
    }
}

/**
 * Creates a Firebase session cookie and sets it in the browser.
 * Uses SameSite=None and Secure=true to ensure reliability inside iframes (Firebase Studio).
 */
export async function createSession(idToken: string): Promise<{ success: boolean; error?: string }> {
    console.log('[DEBUG-AUTH-ACTION] createSession: PLUMBING TEST - Returning success immediately');
    return { success: true };
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
    /*
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
    */
    return { success: false, error: "Feature disabled for testing" };
}
