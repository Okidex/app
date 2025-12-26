'use server';

import 'server-only';
import { initializeAdminApp } from '@/lib/firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import {
    FullUserProfile, Startup, Profile, Message,
    FounderProfile,
} from './types';
import {
  summarizeFinancialData,
  FinancialDataInput,
  FinancialDataOutput,
} from '@/ai/flows/financial-data-summary';
import {
  profilePictureAutoTagging,
  ProfilePictureAutoTaggingInput,
  ProfilePictureAutoTaggingOutput,
} from '@/ai/flows/profile-picture-auto-tagging';
import {
  populateProfileFromLinkedIn,
  PopulateProfileFromLinkedInInput,
  PopulateProfileFromLinkedInOutput,
} from '@/ai/flows/linkedin-profile-populator';
import {
  financialBreakdown,
  FinancialBreakdownInput,
  FinancialBreakdownOutput,
} from '@/ai/flows/financial-breakdown';
import {
  smartSearch,
} from '@/ai/flows/smart-search';
import { toSerializable } from './serialize';

// --- User Actions ---

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
  if (!userId) return null;
  const { firestore } = initializeAdminApp(); // Removed 'await'
  const userDoc = await firestore.collection('users').doc(userId).get();
  if (userDoc.exists) {
    return toSerializable(userDoc.data()) as FullUserProfile;
  }
  return null;
}

export async function getUsersByIds(userIds: string[]): Promise<FullUserProfile[]> {
    if (!userIds || userIds.length === 0) return [];
    
    const { firestore } = initializeAdminApp(); // Removed 'await'
    const uniqueIds = [...new Set(userIds)].filter(Boolean);
    
    if (uniqueIds.length === 0) return [];
    
    // Firestore 'in' queries are limited to 30 elements per chunk
    const chunks: string[][] = [];
    for (let i = 0; i < uniqueIds.length; i += 30) {
        chunks.push(uniqueIds.slice(i, i + 30));
    }

    const userPromises = chunks.map(chunk =>
        firestore.collection('users').where('id', 'in', chunk).get()
    );

    const userSnapshots = await Promise.all(userPromises);
    const users: FullUserProfile[] = [];
    userSnapshots.forEach(snap => {
        snap.forEach(doc => users.push(toSerializable(doc.data()) as FullUserProfile));
    });

    return users;
}

export async function updateUserProfile(userId: string, data: Partial<Profile>) {
    const { firestore } = initializeAdminApp(); // Removed 'await'
    try {
        const userRef = firestore.collection("users").doc(userId);
        const existingDoc = await userRef.get();
        if (!existingDoc.exists) {
            throw new Error("User not found");
        }
        const existingData = existingDoc.data();
        const existingProfile = existingData?.profile || {};

        await userRef.update({
            profile: { ...existingProfile, ...data },
            updatedAt: FieldValue.serverTimestamp() // 2025 Audit Tracking
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating user profile:", error);
        return { success: false, error: error.message || "Failed to update profile." };
    }
}

// --- Startup Actions ---

export async function getStartupById(startupId: string): Promise<Startup | null> {
    if (!startupId) return null;
    const { firestore } = initializeAdminApp();
    const startupDoc = await firestore.collection('startups').doc(startupId).get();
    if (startupDoc.exists) {
        return toSerializable(startupDoc.data()) as Startup;
    }
    return null;
}

// --- Messaging Actions ---

export async function sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) {
    const { firestore } = initializeAdminApp();
    try {
        const convoRef = firestore.collection('conversations').doc(conversationId);
        const newMessage: Message = {
            ...message,
            id: firestore.collection('tmp').doc().id,
            timestamp: new Date().toISOString(),
        }
        await convoRef.update({
            messages: FieldValue.arrayUnion(newMessage),
            lastMessageAt: FieldValue.serverTimestamp()
        });
        return { success: true, message: newMessage };
    } catch (error: any) {
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
}

// --- AI Flow Actions ---

export async function getFinancialSummary(input: FinancialDataInput): Promise<FinancialDataOutput> {
    return await summarizeFinancialData(input);
}
export async function getProfilePictureTags(input: ProfilePictureAutoTaggingInput): Promise<ProfilePictureAutoTaggingOutput> {
    return await profilePictureAutoTagging(input);
}
export async function getProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput): Promise<PopulateProfileFromLinkedInOutput> {
    return await populateProfileFromLinkedIn(input);
}
export async function getFinancialBreakdown(input: FinancialBreakdownInput): Promise<FinancialBreakdownOutput> {
    return await financialBreakdown(input);
}

// --- Search Actions ---

export async function getSearchResults(queryText: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const { firestore } = initializeAdminApp();
    if (!queryText) return { startups: [], users: [] };

    // Fetch initial datasets
    const [usersSnap, startupsSnap] = await Promise.all([
        firestore.collection('users').limit(100).get(), // Added limits for 2025 performance
        firestore.collection('startups').limit(100).get()
    ]);

    const allUsers = usersSnap.docs.map((doc) => toSerializable(doc.data()) as FullUserProfile);
    const allStartups = startupsSnap.docs.map((doc) => toSerializable(doc.data()) as Startup);
    
    const searchableData = JSON.stringify({
        users: allUsers.map(u => ({
            id: u.id,
            name: u.name,
            role: u.role,
            profile: u.profile,
            objectives: (u.profile as FounderProfile)?.objectives || []
        })),
        startups: allStartups.map(s => ({
            id: s.id,
            companyName: s.companyName,
            industry: s.industry,
            stage: s.stage,
            tagline: s.tagline,
            description: s.description,
            fundraisingGoal: s.fundraisingGoal,
            founderObjectives: allUsers.find(u => u.id === s.founderIds[0])
                ? ((allUsers.find(u => u.id === s.founderIds[0])!.profile as FounderProfile)?.objectives || [])
                : []
        }))
    });

    try {
        const result = await smartSearch({query: queryText, searchableData});
        const filteredStartups = allStartups.filter(s => result.startupIds.includes(s.id));
        const filteredUsers = allUsers.filter(u => result.userIds.includes(u.id));
        return { startups: filteredStartups, users: filteredUsers };
    } catch (error) {
        console.error("Error performing smart search:", error);
        return { startups: [], users: [] };
    }
}
