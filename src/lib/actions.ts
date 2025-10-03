
"use server";

import { summarizeFinancialData, FinancialDataInput } from "@/ai/flows/financial-data-summary";
import { profilePictureAutoTagging } from "@/ai/flows/profile-picture-auto-tagging";
import { smartMatch } from "@/ai/flows/smart-matching";
import { populateProfileFromLinkedIn } from "@/ai/flows/linkedin-profile-populator";
import { financialBreakdown } from "@/ai/flows/financial-breakdown";
import { smartSearch } from "@/ai/flows/smart-search";
import { FullUserProfile, FounderProfile, TalentProfile, Startup, Profile, UserRole, TalentSubRole, InvestorProfile } from "./types";
import { initializeFirebase } from '@/firebase';
import { collection, getDocs, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export async function getFinancialSummary(input: FinancialDataInput) {
  try {
    const result = await summarizeFinancialData(input);
    return result.summary;
  } catch (error) {
    console.error(error);
    return "Error generating summary. Please try again.";
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
    const { firestore } = initializeFirebase();
    const startupsCollection = await getDocs(collection(firestore, 'startups'));
    const allStartups = startupsCollection.docs.map(doc => doc.data() as Startup);
    const usersCollection = await getDocs(collection(firestore, 'users'));
    const allUsers = usersCollection.docs.map(doc => doc.data() as FullUserProfile);

    let userProfileDesc = `User is a ${user.role}. Name: ${user.name}. `;
    if (user.role === 'founder') {
        const founderProfile = user.profile as FounderProfile;
        const startup = allStartups.find(s => s.id === founderProfile.companyId);
        if (startup) {
            userProfileDesc += `Founder of ${startup.companyName}, in the ${startup.industry} industry. Stage: ${startup.stage}. Tagline: ${startup.tagline}. Description: ${startup.description}`;
        }
    } else if (user.role === 'investor' && 'investmentInterests' in user.profile) {
        const investorProfile = user.profile as InvestorProfile;
        userProfileDesc += `Investor with interests in ${investorProfile.investmentInterests.join(', ')}. Thesis: ${investorProfile.thesis}`;
    } else if (user.role === 'talent' && 'skills' in user.profile) {
        const talentProfile = user.profile as TalentProfile;
        userProfileDesc += `Talent with skills in ${talentProfile.skills?.join(', ')}. Experience: ${talentProfile.experience}`;
    }

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
    console.error("Error in getProfileFromLinkedIn:", error);
    throw new Error("Failed to get profile from LinkedIn.");
  }
}

export async function getFinancialBreakdown(metric: string) {
  try {
    const result = await financialBreakdown({ metric });
    return result.breakdown;
  } catch (error) {
    console.error("Error in getFinancialBreakdown:", error);
    return "Could not generate breakdown. Please try again.";
  }
}

export async function getSearchResults(query: string) {
    const { firestore } = initializeFirebase();
    if (!query) {
        return { startups: [], users: [] };
    }
    
    const startupsCollection = await getDocs(collection(firestore, 'startups'));
    const allStartups = startupsCollection.docs.map(doc => doc.data() as Startup);
    const usersCollection = await getDocs(collection(firestore, 'users'));
    const allUsers = usersCollection.docs.map(doc => doc.data() as FullUserProfile);

    try {
        const searchableData = JSON.stringify({ startups: allStartups, users: allUsers });
        const { startupIds, userIds } = await smartSearch({ query, searchableData });
        const filteredStartups = allStartups.filter(s => startupIds.includes(s.id));
        const filteredUsers = allUsers.filter(u => userIds.includes(u.id));
        return { startups: filteredStartups, users: filteredUsers };
    } catch (error) {
        console.error("Error performing smart search:", error);
        const lowerCaseQuery = query.toLowerCase();
        const filteredStartups = allStartups.filter(startup =>
            Object.values(startup).some(val =>
                String(val).toLowerCase().includes(lowerCaseQuery)
            )
        );
        const filteredUsers = allUsers.filter(user =>
            Object.values(user).some(val =>
                String(val).toLowerCase().includes(lowerCaseQuery)
            )
        );
        return { startups: filteredStartups, users: filteredUsers };
    }
}

async function uploadImage(dataUrl: string, path: string): Promise<string> {
    const { storage } = initializeFirebase();
    if (!dataUrl) return "";
    const storageRef = ref(storage, path);
    const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
    return getDownloadURL(snapshot.ref);
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
    const { auth, firestore } = initializeFirebase();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await sendEmailVerification(user);
        
        let avatarUrl = "";
        if (avatarFile) {
            avatarUrl = await uploadImage(avatarFile, `avatars/${user.uid}`);
        }

        await updateProfile(user, { displayName: name, photoURL: avatarUrl });

        const userData: FullUserProfile = {
            id: user.uid,
            email,
            name,
            role,
            avatarUrl,
            profile: {}
        };
        
        if (role === 'founder') {
            const startupRef = doc(collection(firestore, 'startups'));
            const startupId = startupRef.id;
            let companyLogoUrl = "";
            if (logoFile) {
                companyLogoUrl = await uploadImage(logoFile, `logos/${startupId}`);
            }

            userData.profile = {
                companyId: startupId,
                title: profileData.title,
                isLead: true,
                isPremium: false,
                isSeekingCoFounder: profileData.isSeekingCoFounder,
            } as FounderProfile;

            const startupData: Startup = {
                id: startupId,
                companyName: profileData.companyName,
                companyLogoUrl,
                founderIds: [user.uid],
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
            await setDoc(startupRef, startupData);

        } else if (role === 'investor') {
            userData.profile = {
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
            userData.profile = {
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
        
        await setDoc(doc(firestore, "users", user.uid), userData);

        return { success: true, userId: user.uid };
    } catch (error: any) {
        console.error("Error creating user:", error);
        return { success: false, error: error.message };
    }
}

export async function updateUserProfile(userId: string, data: Partial<Profile>) {
    const { firestore } = initializeFirebase();
    try {
        const userRef = doc(firestore, "users", userId);
        const existingDoc = await getDoc(userRef);
        if (!existingDoc.exists()) {
            throw new Error("User not found");
        }
        const existingProfile = existingDoc.data().profile || {};

        await updateDoc(userRef, { profile: { ...existingProfile, ...data } });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating user profile:", error);
        return { success: false, error: error.message || "Failed to update profile." };
    }
}

    
