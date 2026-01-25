'use server';

import { getFirebaseAdmin } from './firebase-server-init';
import { toSerializable } from './serialize';
import type { FinancialBreakdownInput, FinancialBreakdownOutput } from '@/ai/flows/financial-breakdown';
import { financialBreakdown } from '@/ai/flows/financial-breakdown';
import { profilePictureAutoTagging, ProfilePictureAutoTaggingInput, ProfilePictureAutoTaggingOutput } from '@/ai/flows/profile-picture-auto-tagging';
import { populateProfileFromLinkedIn, PopulateProfileFromLinkedInInput, PopulateProfileFromLinkedInOutput } from '@/ai/flows/linkedin-profile-populator';
import { smartSearch, SmartSearchInput, SmartSearchOutput } from '@/ai/flows/smart-search';
import { FullUserProfile, Startup, Profile, Message } from './types';
import admin from 'firebase-admin';


async function getDb() {
    const { firestore } = await getFirebaseAdmin();
    return firestore;
}

export async function sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<{ success: boolean; error?: string }> {
    const db = await getDb();
    try {
        const conversationRef = db.collection('conversations').doc(conversationId);
        const newMessage: Message = {
            ...message,
            id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            timestamp: new Date().toISOString(),
        };

        await conversationRef.update({
            messages: admin.firestore.FieldValue.arrayUnion(newMessage)
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
}


export async function getFinancialBreakdown(input: FinancialBreakdownInput): Promise<FinancialBreakdownOutput> {
    return financialBreakdown(input);
}

export async function getProfilePictureTags(input: ProfilePictureAutoTaggingInput): Promise<ProfilePictureAutoTaggingOutput> {
    return profilePictureAutoTagging(input);
}

export async function getProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput): Promise<PopulateProfileFromLinkedInOutput> {
    return populateProfileFromLinkedIn(input);
}

export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const db = await getDb();
    
    const startupsSnapshot = await db.collection('startups').get();
    const startups = startupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));

    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FullUserProfile));

    const searchableData = JSON.stringify({ startups, users });
    const result = await smartSearch({ query, searchableData });

    const filteredStartups = startups.filter(s => result.startupIds.includes(s.id));
    const filteredUsers = users.filter(u => result.userIds.includes(u.id));

    return { startups: filteredStartups, users: filteredUsers };
}

export async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    if (!ids || ids.length === 0) return [];
    const db = await getDb();
    try {
        // Firestore 'in' queries are limited to 30 values.
        const chunks: string[][] = [];
        for (let i = 0; i < ids.length; i += 30) {
            chunks.push(ids.slice(i, i + 30));
        }

        const results = await Promise.all(
            chunks.map(chunk =>
                db.collection('users').where('id', 'in', chunk).get()
            )
        );

        const allDocs = results.flatMap(snap => snap.docs);
        return allDocs.map(doc => toSerializable({ id: doc.id, ...doc.data() }) as FullUserProfile);
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

export async function updateUser(userId: string, userData: Partial<FullUserProfile>): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.update(userData);
    return { success: true };
  } catch (error: any) {
    console.error(`Error updating user data for ${userId}:`, error);
    return { success: false, error: error.message };
  }
}

export async function updateUserProfile(userId: string, profileData: Partial<Profile>): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.set({
      profile: profileData
    }, { merge: true });
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
