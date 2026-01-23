'use server';

import 'server-only';
import { getFirebaseAdmin } from './firebase-server-init';
import { toSerializable } from './serialize';
import { FullUserProfile, Startup, Profile } from './types';

/**
 * AI Flow Imports
 * In Next.js 16/Turbopack, we import from the base filename.
 * Ensure your files in @/ai/flows/ are renamed to .ts extension.
 */
import { financialBreakdown } from '@/ai/flows/financial-breakdown';
import type { FinancialBreakdownInput, FinancialBreakdownOutput } from '@/ai/flows/financial-breakdown';

import { profilePictureAutoTagging } from '@/ai/flows/profile-picture-auto-tagging';
import type { ProfilePictureAutoTaggingInput, ProfilePictureAutoTaggingOutput } from '@/ai/flows/profile-picture-auto-tagging';

import { populateProfileFromLinkedIn } from '@/ai/flows/linkedin-profile-populator';
import type { PopulateProfileFromLinkedInInput, PopulateProfileFromLinkedInOutput } from '@/ai/flows/linkedin-profile-populator';

import { smartSearch } from '@/ai/flows/smart-search';
import type { SmartSearchInput, SmartSearchOutput } from '@/ai/flows/smart-search';

async function getDb() {
    const { firestore } = await getFirebaseAdmin();
    return firestore;
}

/**
 * AI Actions
 */
export async function getFinancialBreakdown(input: FinancialBreakdownInput): Promise<FinancialBreakdownOutput> {
    return financialBreakdown(input);
}

export async function getProfilePictureTags(input: ProfilePictureAutoTaggingInput): Promise<ProfilePictureAutoTaggingOutput> {
    return profilePictureAutoTagging(input);
}

export async function getProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput): Promise<PopulateProfileFromLinkedInOutput> {
    return populateProfileFromLinkedIn(input);
}

/**
 * Messaging Action
 * Fixes the "Export sendMessage doesn't exist" error in messages/client.tsx
 */
export async function sendMessage(chatId: string, content: string) {
    const db = await getDb();
    try {
        const messageRef = db.collection('chats').doc(chatId).collection('messages').doc();
        await messageRef.set({
            content,
            timestamp: new Date().toISOString(),
            senderId: 'system', // Replace with actual auth logic in production
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Optimized Search for 2026:
 * Uses .select() to reduce payload size sent to Genkit
 */
export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const db = await getDb();
    
    const [startupsSnapshot, usersSnapshot] = await Promise.all([
        db.collection('startups').select('companyName', 'industry', 'description').get(),
        db.collection('users').select('name', 'role', 'profile.objectives').get()
    ]);

    const startupsData = startupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const searchableData = JSON.stringify({ startups: startupsData, users: usersData });
    
    const result = await smartSearch({ query, searchableData });

    const [finalStartups, finalUsers] = await Promise.all([
        fetchStartupsByIds(result.startupIds),
        getUsersByIds(result.userIds)
    ]);

    return { startups: finalStartups, users: finalUsers };
}

/**
 * Utility: Fetch Startups by IDs with 30-item chunking
 */
async function fetchStartupsByIds(ids: string[]): Promise<Startup[]> {
    if (!ids || ids.length === 0) return [];
    const db = await getDb();
    const chunks = [];
    for (let i = 0; i < ids.length; i += 30) chunks.push(ids.slice(i, i + 30));

    const results = await Promise.all(
        chunks.map(chunk => db.collection('startups').where('id', 'in', chunk).get())
    );

    return results.flatMap(snap =>
        snap.docs.map(doc => toSerializable({ id: doc.id, ...doc.data() }) as Startup)
    );
}

export async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    if (!ids || ids.length === 0) return [];
    const db = await getDb();
    try {
        const chunks = [];
        for (let i = 0; i < ids.length; i += 30) chunks.push(ids.slice(i, i + 30));

        const results = await Promise.all(
            chunks.map(chunk => db.collection('users').where('id', 'in', chunk).get())
        );

        return results.flatMap(snap =>
            snap.docs.map(doc => toSerializable({ id: doc.id, ...doc.data() }) as FullUserProfile)
        );
    } catch (error) {
        console.error("Error in getUsersByIds:", error);
        return [];
    }
}

export async function getStartupById(id: string): Promise<Startup | null> {
    const db = await getDb();
    try {
        const doc = await db.collection('startups').doc(id).get();
        if (!doc.exists) return null;
        return toSerializable({ id: doc.id, ...doc.data() }) as Startup;
    } catch (error) {
        console.error("Error in getStartupById:", error);
        return null;
    }
}

export async function updateUserProfile(userId: string, profileData: Partial<Profile>): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.set({ profile: profileData }, { merge: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateStartupData(startupId: string, startupData: Partial<Startup>): Promise<{ success: boolean; error?: string }> {
    const db = await getDb();
    try {
        const startupRef = db.collection('startups').doc(startupId);
        await startupRef.update(startupData);
        return { success: true };
    } catch (error: any) {
        console.error('Error updating startup data:', error);
        return { success: false, error: error.message };
    }
}
