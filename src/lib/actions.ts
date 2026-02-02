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

// --- SEARCH ACTIONS ---

export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const db = getDb();
    const currentUser = await getCurrentUser();

    if (!currentUser) return { startups: [], users: [] };

    try {
        const userPromises: Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>[] = [];
        let startupPromise: Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> | null = null;
        let allSearchableUsers: FullUserProfile[] = [];
        let allSearchableStartups: Startup[] = [];

        if (currentUser.role === 'investor') {
            userPromises.push(db.collection('users').where('role', '==', 'investor').get());
            userPromises.push(db.collection('users').where('role', '==', 'talent').get());
            userPromises.push(db.collection('users').where('role', '==', 'founder').where('profile.isPremium', '==', true).get());
            startupPromise = db.collection('startups').get();
        } else if (currentUser.role === 'founder') {
            userPromises.push(db.collection('users').where('role', '==', 'talent').get());
        } else if (currentUser.role === 'talent') {
            userPromises.push(db.collection('users').where('role', '==', 'founder').get());
            startupPromise = db.collection('startups').get();
        }

        const userSnapshots = await Promise.all(userPromises);
        const allUsersRaw = userSnapshots.flatMap(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FullUserProfile)));

        const userMap = new Map<string, FullUserProfile>();
        for (const u of allUsersRaw) {
            if (u.id !== currentUser.id) userMap.set(u.id, u);
        }
        allSearchableUsers = Array.from(userMap.values());

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

        if (allSearchableUsers.length === 0 && allSearchableStartups.length === 0) return { startups: [], users: [] };

        const searchableData = JSON.stringify({
            startups: allSearchableStartups.map(s => ({ id: s.id, name: s.companyName, description: s.description, tagline: s.tagline, industry: s.industry, stage: s.stage })),
            users: allSearchableUsers.map(u => ({ id: u.id, name: u.name, role: u.role, details: (u.profile as any)?.about || '' }))
        });

        const result = await smartSearch({ query, searchableData });
        const finalStartups = allSearchableStartups.filter(s => result.startupIds.includes(s.id));
        const finalUsers = allSearchableUsers.filter(u => result.userIds.includes(u.id));

        return { startups: toSerializable(finalStartups), users: toSerializable(finalUsers) };
    } catch (error) {
        console.error("Smart Search failed:", error);
        return { startups: [], users: [] };
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
    const db = getDb();
    await db.collection('users').doc(userId).update(data);
    revalidatePath(`/users/${userId}`);
    revalidatePath('/profile/edit');
}

// --- STARTUP ACTIONS ---

export async function getStartupById(id: string): Promise<Startup | null> {
    const db = getDb();
    const doc = await db.collection('startups').doc(id).get();
    if (!doc.exists) return null;
    return toSerializable({ id: doc.id, ...doc.data() }) as Startup;
}

export async function updateStartupData(id: string, data: Partial<Startup>) {
    const db = getDb();
    await db.collection('startups').doc(id).update(data);
    revalidatePath('/profile/edit');
}

// --- AI FLOW ACTIONS (RESTORED) ---

export async function getFinancialBreakdown(input: FinancialBreakdownInput): Promise<FinancialBreakdownOutput> {
    return await financialBreakdown(input);
}

export async function getProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput): Promise<PopulateProfileFromLinkedInOutput> {
    return await populateProfileFromLinkedIn(input);
}

export async function getProfilePictureTags(input: ProfilePictureAutoTaggingInput): Promise<ProfilePictureAutoTaggingOutput> {
    return await profilePictureAutoTagging(input);
}
