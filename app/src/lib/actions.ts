'use server';

import { db, auth as adminAuth } from './firebase-server-init';
import { toSerializable } from './serialize';
import { FieldValue } from 'firebase-admin/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseApp as clientApp } from '../firebase';
import { smartSearch } from '@/ai/flows/smart-search';
import { stripe } from './stripe/config';
import { getSessionUser } from './auth-actions';
import type {
  FullUserProfile,
  Startup,
  FounderProfile,
  InvestorProfile,
  TalentProfile,
  UserRole
} from './types';

/**
 * [DEBUGGER] Unified UID Fetching
 */
async function getVerifiedUid(idToken?: string) {
    if (!adminAuth) return null;
    if (idToken) {
        try {
            const decoded = await adminAuth.verifyIdToken(idToken);
            return decoded.uid;
        } catch (e: any) {
            console.error(`[DEBUGGER-ACTION] Token verification failed:`, e.message);
        }
    }
    try {
        return await getSessionUser();
    } catch (e: any) {
        return null;
    }
}

/**
 * Helper to verify Oki+ status.
 * [TRIAL OVERRIDE] mario@xpandtree.com is always premium.
 */
async function verifyPremiumStatus(user: FullUserProfile): Promise<boolean> {
    const email = user.email?.toLowerCase();
    if (email === 'mario@xpandtree.com') return true;
    if (user.role !== 'founder') return true;
    
    const profile = user.profile as FounderProfile;
    if (profile.isPremium) return true;

    const subId = profile.stripe?.subscriptionId;
    if (!subId) return false;

    try {
        const sub = await stripe.subscriptions.retrieve(subId);
        if (sub.status === 'active' || sub.status === 'trialing') {
            if (db) {
                await db.collection('users').doc(user.id).update({ 'profile.isPremium': true });
            }
            return true;
        }
    } catch (e) {
        console.error("[OKI-AUTH] Stripe verification failed:", e);
    }
    return false;
}

const getAiCallable = (name: string) => {
    if (!clientApp) {
        throw new Error("Firebase Client App not initialized.");
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

function checkSearchRelevance(searchingUser: FullUserProfile, targetUser: FullUserProfile): boolean {
    const sRole = searchingUser.role;
    const tRole = targetUser.role;

    if (sRole === 'founder') {
        return tRole === 'talent';
    }

    if (sRole === 'investor') {
        if (tRole === 'talent' || tRole === 'investor') return true;
        if (tRole === 'founder') {
            const p = targetUser.profile as FounderProfile;
            return p.isPremium === true;
        }
        return false;
    }

    if (sRole === 'talent') {
        if (tRole === 'talent') {
            const sLooking = searchingUser.isLookingForCoFounder === true || (searchingUser.profile as FounderProfile)?.isLookingForCoFounder === true;
            const tLooking = targetUser.isLookingForCoFounder === true || (targetUser.profile as FounderProfile)?.isLookingForCoFounder === true;
            return sLooking && tLooking;
        }
        if (tRole === 'founder') {
            const p = targetUser.profile as FounderProfile;
            const tLookingCofounder = targetUser.isLookingForCoFounder === true || p?.isLookingForCoFounder === true || p?.objectives?.includes('seekingCoFounders');
            const tHiring = targetUser.isHiring === true || p?.objectives?.includes('lookingToHire');
            return !!(tLookingCofounder || tHiring);
        }
        if (tRole === 'investor') {
            const p = targetUser.profile as InvestorProfile;
            const isNetworkingMatch = searchingUser.isNetworking && (targetUser.isNetworking || p?.seeking?.includes('Open to Networking'));
            return targetUser.isHiring === true || p?.isHiring === true || !!isNetworkingMatch;
        }
        return false;
    }

    return false;
}

/**
 * [SIMPLIFIED SEARCH]
 * Hardened with Mario "God Mode" and Oki+ Premium Check.
 */
export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    try {
        if (!db) return { startups: [], users: [] };

        const uid = await getVerifiedUid();
        const usersSnap = await db.collection('users').get();
        const startupsSnap = await db.collection('startups').get();

        let allUsers = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FullUserProfile));
        let allStartups = startupsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));

        const searchingUser = uid ? allUsers.find(u => u.id === uid) : null;
        if (!searchingUser) return { startups: [], users: [] };

        const isPremium = await verifyPremiumStatus(searchingUser);
        const isMario = searchingUser.email?.toLowerCase() === 'mario@xpandtree.com';

        if (!isPremium && !isMario) return { startups: [], users: [] };

        if (isMario) {
            const others = allUsers.filter(u => u.id !== uid);
            return {
                startups: allStartups.map(toSerializable) as Startup[],
                users: others.map(toSerializable) as FullUserProfile[]
            };
        }

        if (!query || query.trim() === '') return { startups: [], users: [] };
        
        allUsers = allUsers.filter(u => u.id !== uid && checkSearchRelevance(searchingUser, u));
        const q = query.toLowerCase();

        let aiMatchedUserIds: string[] = [];
        let aiMatchedStartupIds: string[] = [];

        try {
            const searchableData = JSON.stringify({
                users: allUsers.map(u => {
                    const p = u.profile as any;
                    return {
                        id: u.id,
                        name: u.name,
                        role: u.role,
                        isHiring: u.isHiring || p?.isHiring || p?.objectives?.includes('lookingToHire') || false,
                        isSeekingCoFounder: u.isLookingForCoFounder || p?.isLookingForCoFounder || p?.objectives?.includes('seekingCoFounders') || false,
                        title: p?.title,
                        headline: p?.headline,
                        company: p?.companyName,
                        skills: p?.skills,
                        interests: p?.investmentInterests
                    };
                }),
                startups: allStartups.map(s => ({
                    id: s.id,
                    companyName: s.companyName,
                    industry: s.industry,
                    stage: s.stage,
                    tagline: s.tagline
                }))
            });
            const aiResults = await smartSearch({ query, searchableData });
            aiMatchedUserIds = aiResults.userIds || [];
            aiMatchedStartupIds = aiResults.startupIds || [];
        } catch (e) {
            console.warn("AI search fallback to keywords");
        }

        const keywordUsers = allUsers.filter(u => {
            const p = u.profile as any;
            const fullText = [
                u.name, u.role, u.email, p?.about, p?.headline, p?.title, p?.companyName,
                ...(p?.skills || []), ...(p?.investmentInterests || []), ...(p?.objectives || []), ...(p?.seeking || [])
            ].filter(Boolean).join(" ").toLowerCase();
            
            const isHiringQuery = q.includes('hiring') || q.includes('job') || q.includes('recruit');
            const matchesHiring = isHiringQuery && (u.isHiring || p?.isHiring || p?.objectives?.includes('lookingToHire'));
            
            const isCofounderQuery = q.includes('co-founder') || q.includes('cofounder');
            const matchesCofounder = isCofounderQuery && (u.isLookingForCoFounder || p?.isLookingForCoFounder || p?.objectives?.includes('seekingCoFounders'));

            return fullText.includes(q) || matchesHiring || matchesCofounder;
        });
        const finalUserIds = new Set([...aiMatchedUserIds, ...keywordUsers.map(u => u.id)]);
        const finalUsers = allUsers.filter(u => finalUserIds.has(u.id)).slice(0, 50);

        return {
            startups: allStartups.filter(s => aiMatchedStartupIds.includes(s.id)).map(toSerializable) as Startup[],
            users: finalUsers.map(toSerializable) as FullUserProfile[]
        };
    } catch (error) {
        console.error("[DEBUGGER-SEARCH] Search error:", error);
        return { startups: [], users: [] };
    }
}

