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

export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    const db = getDb();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        console.warn("Search attempted without a logged-in user.");
        return { startups: [], users: [] };
    }

    try {
        const userPromises: Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>[] = [];
        let startupPromise: Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> | null = null;
        
        let allSearchableUsers: FullUserProfile[] = [];
        let allSearchableStartups: Startup[] = [];

        /**
         * ROLE-BASED VISIBILITY RULES:
         * 1. Talent: See Founders + Startups
         * 2. Founders: See Talent
         * 3. Investors: See Talent, other Investors, and ONLY Paid Founders (isPremium)
         */
        if (currentUser.role === 'investor') {
            // Investors see other Investors
            userPromises.push(db.collection('users').where('role', '==', 'investor').get());
            // Investors see all Talent
            userPromises.push(db.collection('users').where('role', '==', 'talent').get());
            // Investors see ONLY Paid Founders (Premium)
            // NOTE: This requires a Composite Index on 'role' and 'profile.isPremium'
            userPromises.push(db.collection('users')
                .where('role', '==', 'founder')
                .where('profile.isPremium', '==', true)
                .get()
            );
            // Investors search startups
            startupPromise = db.collection('startups').get();

        } else if (currentUser.role === 'founder') {
            // Founders only see Talent
            userPromises.push(db.collection('users').where('role', '==', 'talent').get());

        } else if (currentUser.role === 'talent') {
            // Talent see all Founders
            userPromises.push(db.collection('users').where('role', '==', 'founder').get());
            // Talent search startups
            startupPromise = db.collection('startups').get();
        }

        // Execute User Queries
        const userSnapshots = await Promise.all(userPromises);
        const allUsersRaw = userSnapshots.flatMap(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FullUserProfile)));

        // De-duplicate and remove self
        const userMap = new Map<string, FullUserProfile>();
        for (const u of allUsersRaw) {
            if (u.id !== currentUser.id) userMap.set(u.id, u);
        }
        allSearchableUsers = Array.from(userMap.values());

        // Process Startups (Filter for Investors)
        if (startupPromise) {
            const startupSnapshot = await startupPromise;
            const allStartups = startupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));

            if (currentUser.role === 'investor') {
                // Investors only see startups where the founder is premium
                const premiumFounderIds = new Set(allSearchableUsers.filter(u => u.role === 'founder').map(u => u.id));
                allSearchableStartups = allStartups.filter(s => s.founderIds.some(fid => premiumFounderIds.has(fid)));
            } else {
                allSearchableStartups = allStartups;
            }
        }

        if (allSearchableUsers.length === 0 && allSearchableStartups.length === 0) {
            console.log("No records found within visibility rules for user:", currentUser.id);
            return { startups: [], users: [] };
        }

        // Prepare data for AI Smart Search
        const searchableData = JSON.stringify({
            startups: allSearchableStartups.map(s => ({
                id: s.id,
                name: s.companyName,
                description: s.description,
                tagline: s.tagline,
                industry: s.industry,
                stage: s.stage,
            })),
            users: allSearchableUsers.map(u => {
                let details = (u.profile as any)?.about || '';
                if (u.role === 'founder') {
                    const p = u.profile as FounderProfile;
                    details += ` ${p.title || ''} ${(p.objectives || []).join(' ')}`;
                } else if (u.role === 'investor') {
                    const p = u.profile as InvestorProfile;
                    details += ` ${p.investorType || ''} ${p.companyName || ''} ${(p.investmentInterests || []).join(' ')}`;
                } else if (u.role === 'talent') {
                    const p = u.profile as TalentProfile;
                    details += ` ${p.headline || ''} ${(p.skills || []).join(' ')} ${p.experience || ''}`;
                }
                return { id: u.id, name: u.name, role: u.role, details: details.trim().replace(/\s+/g, ' ') };
            })
        });

        // Call the AI Flow
        const result = await smartSearch({ query, searchableData });

        // Filter original objects based on AI result IDs
        const finalStartups = allSearchableStartups.filter(s => result.startupIds.includes(s.id));
        let finalUsers = allSearchableUsers.filter(u => result.userIds.includes(u.id));

        // APPLY ROLE-BASED SORTING LOGIC
        if (currentUser.role === 'founder') {
            const fProf = currentUser.profile as FounderProfile;
            finalUsers.sort((a, b) => {
                let aS = 0, bS = 0;
                const ap = a.profile as TalentProfile, bp = b.profile as TalentProfile;
                if (fProf.objectives?.includes('seekingCoFounders')) {
                    if (ap?.isSeekingCoFounder) aS += 2;
                    if (bp?.isSeekingCoFounder) bS += 2;
                }
                return bS - aS;
            });
        }

        return {
            startups: toSerializable(finalStartups),
            users: toSerializable(finalUsers)
        };

    } catch (error) {
        console.error("CRITICAL: Smart Search Action Failed:", error);
        return { startups: [], users: [] };
    }
}
