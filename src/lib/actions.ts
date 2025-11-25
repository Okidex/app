
'use server';

import {
  summarizeFinancialData,
  FinancialDataInput,
} from '@/ai/flows/financial-data-summary';
import { profilePictureAutoTagging } from '@/ai/flows/profile-picture-auto-tagging';
import { smartMatch } from '@/ai/flows/smart-matching';
import { populateProfileFromLinkedIn } from '@/ai/flows/linkedin-profile-populator';
import { financialBreakdown } from '@/ai/flows/financial-breakdown';
import { smartSearch } from '@/ai/flows/smart-search';
import { FullUserProfile, Startup, Profile, UserRole, FounderProfile, InvestorProfile, TalentProfile, TalentSubRole, Message } from './types';
import { initializeAdminApp } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const { firestore, auth } = initializeAdminApp();
  // In a real app, you would get the UID from the session.
  // For this prototype, we will fetch the first user as a placeholder.
  // THIS IS NOT SECURE FOR PRODUCTION.
  const usersCollection = await firestore.collection('users').limit(1).get();
  if (usersCollection.empty) {
    return null;
  }
  return usersCollection.docs[0].data() as FullUserProfile;
}

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
  const { firestore } = initializeAdminApp();
  const userDoc = await firestore.collection('users').doc(userId).get();
  if (userDoc.exists) {
    return userDoc.data() as FullUserProfile;
  }
  return null;
}

export async function getFinancialSummary(input: FinancialDataInput) {
  try {
    const result = await summarizeFinancialData(input);
    return result.summary;
  } catch (error) {
    console.error(error);
    return 'Error generating summary. Please try again.';
  }
}

export async function getProfilePictureTags(photoDataUri: string) {
  try {
    const result = await profilePictureAutoTagging({ photoDataUri });
    return result.tags;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSmartMatches(user: FullUserProfile) {
  const { firestore } = initializeAdminApp();
  const startupsCollection = await firestore.collection('startups').get();
  const allStartups = startupsCollection.docs.map((doc) => doc.data() as Startup);

  let userProfileDesc = `User is a ${user.role}. Name: ${user.name}. `;
  // Profile specific descriptions can be added here based on user.profile

  try {
    const result = await smartMatch({ startupProfile: userProfileDesc });
    return result;
  } catch (error) {
    console.error(error);
    return { investorMatches: [], talentMatches: [] };
  }
}

export async function getProfileFromLinkedIn(linkedinUrl: string) {
  try {
    const result = await populateProfileFromLinkedIn({ linkedinUrl });
    return result;
  } catch (error) {
    console.error('Error in getProfileFromLinkedIn:', error);
    throw new Error('Failed to get profile from LinkedIn.');
  }
}

export async function getFinancialBreakdown(metric: string) {
  try {
    const result = await financialBreakdown({ metric });
    return result.breakdown;
  } catch (error) {
    console.error('Error in getFinancialBreakdown:', error);
    return 'Could not generate breakdown. Please try again.';
  }
}

export async function getSearchResults(query: string) {
  if (!query) {
    return { startups: [], users: [] };
  }

  const { firestore } = initializeAdminApp();
  const startupsCollection = await firestore.collection('startups').get();
  const allStartups = startupsCollection.docs.map((doc) => doc.data() as Startup);
  const usersCollection = await firestore.collection('users').get();
  const allUsers = usersCollection.docs.map((doc) => doc.data() as FullUserProfile);

  try {
    const searchableData = JSON.stringify({
      startups: allStartups,
      users: allUsers,
    });
    const { startupIds, userIds } = await smartSearch({ query, searchableData });
    const filteredStartups = allStartups.filter((s) => startupIds.includes(s.id));
    const filteredUsers = allUsers.filter((u) => userIds.includes(u.id));
    return { startups: filteredStartups, users: filteredUsers };
  } catch (error) {
    console.error('Error performing smart search:', error);
    // Fallback to basic text search
    const lowerCaseQuery = query.toLowerCase();
    const filteredStartups = allStartups.filter((startup) =>
      Object.values(startup).some((val) =>
        String(val).toLowerCase().includes(lowerCaseQuery)
      )
    );
    const filteredUsers = allUsers.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(lowerCaseQuery)
      )
    );
    return { startups: filteredStartups, users: filteredUsers };
  }
}

async function uploadImage(dataUrl: string, path: string): Promise<string> {
    const { storage } = initializeAdminApp();
    if (!dataUrl) return "";
    
    const bucket = storage.bucket();
    const file = bucket.file(path);
    
    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    const mimeType = dataUrl.match(/data:(.*);base64/)?.[1] || 'image/jpeg';
    
    await file.save(buffer, {
        metadata: { contentType: mimeType },
        public: true,
    });
    return file.publicUrl();
}