export async function getStartupById(id: string): Promise<Startup | null> {
    if (!id || !db) return null;
    try {
        const doc = await db.collection('startups').doc(id).get();
        if (!doc.exists) return null;
        return toSerializable({ id: doc.id, ...doc.data() }) as Startup;
    } catch (e) { return null; }
}

/**
 * Updates startup metadata (Cap Table, Fundraising, etc.)
 */
export async function updateStartupData(
    startupId: string,
    data: any
): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid();
    if (!uid || !db || !startupId) {
        return { success: false, error: "Authentication failed or invalid startup ID." };
    }
    try {
        await db.collection('startups').doc(startupId).update({
            ...data,
            updatedAt: FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to update startup data." };
    }
}

export async function incrementProfileView(targetUid: string) {
    if (!db || !targetUid) return;
    try {
        await db.collection('users').doc(targetUid).update({
            profileViews: FieldValue.increment(1)
        });
    } catch (e) { console.error(e); }
}

/**
 * Messaging & Connections
 */
export async function sendMessage(
    conversationId: string,
    text: string,
    idToken?: string
): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !db || !text.trim()) {
        return { success: false, error: "Authentication or validation failed." };
    }
    try {
        await db.collection('conversations').doc(conversationId).collection('messages').add({
            senderId: uid,
            text: text.trim(),
            timestamp: FieldValue.serverTimestamp()
        });
        await db.collection('conversations').doc(conversationId).update({
            lastMessage: text.trim(),
            lastMessageTimestamp: FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "An unknown error occurred." };
    }
}

export async function sendConnectionRequest(targetUid: string, idToken?: string): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !db || !targetUid) {
        return { success: false, error: "Authentication failed or invalid target." };
    }
    try {
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to send request." };
    }
}

/**
 * Respond to Connection Requests
 */
export async function respondToConnectionRequest(
    requestId: string,
    status: 'accept' | 'declined' | 'reject',
    idToken?: string
): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !db || !requestId) {
        return { success: false, error: "Authentication failed or invalid request." };
    }
    try {
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to respond." };
    }
}

/**
 * Messaging: Get or Create a Conversation
 */
export async function getOrCreateConversation(
    targetUid: string,
    idToken?: string
): Promise<{ success: boolean; conversationId?: string; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !db || !targetUid) {
        return { success: false, error: "Authentication failed or invalid target." };
    }
    try {
        return { success: true, conversationId: "conv_placeholder_id" };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to initiate conversation." };
    }
}

export async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    if (!ids || ids.length === 0 || !db) return [];
    try {
        const uniqueIds = [...new Set(ids)].slice(0, 30);
        const userRefs = uniqueIds.map(id => db.collection('users').doc(id));
        const userDocs = await db.getAll(...userRefs);
        return userDocs.filter(d => d.exists).map(d => toSerializable({ id: d.id, ...d.data() })) as FullUserProfile[];
    } catch (e) { return []; }
}
