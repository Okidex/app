'use server';

import { FullUserProfile, Startup, Profile, UserRole, FounderProfile, InvestorProfile, TalentProfile, TalentSubRole } from './types';
import { initializeAdminApp } from './firebase-admin';

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

        let avatarUrl = "";
        if (avatarFile) {
            // In a real app, this would upload to a storage service and return the URL
            avatarUrl = `https://firebasestorage.googleapis.com/v0/b/okidex-investment-match.appspot.com/o/avatars%2F${userRecord.uid}?alt=media`;
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
            let companyLogoUrl = "";
            if (logoFile) {
                // In a real app, this would upload to a storage service and return the URL
                companyLogoUrl = `https://firebasestorage.googleapis.com/v0/b/okidex-investment-match.appspot.com/o/logos%2F${startupRef.id}?alt=media`;
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
                investmentInterests: (profileData.investmentInterests || '').split(',').map((s: string) => s.trim()),
                investmentStages: profileData.investmentStages,
                portfolio: [],
                exits: profileData.exits,
            } as InvestorProfile;
        } else if (role === 'talent') {
            finalProfile = {
                subRole,
                headline: profileData.headline,
                skills: (profileData.skills || '').split(',').map((s: string) => s.trim()),
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

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const { firestore, auth } = initializeAdminApp();
  // This is a placeholder. In a real app, you'd get the UID from a verified session token.
  // For now, we'll fetch the first user as a substitute for a logged-in user context on the server.
  const usersList = await auth.listUsers(1);
  if (usersList.users.length === 0) return null;
  const uid = usersList.users[0].uid;

  const userDoc = await firestore.collection('users').doc(uid).get();
  if (userDoc.exists) {
    return userDoc.data() as FullUserProfile;
  }
  return null;
}

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
  const { firestore } = initializeAdminApp();
  const userDoc = await firestore.collection('users').doc(userId).get();
  if (userDoc.exists) {
    return userDoc.data() as FullUserProfile;
  }
  return null;
}
