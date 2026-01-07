
'use server';

import 'server-only';
import { initializeAdminApp } from '@/lib/firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import {
    FullUserProfile, Startup, Profile, Message,
    FinancialData,
    FounderProfile,
    InvestorProfile,
    TalentProfile,
    MonthlyFinancials,
    CapTableEntry,
    FounderObjective,
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


export async function getUserById(userId: string): Promise<FullUserProfile | null> {
  if (!userId) return null;
  const { firestore } = await initializeAdminApp();
  const userDoc = await firestore.collection('users').doc(userId).get();
  if (userDoc.exists) {
    return toSerializable(userDoc.data()) as FullUserProfile;
  }
  return null;
}

export async function getUsersByIds(userIds: string[]): Promise<FullUserProfile[]> {
    if (!userIds || userIds.length === 0) {
        return [];
    }
    const { firestore } = await initializeAdminApp();
    const uniqueIds = [...new Set(userIds)];
    
    if (uniqueIds.length === 0) {
        return [];
    }
    
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

export async function getStartupById(startupId: string): Promise<Startup | null> {
    if (!startupId) return null;
    const { firestore } = await initializeAdminApp();
    const startupDoc = await firestore.collection('startups').doc(startupId).get();
    if (startupDoc.exists) {
        return toSerializable(startupDoc.data()) as Startup;
    }
    return null;
}

export async function updateUserProfile(userId: string, data: Partial<Profile>) {
    const { firestore } = await initializeAdminApp();
    try {
        const userRef = firestore.collection("users").doc(userId);
        const existingDoc = await userRef.get();
        if (!existingDoc.exists) {
            throw new Error("User not found");
        }
        const existingProfile = existingDoc.data()?.profile || {};

        await userRef.update({ profile: { ...existingProfile, ...data } });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating user profile:", error);
        return { success: false, error: error.message || "Failed to update profile." };
    }
}

export async function updateStartupData(startupId: string, data: Partial<Startup>) {
    const { firestore } = await initializeAdminApp();
    try {
        const startupRef = firestore.collection("startups").doc(startupId);
        await startupRef.update(data);
        return { success: true };
    } catch (error: any) {
        console.error("Error updating startup data:", error);
        return { success: false, error: error.message || "Failed to update startup data." };
    }
}

export async function sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) {
    const { firestore } = await initializeAdminApp();
    try {
        const convoRef = firestore.collection('conversations').doc(conversationId);
        const newMessage: Message = {
            ...message,
            id: firestore.collection('tmp').doc().id,
            timestamp: new Date().toISOString(),
        }
        await convoRef.update({
            messages: FieldValue.arrayUnion(newMessage)
        });
        return { success: true, message: newMessage };
    } catch (error: any) {
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
}

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

export async function getSearchResults(queryText: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const { firestore } = await initializeAdminApp();
    if (!queryText) {
        return { startups: [], users: [] };
    }
    const usersCollection = await firestore.collection('users').get();
    const allUsers = usersCollection.docs.map((doc) => toSerializable(doc.data()) as FullUserProfile);
    const startupsCollection = await firestore.collection('startups').get();
    const allStartups = startupsCollection.docs.map((doc) => toSerializable(doc.data()) as Startup);
    
    const searchableData = JSON.stringify({
        users: allUsers.map(u => ({
            id: u.id,
            name: u.name,
            role: u.role,
            profile: u.profile,
            objectives: (u.profile as FounderProfile).objectives || []
        })),
        startups: allStartups.map(s => ({
            id: s.id,
            companyName: s.companyName,
            industry: s.industry,
            stage: s.stage,
            tagline: s.tagline,
            description: s.description,
            fundraisingGoal: s.fundraisingGoal,
            founderObjectives: allUsers.find(u => u.id === s.founderIds[0]) ? ((allUsers.find(u => u.id === s.founderIds[0])!.profile as FounderProfile).objectives || []) : []
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
