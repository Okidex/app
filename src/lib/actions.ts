
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
    Job,
    InvestmentThesis,
} from './types';
import {
  summarizeFinancialData,
  FinancialDataInput,
} from '@/ai/flows/financial-data-summary';
import {
  profilePictureAutoTagging,
  ProfilePictureAutoTaggingInput,
} from '@/ai/flows/profile-picture-auto-tagging';
import {
  populateProfileFromLinkedIn,
  PopulateProfileFromLinkedInInput,
} from '@/ai/flows/linkedin-profile-populator';
import {
  financialBreakdown,
  FinancialBreakdownInput,
} from '@/ai/flows/financial-breakdown';
import {
  smartSearch,
} from '@/ai/flows/smart-search';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
  if (!userId) return null;
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
    const uniqueIds = [...new Set(userIds)];
    const snapshot = await firestore.collection('users').where('id', 'in', uniqueIds).get();
    return snapshot.docs.map(doc => doc.data() as FullUserProfile);
}

export async function getStartupById(startupId: string): Promise<Startup | null> {
    if (!startupId) return null;
    const { firestore } = initializeAdminApp();
    const startupDoc = await firestore.collection('startups').doc(startupId).get();
    if (startupDoc.exists) {
        return startupDoc.data() as Startup;
    }
    return null;
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

export async function getFinancialSummary(input: FinancialDataInput) {
    return await summarizeFinancialData(input);
}
export async function getProfilePictureTags(input: ProfilePictureAutoTaggingInput) {
    return await profilePictureAutoTagging(input);
}
export async function getProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput) {
    return await populateProfileFromLinkedIn(input);
}
export async function getFinancialBreakdown(input: FinancialBreakdownInput) {
    return await financialBreakdown(input);
}

export async function getSearchResults(queryText: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const { firestore } = initializeAdminApp();
    if (!queryText) {
        return { startups: [], users: [] };
    }
    const usersCollection = await firestore.collection('users').get();
    const allUsers = usersCollection.docs.map((doc) => doc.data() as FullUserProfile);
    const startupsCollection = await firestore.collection('startups').get();
    const allStartups = startupsCollection.docs.map((doc) => doc.data() as Startup);
    
    const searchableData = JSON.stringify({
        users: allUsers.map(u => ({id: u.id, name: u.name, role: u.role, profile: u.profile})),
        startups: allStartups.map(s => ({id: s.id, companyName: s.companyName, industry: s.industry, stage: s.stage, tagline: s.tagline, description: s.description}))
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

export async function getDashboardData(currentUser: FullUserProfile) {
    const { firestore } = initializeAdminApp();
    let data: any = {};

    if (currentUser.role === 'founder') {
        const q = query(collection(firestore, "users"), where("role", "!=", "founder"), limit(3));
        const querySnapshot = await getDocs(q);
        data.matches = querySnapshot.docs.map(doc => doc.data());
    }

    if (currentUser.role === 'investor') {
        const thesesQuery = query(collection(firestore, "theses"), where("investorId", "==", currentUser.id));
        const myThesesSnap = await getDocs(thesesQuery);
        const myTheses = myThesesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestmentThesis));
        data.myThesesCount = myTheses.length;

        const myJobsQuery = query(collection(firestore, "jobs"), where("founderId", "==", currentUser.id));
        const myJobsSnap = await getDocs(myJobsQuery);
        const myJobs = myJobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));

        if (myTheses.length > 0) {
            const thesisInterestsQuery = query(collection(firestore, "interests"), where("targetType", "==", "thesis"), where("targetId", "in", myTheses.map(t => t.id)));
            const thesisInterestsSnap = await getDocs(thesisInterestsQuery);
            data.thesisInterestsCount = thesisInterestsSnap.size;
        } else {
            data.thesisInterestsCount = 0;
        }

        if (myJobs.length > 0) {
            const jobInterestsQuery = query(collection(firestore, "interests"), where("targetType", "==", "job"), where("targetId", "in", myJobs.map(j => j.id)));
            const jobInterestsSnap = await getDocs(jobInterestsQuery);
            data.jobInterestsCount = jobInterestsSnap.size;
        } else {
             data.jobInterestsCount = 0;
        }
    }

    if (currentUser.role === 'talent') {
        const jobsQuery = query(collection(firestore, "jobs"), limit(3));
        const jobsSnapshot = await getDocs(jobsQuery);
        data.recommendedJobs = jobsSnapshot.docs.map(doc => doc.data() as Job);
    }

    return data;
}

