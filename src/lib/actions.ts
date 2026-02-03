'use server';

import { getDb, firebaseAdmin } from './firebase-server-init';
import { toSerializable } from './serialize';
import type { FinancialBreakdownInput, FinancialBreakdownOutput } from '@/ai/flows/financial-breakdown';
import { financialBreakdown } from '@/ai/flows/financial-breakdown';
import { profilePictureAutoTagging, ProfilePictureAutoTaggingInput, ProfilePictureAutoTaggingOutput } from '@/ai/flows/profile-picture-auto-tagging';
import { populateProfileFromLinkedIn, PopulateProfileFromLinkedInInput, PopulateProfileFromLinkedInOutput } from '@/ai/flows/linkedin-profile-populator';
import { smartSearch } from '@/ai/flows/smart-search';
import { FullUserProfile, Startup, Profile, Message, FounderProfile, TalentProfile, InvestorProfile, FounderObjective } from './types';
import { getCurrentUser } from './auth-actions';
import { revalidatePath } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';

// --- SEARCH ACTIONS ---

export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const db = getDb();
    const currentUser = await getCurrentUser();
    if (!currentUser) return { startups: [], users: [] };

    try {
        const userPromises: Promise<FirebaseFirestore.QuerySnapshot>[] = [];
        let startupPromise: Promise<FirebaseFirestore.QuerySnapshot> | null = null;
        
        if (currentUser.role === 'investor') {
            userPromises.push(db.collection('users').where('role', '==', 'investor').get());
            userPromises.push(db.collection('users').where('role', '==', 'talent').get());
            userPromises.push(db.collection('users').where('role', '==', 'founder').where('profile.isPremium', '==', true).get());
            startupPromise = db.collection('startups').get();
        } else if (currentUser.role === 'founder') {
            userPromises.push(db.collection('users').where('role', '==', 'talent').get());
            userPromises.push(db.collection('users').where('role', '==', 'investor').get());
        } else if (currentUser.role === 'talent') {
            userPromises.push(db.collection('users').where('role', '==', 'founder').get());
            userPromises.push(db.collection('users').where('role', '==', 'investor').get());
            startupPromise = db.collection('startups').get();
        }

        const userSnapshots = await Promise.all(userPromises);
        const allUsersRaw = userSnapshots.flatMap(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FullUserProfile)));

        const userMap = new Map<string, FullUserProfile>();
        for (const u of allUsersRaw) {
            if (u.id !== currentUser.id) userMap.set(u.id, u);
        }
        const allSearchableUsers = Array.from(userMap.values());

        let allSearchableStartups: Startup[] = [];
        if (startupPromise) {
            const startupSnapshot = await startupPromise;
            const allStartups = startupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));
            if (currentUser.role === 'investor') {
                const premiumFounderIds = new Set(allSearchableUsers.filter(u => u.role === 'founder').map(u => u.id));
                allSearchableStartups = allStartups.filter(s => s.founderIds.some(fid => premiumFounderIds.has(fid)));
            } else {
                allSearchableStartups = allStartups;
            }
        }

        const searchableData = JSON.stringify({
            startups: allSearchableStartups.map(s => ({ id: s.id, name: s.companyName, description: s.description, tagline: s.tagline, industry: s.industry, stage: s.stage })),
            users: allSearchableUsers.map(u => {
                const p = u.profile as any;
                const details = [p?.about, p?.title, p?.headline, p?.investorType, p?.investmentInterests?.join(' '), p?.skills?.join(' ')].filter(Boolean).join(' ');
                return { id: u.id, name: u.name, role: u.role, details };
            })
        });

        const result = await smartSearch({ query, searchableData });
        return {
            startups: toSerializable(allSearchableStartups.filter(s => result.startupIds.includes(s.id))),
            users: toSerializable(allSearchableUsers.filter(u => result.userIds.includes(u.id)))
        };
    } catch (error) {
        console.error("Smart Search failed:", error);
        return { startups: [], users: [] };
    }
}

// --- MESSAGING ACTIONS ---

export async function sendMessage(conversationId: string, text: string) {
    try {
        const db = getDb();
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error("Not authenticated");

        const messageData = {
            text,
            senderId: currentUser.id,
            createdAt: FieldValue.serverTimestamp(),
        };

        const batch = db.batch();
        const messageRef = db.collection('conversations').doc(conversationId).collection('messages').doc();
        const convRef = db.collection('conversations').doc(conversationId);

        batch.set(messageRef, messageData);
        batch.update(convRef, {
            lastMessage: text,
            updatedAt: FieldValue.serverTimestamp(),
        });

        await batch.commit();
        revalidatePath(`/messages/${conversationId}`);
        return { success: true };
    } catch (error: any) {
        console.error("SendMessage failed:", error);
        return { success: false, error: error.message };
    }
}

// --- PROFILE & USER ACTIONS ---

export async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    const db = getDb();
    if (!ids.length) return [];
    const snapshots = await Promise.all(ids.map(id => db.collection('users').doc(id).get()));
    return toSerializable(snapshots.filter(s => s.exists).map(s => ({ id: s.id, ...s.data() }))) as FullUserProfile[];
}

export async function updateUser(userId: string, data: Partial<FullUserProfile>) {
    try {
        const db = getDb();
        await db.collection('users').doc(userId).update(data);
        revalidatePath(`/users/${userId}`);
        revalidatePath('/profile/edit');
        return { success: true };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update profile" };
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
        await db.collection('startups').doc(id).update(data);
        revalidatePath('/profile/edit');
        revalidatePath(`/users/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating startup data:", error);
        return { success: false, error: "Failed to update startup data" };
    }
}

// --- AI FLOW ACTIONS ---

export async function getFinancialBreakdown(input: FinancialBreakdownInput): Promise<FinancialBreakdownOutput> {
    return await financialBreakdown(input);
}

export async function getProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput): Promise<PopulateProfileFromLinkedInOutput> {
    return await populateProfileFromLinkedIn(input);
}

export async function getProfilePictureTags(input: ProfilePictureAutoTaggingInput): Promise<ProfilePictureAutoTaggingOutput> {
    return await profilePictureAutoTagging(input);
}