export async function createUserAndProfile(
    email: string,
    password:  string,
    name: string,
    role: UserRole,
    profileData: any,
    subRole?: TalentSubRole,
    avatarFile?: string,
    logoFile?: string,
) {
    const { auth, firestore } = initializeAdminApp();
    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
        });

        let avatarUrl = `https://picsum.photos/seed/${userRecord.uid}/400/400`;
        if (avatarFile) {
            avatarUrl = await uploadImage(avatarFile, `avatars/${userRecord.uid}`);
        }
        
        await auth.updateUser(userRecord.uid, { photoURL: avatarUrl });

        const userDocRef = firestore.collection("users").doc(userRecord.uid);

        const userData: Omit<FullUserProfile, 'profile'> = {
            id: userRecord.uid,
            email,
            name,
            role,
            avatarUrl,
        };
        
        let finalProfile: Profile = {};

        if (role === 'founder') {
            const startupRef = firestore.collection('startups').doc();
            let companyLogoUrl = `https://picsum.photos/seed/logo-${startupRef.id}/200/200`;
            if (logoFile) {
                companyLogoUrl = await uploadImage(logoFile, `logos/${startupRef.id}`);
            }

            const startupData: Startup = {
                id: startupRef.id,
                companyName: profileData.companyName,
                companyLogoUrl,
                founderIds: [userRecord.uid],
                industry: profileData.industry,
                stage: profileData.stage,
                tagline: profileData.tagline,
                website: profileData.website,
                description: profileData.description,
                financials: { revenue: 0, expenses: 0, netIncome: 0, grossProfitMargin: 0, ebitda: 0, customerAcquisitionCost: 0, customerLifetimeValue: 0, monthlyRecurringRevenue: 0, cashBurnRate: 0, runway: 0, companyName: profileData.companyName },
                monthlyFinancials: [],
                capTable: [],
                incorporationDetails: {
                    isIncorporated: profileData.isIncorporated,
                    country: profileData.country,
                    incorporationType: profileData.incorporationType,
                    incorporationDate: profileData.incorporationDate,
                    entityNumber: profileData.entityNumber,
                    taxId: profileData.taxId,
                }
            };
            await startupRef.set(startupData);
            
            finalProfile = {
                companyId: startupRef.id,
                title: profileData.title,
                isLead: true,
                isPremium: false,
                isSeekingCoFounder: profileData.isSeekingCoFounder,
            } as FounderProfile;

        } else if (role === 'investor') {
            finalProfile = {
                companyName: profileData.companyName,
                companyUrl: profileData.companyUrl,
                investorType: profileData.investorType,
                about: profileData.about,
                investmentInterests: profileData.investmentInterests.split(',').map((s: string) => s.trim()),
                investmentStages: profileData.investmentStages,
                portfolio: [],
                exits: profileData.exits,
            } as InvestorProfile;
        } else if (role === 'talent') {
            finalProfile = {
                subRole,
                headline: profileData.headline,
                skills: profileData.skills.split(',').map((s: string) => s.trim()),
                experience: profileData.experience,
                linkedin: profileData.linkedin,
                github: profileData.github,
                about: profileData.about,
                organization: profileData.organization,
                education: profileData.education,
                isSeekingCoFounder: subRole === 'co-founder',
            } as TalentProfile;
        }
        
        await userDocRef.set({ ...userData, profile: finalProfile });

        return { success: true, userId: userRecord.uid };
    } catch (error: any) {
        console.error("Error creating user:", error);
        return { success: false, error: error.message };
    }
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

export async function deleteCurrentUserAccount(userId: string, role: UserRole, companyId?: string) {
    const { auth, firestore } = initializeAdminApp();
    try {
        await firestore.collection("users").doc(userId).delete();
        if (role === 'founder' && companyId) {
            await firestore.collection("startups").doc(companyId).delete();
        }
        await auth.deleteUser(userId);

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting user account:", error);
        let errorMessage = "An unexpected error occurred.";
        if (error.code === 'auth/requires-recent-login') {
            errorMessage = "This is a sensitive operation and requires recent authentication. Please log in again before retrying.";
        } else {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
}

export async function sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) {
    const { firestore } = initializeAdminApp();
    try {
        const convoRef = firestore.collection('conversations').doc(conversationId);
        const newMessage: Message = {
            ...message,
            id: firestore.collection('tmp').doc().id, // Generate a client-side ID
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
