
'use server';

import { getDb, firebaseAdmin } from './firebase-server-init';
import { toSerializable } from './serialize';
import type { FinancialBreakdownInput, FinancialBreakdownOutput } from '@/ai/flows/financial-breakdown';
import { financialBreakdown } from '@/ai/flows/financial-breakdown';
import { profilePictureAutoTagging, ProfilePictureAutoTaggingInput, ProfilePictureAutoTaggingOutput } from '@/ai/flows/profile-picture-auto-tagging';
import { populateProfileFromLinkedIn, PopulateProfileFromLinkedInInput, PopulateProfileFromLinkedInOutput } from '@/ai/flows/linkedin-profile-populator';
import { smartSearch } from '@/ai/flows/smart-search';
import { FullUserProfile, Startup, Profile, Message, FounderProfile, TalentProfile, InvestorProfile, FounderObjective } from './types';
import { getCurrentUser } from './auth-actions';

async function getStartupById(id: string): Promise<Startup | null> {
    const db = getDb();
    try {
        const doc = await db.collection('startups').doc(id).get();
        if (!doc.exists) return null;
        return toSerializable({ id: doc.id, ...doc.data() }) as Startup;
    } catch (error) {
        console.error("Error in getStartupById:", error);
        return null;
    }
}

async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const db = getDb();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return { startups: [], users: [] };
    }

    try {
        const [startupsSnapshot, usersSnapshot] = await Promise.all([
            db.collection('startups').get(),
            db.collection('users').get()
        ]);

        const allStartups = startupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));
        const allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FullUserProfile));
        
        let searchableUsers: FullUserProfile[] = [];
        let searchableStartups: Startup[] = [];

        if (currentUser.role === 'investor') {
            const premiumFounderIds = new Set(allUsers
                .filter(u => u.role === 'founder' && (u.profile as FounderProfile).isPremium)
                .map(u => u.id));

            searchableUsers = allUsers.filter(u => {
                if (u.id === currentUser.id) return false;
                if (u.role === 'talent' || u.role === 'investor') return true;
                if (u.role === 'founder') return premiumFounderIds.has(u.id);
                return false;
            });
            
            searchableStartups = allStartups.filter(s => s.founderIds.some(id => premiumFounderIds.has(id)));

        } else if (currentUser.role === 'founder') {
            searchableUsers = allUsers.filter(u => u.role === 'talent');
            searchableStartups = [];

        } else if (currentUser.role === 'talent') {
            searchableUsers = allUsers.filter(u => {
                if (u.id === currentUser.id) return false;
                return true;
            });
            searchableStartups = allStartups;
        }

        if (searchableUsers.length === 0 && searchableStartups.length === 0) {
            return { startups: [], users: [] };
        }

        const searchableData = JSON.stringify({
            startups: searchableStartups.map(s => ({
                id: s.id,
                name: s.companyName,
                description: s.description,
                tagline: s.tagline,
                industry: s.industry,
                stage: s.stage,
            })),
            users: searchableUsers.map(u => {
                let details = (u.profile as any)?.about || '';
                if (u.role === 'founder') {
                    const p = u.profile as FounderProfile;
                    details += ` ${p.title} ${p.objectives?.join(' ')}`;
                } else if (u.role === 'investor') {
                    const p = u.profile as InvestorProfile;
                    details += ` ${p.investorType} ${p.companyName} ${p.investmentInterests.join(' ')} ${p.investmentStages?.join(' ')} ${p.thesis} ${p.seeking?.join(' ')}`;
                } else if (u.role === 'talent') {
                    const p = u.profile as TalentProfile;
                    details += ` ${p.headline} ${p.skills?.join(' ')} ${p.experience} ${p.organization} ${p.education}`;
                }
                return { id: u.id, name: u.name, role: u.role, details };
            })
        });

        const result = await smartSearch({ query, searchableData });

        const finalStartups = allStartups.filter(s => result.startupIds.includes(s.id));
        let finalUsers = allUsers.filter(u => result.userIds.includes(u.id));

        if (currentUser.role === 'founder') {
            const founderProfile = currentUser.profile as FounderProfile;
            finalUsers.sort((a, b) => {
                if (a.role !== 'talent' || b.role !== 'talent') return 0;

                const aProfile = a.profile as TalentProfile;
                const bProfile = b.profile as TalentProfile;
                let aScore = 0;
                let bScore = 0;

                if (founderProfile.objectives?.includes('seekingCoFounders')) {
                    if (aProfile.isSeekingCoFounder) aScore += 2;
                    if (bProfile.isSeekingCoFounder) bScore += 2;
                }
                if (founderProfile.objectives?.includes('seekingProfessionalAdvice')) {
                    if (aProfile.subRole === 'fractional-leader' || aProfile.subRole === 'vendor') aScore += 1;
                    if (bProfile.subRole === 'fractional-leader' || bProfile.subRole === 'vendor') bScore += 1;
                }
                return bScore - aScore;
            });
        }
        
        if (currentUser.role === 'talent') {
            const talentProfile = currentUser.profile as TalentProfile;
            finalUsers.sort((a, b) => {
                let aScore = 0;
                let bScore = 0;

                if (a.role === 'founder') {
                    const aFounderProfile = a.profile as FounderProfile;
                    if (talentProfile.isSeekingCoFounder && aFounderProfile.objectives?.includes('seekingCoFounders')) aScore += 2;
                    if (!talentProfile.isSeekingCoFounder && aFounderProfile.objectives?.includes('lookingToHire')) aScore += 1;
                }

                if (b.role === 'founder') {
                    const bFounderProfile = b.profile as FounderProfile;
                    if (talentProfile.isSeekingCoFounder && bFounderProfile.objectives?.includes('seekingCoFounders')) bScore += 2;
                    if (!talentProfile.isSeekingCoFounder && bFounderProfile.objectives?.includes('lookingToHire')) bScore += 1;
                }
                
                return bScore - aScore;
            });
        }


        return {
            startups: toSerializable(finalStartups),
            users: toSerializable(finalUsers)
        };
    } catch (error) {
        console.error("Smart Search failed:", error);
        return { startups: [], users: [] };
    }
}

