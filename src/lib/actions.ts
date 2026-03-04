'use server';

import { db, auth as adminAuth } from './firebase-server-init';
import { toSerializable } from './serialize';
import { FieldValue } from 'firebase-admin/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
// FIXED: Changed 'app' to 'firebaseApp' to match your index.ts exports
import { firebaseApp as clientApp } from '../firebase';
import type {
  FullUserProfile,
  Startup,
  FounderProfile
} from './types';

/**
 * Helper to verify user identity either via explicit ID token or session cookie.
 */
async function getVerifiedUid(idToken?: string) {
    if (idToken) {
        try {
            const decoded = await adminAuth.verifyIdToken(idToken);
            return decoded.uid;
        } catch (e) {
            console.error('[DEBUG-ACTION] Token verification failed:', e);
        }
    }
    const { getSessionUser } = await import('./auth-actions');
    return await getSessionUser();
}

const getAiCallable = (name: string) => {
    if (!clientApp) {
        throw new Error("Firebase Client App not initialized for AI actions.");
    }
    const functions = getFunctions(clientApp, 'us-central1');
    return httpsCallable(functions, name);
};

export async function getFinancialBreakdown(input: any) {
    const fn = getAiCallable('financialBreakdown');
    const result = await fn(input);
    return result.data;
}

export async function getProfilePictureTags(input: any) {
    const fn = getAiCallable('profilePictureAutoTagging');
    const result = await fn(input);
    return result.data;
}

export async function getProfileFromLinkedIn(input: any) {
    const fn = getAiCallable('populateProfileFromLinkedIn');
    const result = await fn(input);
    return result.data;
}

export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    try {
        const usersSnap = await db.collection('users').get();
        const allUsers = usersSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as FullUserProfile[];

        return {
            startups: [],
            users: toSerializable(allUsers) as FullUserProfile[]
        };
    } catch (error) {
        console.error("Error in getSearchResults:", error);
        return { startups: [], users: [] };
    }
}

export async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    if (!ids || ids.length === 0) return [];
    try {
        const uniqueIds = [...new Set(ids)].slice(0, 30);
        const userRefs = uniqueIds.map(id => db.collection('users').doc(id));
        const userDocs = await db.getAll(...userRefs);
        const users = userDocs
            .filter(doc => doc.exists)
            .map(doc => ({ id: doc.id, ...doc.data() }));
        return toSerializable(users) as FullUserProfile[];
    } catch (error) {
        console.error("Error in getUsersByIds:", error);
        return [];
    }
}

export async function getStartupById(id: string): Promise<Startup | null> {
    try {
        const doc = await db.collection('startups').doc(id).get();
        if (!doc.exists) return null;
        return toSerializable({ id: doc.id, ...doc.data() }) as Startup;
    } catch (error) {
        console.error("Error in getStartupById:", error);
        return null;
    }
}

export async function updateStartupData(id: string, data: Partial<Startup>, idToken?: string) {
    try {
        const uid = await getVerifiedUid(idToken);
        if (!uid) throw new Error("Unauthorized: No valid session.");
        const startupRef = db.collection('startups').doc(id);
        const startupDoc = await startupRef.get();
        if (!startupDoc.exists || !startupDoc.data()?.founderIds?.includes(uid)) {
            throw new Error("Unauthorized: You do not own this startup profile.");
        }
        await startupRef.update({ ...data, updatedAt: FieldValue.serverTimestamp() });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function sendMessage(conversationId: string, text: string, idToken?: string) {
    try {
        const uid = await getVerifiedUid(idToken);
        if (!uid) throw new Error("Not authenticated");
        const batch = db.batch();
        const messageRef = db.collection('conversations').doc(conversationId).collection('messages').doc();
        batch.set(messageRef, { text, senderId: uid, timestamp: FieldValue.serverTimestamp() });
        const conversationRef = db.collection('conversations').doc(conversationId);
        batch.update(conversationRef, { lastMessage: text, lastActivity: FieldValue.serverTimestamp() });
        await batch.commit();
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function incrementProfileView(viewedUserId: string) {
    try {
        const viewedUserDoc = await db.collection('users').doc(viewedUserId).get();
        if (!viewedUserDoc.exists) return { success: false };
        const viewedUser = viewedUserDoc.data() as FullUserProfile;
        if (viewedUser.role === 'founder') {
            const companyId = (viewedUser.profile as FounderProfile).companyId;
            if (companyId) {
                await db.collection('startups').doc(companyId).update({ profileViewCount: FieldValue.increment(1) });
            }
        } else {
             await db.collection('users').doc(viewedUserId).update({ 'profile.profileViewCount': FieldValue.increment(1) });
        }
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function sendConnectionRequest(targetUserId: string, idToken?: string) {
    try {
        const uid = await getVerifiedUid(idToken);
        if (!uid) throw new Error("Not authenticated");
        const senderDoc = await db.collection('users').doc(uid).get();
        const senderName = senderDoc.data()?.name || "Someone";
        const notificationRef = db.collection('notifications').doc();
        await notificationRef.set({
            userId: targetUserId,
            senderId: uid,
            type: 'connection',
            text: `${senderName} wants to connect with you.`,
            isRead: false,
            timestamp: FieldValue.serverTimestamp(),
            link: `/users/${uid}`
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getOrCreateConversation(targetUserId: string, idToken?: string) {
    try {
        const uid = await getVerifiedUid(idToken);
        if (!uid) throw new Error("Not authenticated");
        const conversationsRef = db.collection('conversations');
        const existing = await conversationsRef.where('participantIds', 'array-contains', uid).get();
        const convo = existing.docs.find(doc => doc.data().participantIds.includes(targetUserId));
        if (convo) return { success: true, conversationId: convo.id };
        const newConvoRef = conversationsRef.doc();
        await newConvoRef.set({
            participantIds: [uid, targetUserId],
            lastActivity: FieldValue.serverTimestamp()
        });
        return { success: true, conversationId: newConvoRef.id };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
