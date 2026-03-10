'use server';

import { db, auth as adminAuth } from './firebase-server-init';
import { toSerializable } from './serialize';
import { FieldValue } from 'firebase-admin/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseApp as clientApp } from '../firebase';
import { smartSearch } from '@/ai/flows/smart-search';
import type {
  FullUserProfile,
  Startup,
  FounderProfile,
  InvestorProfile,
  TalentProfile
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
    try {
        return await getSessionUser();
    } catch (e) {
        return null;
    }
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

/**
 * Perform a smart search using GenAI, rationalized by user objectives.
 * prioritization based on 'fit' score determined by the LLM.
 */
export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    console.log(`[DEBUGGER-SEARCH] Starting prioritized search for: "${query}"`);
    try {
        // 1. Fetch all searchable data (Users and Startups)
        const usersSnap = await db.collection('users').get();
        const startupsSnap = await db.collection('startups').get();

        const allUsers = usersSnap.docs.map(doc => ({
            id: doc.id,
            role: doc.data().role,
            name: doc.data().name,
            profile: doc.data().profile
        }));

        const allStartups = startupsSnap.docs.map(doc => ({
            id: doc.id,
            companyName: doc.data().companyName,
            industry: doc.data().industry,
            tagline: doc.data().tagline,
            description: doc.data().description,
            stage: doc.data().stage
        }));

        // 2. Prepare concise searchable context for the LLM
        const searchableData = JSON.stringify({
            users: allUsers.map(u => ({
                id: u.id,
                name: u.name,
                role: u.role,
                objectives: (u.profile as FounderProfile)?.objectives || [],
                seeking: (u.profile as InvestorProfile)?.seeking || [],
                subRole: (u.profile as TalentProfile)?.subRole || '',
                skills: (u.profile as TalentProfile)?.skills || (u.profile as InvestorProfile)?.investmentInterests || []
            })),
            startups: allStartups
        });

        // 3. Invoke GenAI for prioritized matching based on Objectives
        console.log('[DEBUGGER-SEARCH] Invoking Smart Match LLM...');
        const { userIds, startupIds } = await smartSearch({ query, searchableData });

        // 4. Fetch full documents for the returned prioritized IDs
        const prioritizedUsers: FullUserProfile[] = [];
        const prioritizedStartups: Startup[] = [];

        if (userIds.length > 0) {
            const userDocs = await getUsersByIds(userIds);
            // Re-sort back to LLM's prioritized order
            userIds.forEach(id => {
                const user = userDocs.find(u => u.id === id);
                if (user) prioritizedUsers.push(user);
            });
        }

        if (startupIds.length > 0) {
            for (const id of startupIds) {
                const startup = await getStartupById(id);
                if (startup) prioritizedStartups.push(startup);
            }
        }

        console.log(`[DEBUGGER-SEARCH] SUCCESS - Found ${prioritizedUsers.length} users and ${prioritizedStartups.length} startups.`);
        return {
            startups: toSerializable(prioritizedStartups),
            users: toSerializable(prioritizedUsers)
        };
    } catch (error: any) {
        console.error("[DEBUGGER-SEARCH] FATAL ERROR:", error.message);
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
