'use server';

import { getDb } from './firebase-server-init';
import { toSerializable } from './serialize';
import { revalidatePath } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { getCurrentUser, getCurrentUserId } from './auth-actions';

// Use 'import type' to prevent circular dependency and build errors
import type {
  FullUserProfile,
  Startup
} from './types';

// --- SEARCH & POLLING ACTIONS ---

export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const db = getDb();
    try {
        const currentUserId = await getCurrentUserId();
        
        const [usersSnap, startupsSnap] = await Promise.all([
            db.collection('users').get(),
            db.collection('startups').get()
        ]);

        const allUsers = usersSnap.docs
            .map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            .filter(user => {
                if (!currentUserId) return true;

                const docId = String(user.id);
                // Use a safe access for 'uid' to satisfy the TypeScript compiler
                const internalUid = (user as any).uid ? String((user as any).uid) : null;
                const targetId = String(currentUserId);

                // Exclude if EITHER the document ID or the internal UID matches
                return docId !== targetId && internalUid !== targetId;
            })
            .map(user => toSerializable(user) as FullUserProfile);

        const allStartups = startupsSnap.docs.map(doc =>
            toSerializable({ id: doc.id, ...doc.data() }) as Startup
        );

        return {
            startups: allStartups,
            users: allUsers
        };

    } catch (error) {
        console.error("Error in getSearchResults:", error);
        return { startups: [], users: [] };
    }
}

// --- USER & PROFILE ACTIONS ---

export async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    const db = getDb();
    if (!ids || ids.length === 0) return [];
    try {
        const uniqueIds = [...new Set(ids)];
        const userRefs = uniqueIds.map(id => db.collection('users').doc(id));
        const userDocs = await db.getAll(...userRefs);
        return toSerializable(userDocs.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }))) as FullUserProfile[];
    } catch (error) {
        return [];
    }
}

export async function updateUser(userId: string, data: Partial<FullUserProfile>) {
    try {
        const db = getDb();
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.id !== userId) throw new Error("Unauthorized");
        await db.collection('users').doc(userId).set(data, { merge: true });
        revalidatePath(`/users/${userId}`);
        revalidatePath(`/profile/edit`, 'layout');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- STARTUP ACTIONS ---

export async function getStartupById(id: string): Promise<Startup | null> {
    const db = getDb();
    try {
        const doc = await db.collection('startups').doc(id).get();
        if (!doc.exists) return null;
        return toSerializable({ id: doc.id, ...doc.data() }) as Startup;
    } catch (error) {
        console.error("Error in getStartupById:", error);
        return null;
    }
}

export async function updateStartupData(id: string, data: Partial<Startup>) {
    try {
        const db = getDb();
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error("Unauthorized");
        const startupRef = db.collection('startups').doc(id);
        await startupRef.update({ ...data, updatedAt: FieldValue.serverTimestamp() });
        revalidatePath(`/profile/edit`, 'layout');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- MESSAGING ACTIONS ---

export async function sendMessage(conversationId: string, text: string) {
    try {
        const db = getDb();
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error("Not authenticated");

        const batch = db.batch();
        const messageRef = db.collection('conversations').doc(conversationId).collection('messages').doc();
        batch.set(messageRef, {
            text,
            senderId: currentUser.id,
            timestamp: FieldValue.serverTimestamp(),
        });

        const conversationRef = db.collection('conversations').doc(conversationId);
        batch.update(conversationRef, {
            lastMessage: text,
            lastActivity: FieldValue.serverTimestamp()
        });

        await batch.commit();
        revalidatePath(`/messages/${conversationId}`);
        return { success: true };
    } catch (error: any) {
        console.error("SendMessage Error:", error);
        return { success: false, error: error.message };
    }
}

// --- AI FLOW ACTIONS ---

export async function getFinancialBreakdown(input: any) {
    const { financialBreakdown } = await import('@/ai/flows/financial-breakdown');
    return await financialBreakdown(input);
}

export async function getProfilePictureTags(input: any) {
    const { profilePictureAutoTagging } = await import('@/ai/flows/profile-picture-auto-tagging');
    return await profilePictureAutoTagging(input);
}

export async function getProfileFromLinkedIn(input: any) {
    const { populateProfileFromLinkedIn } = await import('@/ai/flows/linkedin-profile-populator');
    return await populateProfileFromLinkedIn(input);
}
