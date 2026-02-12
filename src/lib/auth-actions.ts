'use server';

import { cookies } from 'next/headers';
import { db, auth } from './firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import type { UserRole, FounderProfile } from './types';

// =======================================================
// AUTH & SESSION HELPERS
// =======================================================

export async function getSessionUser() {
    const session = (await cookies()).get('__session')?.value;
    if (!session) {
        throw new Error("Unauthorized: Session cookie not found.");
    }
    const decodedToken = await auth.verifySessionCookie(session, false);
    return decodedToken.uid;
}

export async function createSession(idToken: string, origin: string) {
    try {
        if (!origin) {
            throw new Error("Could not determine request origin for session creation.");
        }
        
        const response = await fetch(`${origin}/api/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Failed to create session via API route.');
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteSession(origin: string) {
    try {
         if (!origin) {
            throw new Error("Could not determine request origin for session deletion.");
        }

        const response = await fetch(`${origin}/api/session`, {
            method: 'DELETE',
        });
        
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Failed to delete session via API route.');
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteUser(userId: string, role: UserRole, origin: string, companyId?: string) {
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

        // This must be called to clear the client-side session cookie.
        await deleteSession(origin);

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
