'use server';

import 'server-only';
import { initializeAdminApp } from './firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import {
    FullUserProfile, Startup, Profile, Message,
    FinancialData,
    FounderProfile,
    InvestorProfile,
    TalentProfile,
} from './types';
import { ai } from '@/ai/genkit';
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
  SmartSearchInput,
  SmartSearchOutput,
} from '@/ai/flows/smart-search';
import { getCurrentUser } from './auth-actions';


export async function getUserById(userId: string): Promise<FullUserProfile | null> {
  const { firestore } = initializeAdminApp();
  const userDoc = await firestore.collection('users').doc(userId).get();
  if (userDoc.exists) {
    return userDoc.data() as FullUserProfile;
  }
  return null;
}

export async function getUsersByIds(userIds: string[]): Promise<FullUserProfile[]> {
    if (!userIds || userIds.length === 0) {
        return [];
    }
    const { firestore } = initializeAdminApp();
    const snapshot = await firestore.collection('users').where('id', 'in', userIds).get();
    return snapshot.docs.map(doc => doc.data() as FullUserProfile);
}

export async function updateUserProfile(userId: string, data: Partial<Profile>) {
    const { firestore } = initializeAdminApp();
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
            messages: FieldValue.arrayUnion(newMessage)
        });
        return { success: true, message: newMessage };
    } catch (error: any) {
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
}

export async function getMatchableUsers(): Promise<{ matches: FullUserProfile[], startups: Startup[] }> {
    const { firestore } = initializeAdminApp();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return { matches: [], startups: [] };
    }

    const usersSnap = await firestore.collection("users").get();
    const allUsers = usersSnap.docs.map(doc => doc.data() as FullUserProfile).filter(u => u.id !== currentUser.id);
    
    const startupsSnap = await firestore.collection("startups").get();
    const allStartups = startupsSnap.docs.map(doc => doc.data() as Startup);
    
    const getFilteredUsers = (): FullUserProfile[] => {
        switch (currentUser.role) {
            case 'investor':
                return allUsers.filter(u =>
                    u.role === 'investor' ||
                    u.role === 'talent' ||
                    (u.role === 'founder' && 'isPremium' in u.profile && u.profile.isPremium)
                );
            case 'founder':
                const founderProfile = currentUser.profile as FounderProfile;
                return allUsers.filter(u => {
                    if (u.role === 'talent') {
                        const talentProfile = u.profile as TalentProfile;
                        if (founderProfile.isSeekingCoFounder) {
                            return talentProfile.isSeekingCoFounder;
                        }
                        return !talentProfile.isSeekingCoFounder;
                    }
                    if (u.role === 'founder' && founderProfile.isSeekingCoFounder) {
                        const otherFounderProfile = u.profile as FounderProfile;
                        return otherFounderProfile.isSeekingCoFounder && otherFounderProfile.companyId !== founderProfile.companyId;
                    }
                    return false;
                }).filter(u => u.role !== 'founder' || allStartups.some(s => s.id === (u.profile as FounderProfile).companyId));
            case 'talent':
                const talentProfile = currentUser.profile as TalentProfile;
                return allUsers.filter(u => {
                    if (u.role === 'founder') {
                         const founderProfile = u.profile as FounderProfile;
                        if(talentProfile.isSeekingCoFounder) {
                            return founderProfile.isSeekingCoFounder;
                        }
                        return true;
                    }
                    if (u.role === 'talent' && talentProfile.isSeekingCoFounder) {
                        return 'isSeekingCoFounder' in u.profile && u.profile.isSeekingCoFounder;
                    }
                    return false;
                }).filter(u => u.role !== 'founder' || allStartups.some(s => s.id === (u.profile as FounderProfile).companyId));
            default:
                return [];
        }
    }
    
    return { matches: getFilteredUsers(), startups: allStartups };
}

// AI-related Server Actions

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
    const { firestore } = initializeAdminApp();
    if (!queryText) {
        return { startups: [], users: [] };
    }

    const lowerCaseQuery = queryText.toLowerCase();

    const startupsCollection = await firestore.collection('startups').get();
    const allStartups = startupsCollection.docs.map((doc) => doc.data() as Startup);
    const filteredStartups = allStartups.filter((startup) =>
        Object.values(startup).some((val) =>
            typeof val === 'string' && val.toLowerCase().includes(lowerCaseQuery)
        ) || startup.tagline.toLowerCase().includes(lowerCaseQuery)
          || startup.description.toLowerCase().includes(lowerCaseQuery)
    );

    const usersCollection = await firestore.collection('users').get();
    const allUsers = usersCollection.docs.map((doc) => doc.data() as FullUserProfile);
    const filteredUsers = allUsers.filter((user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.role.toLowerCase().includes(lowerCaseQuery)
    );

    return { startups: filteredStartups, users: filteredUsers };
}

