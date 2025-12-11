'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { initializeAdminApp } from './firebase-server-init';
// FIX 1: Added 'TalentProfile' to the imports list
import { FullUserProfile, FounderProfile, UserRole, Profile, TalentSubRole, Startup, InvestorProfile, TalentProfile } from './types';
import { FieldValue } from 'firebase-admin/firestore';
import { toSerializable } from '@/lib/serialize';

async function createSessionCookie(idToken: string) {
    const { auth: adminAuth } = await initializeAdminApp();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    // FIX 2: Added 'await' before cookies()
    (await cookies()).set('__session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
}

export async function login(idToken: string):Promise<{success: boolean, error?: string}> {
  try {
    await createSessionCookie(idToken);
    return { success: true };
  } catch(error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
    // FIX 3: Added 'await' before cookies()
    (await cookies()).set('__session', '', { maxAge: 0, path: '/' });
}

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const { firestore } = await initializeAdminApp();
  const uid = await getCurrentUserId();
  
  if (!uid) {
    return null;
  }
  
  const userDoc = await firestore.collection('users').doc(uid).get();

  if (!userDoc.exists) {
    return null;
  }

  return toSerializable(userDoc.data()) as FullUserProfile;
}

export async function getCurrentUserId(): Promise<string | null> {
    const { auth } = await initializeAdminApp();
    // FIX 4: Added 'await' before cookies()
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session');

    if (!sessionCookie) {
        return null;
    }
    
    try {
        const decodedToken = await auth.verifySessionCookie(sessionCookie.value, true);
        return decodedToken.uid;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}

async function uploadImage(dataUrl: string, path: string): Promise<string> {
    if (!dataUrl) return "";
    
    const { storage } = await initializeAdminApp();
    const bucket = storage.bucket();
    const file = bucket.file(path);
    
    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    const mimeType = dataUrl.match(/data:(.*);base64/)?.[1] || 'image/jpeg';
    
    await file.save(buffer, {
        metadata: { contentType: mimeType },
    });
    await file.makePublic();
    return file.publicUrl();
}

export async function createUserAndSetSession(
    idToken: string,
    name: string,
    role: UserRole,
    profileData: any,
    subRole?: TalentSubRole,
    avatarDataUrl?: string,
    logoDataUrl?: string,
) {
    const { auth, firestore } = await initializeAdminApp();
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email!;

        // FIX 5: Corrected template literal string interpolation from {uid} to ${uid}
        let avatarUrl = `picsum.photos{uid}/400/400`;
        if (avatarDataUrl) {
            avatarUrl = await uploadImage(avatarDataUrl, `avatars/${uid}`);
        }
        
        await auth.updateUser(uid, { photoURL: avatarUrl, displayName: name });

        const userDocRef = firestore.collection("users").doc(uid);

        const userData: Omit<FullUserProfile, 'profile'> = {
            id: uid,
            email,
            name,
            role,
            avatarUrl,
        };
        
        let finalProfile: Profile = {};

        if (role === 'founder') {
            const startupRef = firestore.collection('startups').doc();
            // FIX 6: Corrected template literal string interpolation from {startupRef.id} to ${startupRef.id}
            let companyLogoUrl = `picsum.photos{startupRef.id}/200/200`;
            if (logoDataUrl) {
                companyLogoUrl = await uploadImage(logoDataUrl, `logos/${startupRef.id}`);
            }

            const startupData: Startup = {
                id: startupRef.id,
                companyName: profileData.companyName,
                companyLogoUrl,
                founderIds: [uid],
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
                objectives: profileData.objectives || [],
            } as FounderProfile;

        } else if (role === 'investor') {
            finalProfile = {
                companyName: profileData.companyName,
                companyUrl: profileData.companyUrl,
                investorType: profileData.investorType,
                about: profileData.about,
                investmentInterests: profileData.investmentInterests,
                investmentStages: profileData.investmentStages,
                portfolio: [],
                exits: profileData.exits,
            } as InvestorProfile;
        } else if (role === 'talent') {
            finalProfile = {
                subRole,
                headline: profileData.headline,
                skills: profileData.skills,
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
        
        await createSessionCookie(idToken);

        return { success: true, userId: uid };
    } catch (error: any) {
        console.error("Error creating user:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteCurrentUserAccount(userId: string, role: UserRole, companyId?: string) {
    const { auth, firestore } = await initializeAdminApp();
    try {
        await firestore.collection("users").doc(userId).delete();
        if (role === 'founder' && companyId) {
            await firestore.collection("startups").doc(companyId).delete();
        }
        await auth.deleteUser(userId);
        await logout();

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