async function sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<{ success: boolean; error?: string }> {
    try {
        const db = getDb();
        const newMessage = { ...message, id: `msg-${Date.now()}`, timestamp: new Date().toISOString() };
        await db.collection('conversations').doc(conversationId).update({
            messages: firebaseAdmin.firestore.FieldValue.arrayUnion(newMessage)
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
}

async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    if (!ids.length) return [];
    const db = getDb();
    const results = await db.collection('users').where('id', 'in', ids.slice(0, 30)).get();
    return results.docs.map(doc => toSerializable({ id: doc.id, ...doc.data() }) as FullUserProfile);
}

async function updateUser(userId: string, userData: Partial<FullUserProfile>): Promise<{ success: boolean; error?: string }> {
    try {
        const db = getDb();
        await db.collection('users').doc(userId).update(userData);
        return { success: true };
    } catch (error: any) {
        console.error("Error updating user:", error);
        return { success: false, error: error.message };
    }
}

async function updateStartupData(startupId: string, startupData: Partial<Startup>): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const db = getDb();
        await db.collection('startups').doc(startupId).update(startupData);
        return { success: true, message: 'Startup updated' };
    } catch (error: any) {
        console.error("Error updating startup data:", error);
        return { success: false, error: error.message };
    }
}

async function getFinancialBreakdown(input: FinancialBreakdownInput) { return financialBreakdown(input); }
async function getProfilePictureTags(input: ProfilePictureAutoTaggingInput) { return profilePictureAutoTagging(input); }
async function getProfileFromLinkedIn(input: PopulateProfileFromLinkedInInput) { return populateProfileFromLinkedIn(input); }

export { getStartupById, getSearchResults, sendMessage, getUsersByIds, updateUser, updateStartupData, getFinancialBreakdown, getProfilePictureTags, getProfileFromLinkedIn };
