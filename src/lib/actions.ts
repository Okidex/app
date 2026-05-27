'use server';

import { getDb, getAuth } from './firebase-server-init';
import { toSerializable } from './serialize';
import { FieldValue } from 'firebase-admin/firestore';
import { smartSearch } from '@/ai/flows/smart-search';
import { stripe } from './stripe/config';
import { getSessionUser } from './auth-actions';
import type {
  FullUserProfile,
  Startup,
  FounderProfile,
  InvestorProfile,
  TalentProfile,
  UserRole,
  Job,
  InvestmentThesis,
  Interest,
  Match
} from './types';

/**
 * [DEBUGGER] Unified UID Fetching
 */
async function getVerifiedUid(idToken?: string) {
    const auth = getAuth();
    if (!auth) return null;

    const timeout = <T>(promise: Promise<T>, ms = 3000): Promise<T> => {
        return Promise.race([
            promise,
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Authentication check timed out")), ms))
        ]);
    };

    if (idToken) {
        try {
            const decoded = await timeout(auth.verifyIdToken(idToken), 3000);
            return decoded.uid;
        } catch (e: any) {
            console.error(`[DEBUGGER-ACTION] Token verification failed:`, e.message);
        }
    }
    try {
        return await timeout(getSessionUser(), 3000);
    } catch (e: any) {
        console.error(`[DEBUGGER-ACTION] Session cookie verification failed or timed out:`, e.message);
        return null;
    }
}

/**
 * Helper to verify Oki+ status.
 * [TRIAL OVERRIDE] mario@xpandtree.com is always premium.
 */
async function verifyPremiumStatus(user: FullUserProfile): Promise<boolean> {
    const email = user.email?.toLowerCase();
    if (user.role !== 'founder') return true;
    
    const profile = user.profile as FounderProfile;
    if (profile.isPremium) return true;

    const subId = profile.stripe?.subscriptionId;
    if (!subId) return false;

    try {
        const sub = await stripe.subscriptions.retrieve(subId);
        if (sub.status === 'active' || sub.status === 'trialing') {
            await getDb().collection('users').doc(user.id).update({ 'profile.isPremium': true });
            return true;
        }
    } catch (e) {
        console.error("[OKI-AUTH] Stripe verification failed:", e);
    }
    return false;
}

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'studio-8509111427-a45a7';
const REGION = 'us-central1';

async function invokeCloudFunction(name: string, data: any) {
    const url = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${name}`;
    console.log(`[FIREBASE-DEBUG-SERVER] Invoking Cloud Function via URL: ${url}`);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            throw new Error(`Cloud function returned status ${response.status}: ${await response.text()}`);
        }

        const json = await response.json();
        console.log(`[FIREBASE-DEBUG-SERVER] Cloud Function ${name} responded successfully.`);
        return json.result;
    } catch (e: any) {
        console.error(`[FIREBASE-DEBUG-SERVER] Failed to invoke Cloud Function ${name}:`, e.message);
        throw e;
    }
}

export async function getFinancialBreakdown(input: any) {
    return invokeCloudFunction('financialBreakdown', input);
}

export async function getProfilePictureTags(input: any) {
    return invokeCloudFunction('profilePictureAutoTagging', input);
}

export async function getProfileFromLinkedIn(input: any) {
    return invokeCloudFunction('populateProfileFromLinkedIn', input);
}

/**
 * [SIMPLIFIED SEARCH]
 * Hardened with Mario "God Mode" and Oki+ Premium Check.
 */
export async function getSearchResults(query: string): Promise<{ startups: Startup[], users: FullUserProfile[] }> {
    try {
        const db = getDb();
        const uid = await getVerifiedUid();
        const usersSnap = await getDb().collection('users').get();
        const startupsSnap = await getDb().collection('startups').get();

        let allUsers = usersSnap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as FullUserProfile));
        let allStartups = startupsSnap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Startup));

        const searchingUser = uid ? allUsers.find(u => u.id === uid) : null;
        if (!searchingUser) return { startups: [], users: [] };

        const isPremium = await verifyPremiumStatus(searchingUser);

        if (!query || query.trim() === '') return { startups: [], users: [] };
        
        allUsers = allUsers.filter(u => u.id !== uid);
        
        // Enforce: FOUNDERS (premium or not) cannot search for investors.
        // They must appeal to investors via live investment theses.
        // Only investors and talent can see investors in search.
        const isFounder = searchingUser.role === 'founder';
        const isInvestor = searchingUser.role === 'investor';
        const isTalent = searchingUser.role === 'talent';
        
        if (isFounder) {
            // Founders never see investors in search — direct them to /theses instead
            allUsers = allUsers.filter(u => u.role !== 'investor');
        }
        
        // New rule: when investors perform a search, they may only uncover paying Oki+ founders
        const isSearchingInvestor = searchingUser.role === 'investor';
        if (isSearchingInvestor) {
            allUsers = allUsers.filter(u => {
                if (u.role === 'founder') {
                    return (u.profile as FounderProfile)?.isPremium === true;
                }
                return true;
            });
        }
        
        const q = query.toLowerCase();

        let aiMatchedUserIds: string[] = [];
        let aiMatchedStartupIds: string[] = [];

        try {
            const searchableData = JSON.stringify({
                users: allUsers.map(u => ({ id: u.id, name: u.name, role: u.role })),
                startups: allStartups.map(s => ({ id: s.id, companyName: s.companyName }))
            });
            const aiResults = await smartSearch({ query, searchableData });
            aiMatchedUserIds = aiResults.userIds || [];
            aiMatchedStartupIds = aiResults.startupIds || [];
        } catch (e) { console.warn("AI search fallback to keywords"); }

        const keywordUsers = allUsers.filter(u => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
        const finalUserIds = new Set([...aiMatchedUserIds, ...keywordUsers.map(u => u.id)]);
        const finalUsers = allUsers.filter(u => finalUserIds.has(u.id)).slice(0, 50);

        return {
            startups: allStartups.filter(s => aiMatchedStartupIds.includes(s.id)).map(toSerializable) as Startup[],
            users: finalUsers.map(toSerializable) as FullUserProfile[]
        };
    } catch (error) {
        return { startups: [], users: [] };
    }
}

export async function getStartupById(id: string): Promise<Startup | null> {
    if (!id || !getDb()) return null;
    try {
        const doc = await getDb().collection('startups').doc(id).get();
        if (!doc.exists) return null;
        return toSerializable({ id: doc.id, ...doc.data() }) as Startup;
    } catch (e) { return null; }
}

/**
 * Updates startup metadata (Cap Table, Fundraising, etc.)
 */
export async function updateStartupData(
    startupId: string,
    data: any
): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid();
    if (!uid || !getDb() || !startupId) {
        return { success: false, error: "Authentication failed or invalid startup ID." };
    }
    try {
        await getDb().collection('startups').doc(startupId).update({
            ...data,
            updatedAt: FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to update startup data." };
    }
}

export async function incrementProfileView(targetUid: string) {
    if (!getDb() || !targetUid) return;
    try {
        await getDb().collection('users').doc(targetUid).update({
            profileViews: FieldValue.increment(1)
        });
    } catch (e) { console.error(e); }
}

/**
 * Messaging & Connections
 */
export async function sendMessage(
    conversationId: string,
    text: string,
    idToken?: string
): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !getDb() || !text.trim()) {
        return { success: false, error: "Authentication or validation failed." };
    }
    try {
        const db = getDb();
        const convDoc = await db.collection('conversations').doc(conversationId).get();
        if (!convDoc.exists) {
            return { success: false, error: "Conversation not found." };
        }
        
        const convData = convDoc.data();
        const participantIds = convData?.participantIds || [];
        if (!participantIds.includes(uid)) {
            return { success: false, error: "Unauthorized access." };
        }

        const targetUid = participantIds.find((id: string) => id !== uid);
        if (targetUid) {
            // Verify they are connected
            const matchSnap = await db.collection('matches')
                .where('participantIds', 'array-contains', uid)
                .get();
            
            const isMatched = matchSnap.docs.some(doc => {
                const data = doc.data();
                return data.participantIds?.includes(targetUid) && data.status === 'connected';
            });

            if (!isMatched) {
                return { success: false, error: "You must be connected to send messages." };
            }
        }

        await db.collection('conversations').doc(conversationId).collection('messages').add({
            senderId: uid,
            text: text.trim(),
            timestamp: FieldValue.serverTimestamp()
        });
        await db.collection('conversations').doc(conversationId).update({
            lastMessage: text.trim(),
            lastMessageTimestamp: FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "An unknown error occurred." };
    }
}

export async function sendConnectionRequest(targetUid: string, idToken?: string): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !getDb() || !targetUid) {
        return { success: false, error: "Authentication failed or invalid target." };
    }
    if (uid === targetUid) {
        return { success: false, error: "You cannot connect with yourself." };
    }
    try {
        const db = getDb();
        
        // Check if connection already exists
        const matchSnap = await db.collection('matches')
            .where('participantIds', 'array-contains', uid)
            .get();
        
        const existing = matchSnap.docs.find(doc => {
            const pIds = doc.data().participantIds || [];
            return pIds.includes(targetUid);
        });

        if (existing) {
            const data = existing.data();
            if (data.status === 'connected') {
                return { success: false, error: "You are already connected with this user." };
            } else if (data.status === 'pending') {
                return { success: false, error: "A connection request is already pending." };
            }
        }

        // Create connection
        await db.collection('matches').add({
            participantIds: [uid, targetUid],
            status: 'pending',
            createdBy: uid,
            matchDate: new Date().toISOString()
        });

        // Send notification to target user
        const senderDoc = await db.collection('users').doc(uid).get();
        const senderName = senderDoc.exists ? (senderDoc.data()?.name || "Someone") : "Someone";

        await db.collection('notifications').add({
            userId: targetUid,
            type: 'connection',
            text: `${senderName} wants to connect with you.`,
            isRead: false,
            timestamp: FieldValue.serverTimestamp(),
            senderId: uid,
            link: `/user?id=${uid}`
        });

        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to send request." };
    }
}

/**
 * Respond to Connection Requests
 */
export async function respondToConnectionRequest(
    requestId: string,
    status: 'accept' | 'declined' | 'reject',
    idToken?: string
): Promise<{ success: boolean; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !getDb() || !requestId) {
        return { success: false, error: "Authentication failed or invalid request." };
    }
    try {
        const db = getDb();
        const matchDoc = await db.collection('matches').doc(requestId).get();
        if (!matchDoc.exists) {
            return { success: false, error: "Connection request not found." };
        }

        const matchData = matchDoc.data();
        const participantIds = matchData?.participantIds || [];
        if (!participantIds.includes(uid)) {
            return { success: false, error: "Unauthorized response." };
        }

        if (status === 'accept') {
            await db.collection('matches').doc(requestId).update({
                status: 'connected',
                matchDate: new Date().toISOString()
            });

            // Notify original sender
            const responderDoc = await db.collection('users').doc(uid).get();
            const responderName = responderDoc.exists ? (responderDoc.data()?.name || "Someone") : "Someone";
            const originalSenderId = matchData?.createdBy === uid 
                ? participantIds.find((id: string) => id !== uid)
                : matchData?.createdBy;

            if (originalSenderId) {
                await db.collection('notifications').add({
                    userId: originalSenderId,
                    type: 'match',
                    text: `${responderName} accepted your connection request!`,
                    isRead: false,
                    timestamp: FieldValue.serverTimestamp(),
                    senderId: uid,
                    link: `/user?id=${uid}`
                });
            }
        } else {
            // Delete request document on decline/reject so connection can be retried later
            await db.collection('matches').doc(requestId).delete();
        }

        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to respond." };
    }
}

/**
 * Messaging: Get or Create a Conversation
 */
export async function getOrCreateConversation(
    targetUid: string,
    idToken?: string
): Promise<{ success: boolean; conversationId?: string; error?: string }> {
    const uid = await getVerifiedUid(idToken);
    if (!uid || !getDb() || !targetUid) {
        return { success: false, error: "Authentication failed or invalid target." };
    }
    try {
        const db = getDb();

        // 1. Verify that they are connected
        const matchSnap = await db.collection('matches')
            .where('participantIds', 'array-contains', uid)
            .get();
        
        const isMatched = matchSnap.docs.some(doc => {
            const data = doc.data();
            return data.participantIds?.includes(targetUid) && data.status === 'connected';
        });

        if (!isMatched) {
            return { success: false, error: "You must be connected to message this user." };
        }

        // 2. Find or create conversation
        const convSnap = await db.collection('conversations')
            .where('participantIds', 'array-contains', uid)
            .get();
        
        const existingConv = convSnap.docs.find(doc => {
            const pIds = doc.data().participantIds || [];
            return pIds.includes(targetUid);
        });

        if (existingConv) {
            return { success: true, conversationId: existingConv.id };
        }

        const newConvRef = await db.collection('conversations').add({
            participantIds: [uid, targetUid],
            lastMessage: "",
            lastMessageTimestamp: FieldValue.serverTimestamp(),
            createdAt: FieldValue.serverTimestamp()
        });

        return { success: true, conversationId: newConvRef.id };
    } catch (e: any) {
        return { success: false, error: e.message || "Failed to initiate conversation." };
    }
}

export async function getUsersByIds(ids: string[]): Promise<FullUserProfile[]> {
    if (!ids || ids.length === 0 || !getDb()) return [];
    try {
        const uniqueIds = [...new Set(ids)].slice(0, 30);
        const userRefs = uniqueIds.map(id => getDb().collection('users').doc(id));
        const userDocs = await getDb().getAll(...userRefs);
        return userDocs.filter(d => d.exists).map(d => toSerializable({ id: d.id, ...d.data() })) as FullUserProfile[];
    } catch (e) { return []; }
}

/**
 * Ask OkiAgent — Agentic search and platform helper
 */
export async function askOkiAgent(
    history: { role: 'user' | 'model'; parts: { text: string }[] }[],
    userMessage: string
): Promise<{ text: string; sources: { title: string; url: string }[] }> {
    try {
        console.log(`[OKIAGENT-SERVER-DEBUG] 1. askOkiAgent triggered with userMessage="${userMessage}"`);
        const uid = await getVerifiedUid();
        console.log(`[OKIAGENT-SERVER-DEBUG] 2. getVerifiedUid resolved: "${uid}"`);
        if (!uid) {
            return {
                text: "You must be signed in to chat with OkiAgent.",
                sources: []
            };
        }

        const db = getDb();
        if (!db) {
            console.error(`[OKIAGENT-SERVER-DEBUG] Database connection failed.`);
            return {
                text: "Database connection failed.",
                sources: []
            };
        }

        const dbTimeout = <T>(
            promise: Promise<T>, 
            timeoutMs = 8000, 
            errorMsg = "Database request timed out. Please check your internet connection."
        ): Promise<T> => {
            return Promise.race([
                promise,
                new Promise<never>((_, reject) => setTimeout(() => reject(new Error(errorMsg)), timeoutMs))
            ]);
        };

        console.log(`[OKIAGENT-SERVER-DEBUG] 3. Retrieving user profile for UID="${uid}"...`);
        const userDocResolved = await dbTimeout(
            db.collection('users').doc(uid).get(), 
            6000, 
            "Failed to connect to the database to retrieve your profile. Please check your internet connection."
        );
        if (!userDocResolved.exists) {
            console.error(`[OKIAGENT-SERVER-DEBUG] User profile not found for UID="${uid}"`);
            return {
                text: "User profile not found.",
                sources: []
            };
        }

        const currentUser = { id: userDocResolved.id, ...userDocResolved.data() } as FullUserProfile;
        console.log(`[OKIAGENT-SERVER-DEBUG] 4. User profile found: "${currentUser.name}" (Role: ${currentUser.role})`);

        // Fetch ecosystem context from Firestore with timeout safeguard
        console.log(`[OKIAGENT-SERVER-DEBUG] 5. Fetching complete ecosystem context from Firestore...`);
        const [usersSnap, startupsSnap, jobsSnap, thesesSnap, interestsSnap, matchesSnap] = await dbTimeout(
            Promise.all([
                db.collection('users').get(),
                db.collection('startups').get(),
                db.collection('jobs').get(),
                db.collection('theses').get(),
                db.collection('interests').get(),
                db.collection('matches').get()
            ]),
            8000,
            "Failed to load ecosystem database context due to a database connection timeout. Please check your internet connection."
        );
        console.log(`[OKIAGENT-SERVER-DEBUG] 6. Ecosystem context fetched successfully (Users: ${usersSnap.size}, Startups: ${startupsSnap.size}, Jobs: ${jobsSnap.size})`);

        let allUsers = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FullUserProfile));
        let allStartups = startupsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));
        let allJobs = jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
        let allTheses = thesesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestmentThesis));
        let allInterests = interestsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Interest));
        let allMatches = matchesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));

        // Filter out self from people search
        allUsers = allUsers.filter(u => u.id !== currentUser.id);

        // Security filters
        if (currentUser.role === 'founder') {
            // All founders cannot search for investors
            allUsers = allUsers.filter(u => u.role !== 'investor');
            
            if (!(currentUser.profile as FounderProfile)?.isPremium) {
                // Non-premium founders cannot see theses either
                allTheses = [];
            }
        }

        if (currentUser.role === 'investor') {
            // Investors can only see premium founders
            allUsers = allUsers.filter(u => {
                if (u.role === 'founder') {
                    return (u.profile as FounderProfile)?.isPremium === true;
                }
                return true;
            });
            // And startups where at least one founder is premium
            const premiumFounderIds = new Set(
                allUsers.filter(u => u.role === 'founder' && (u.profile as FounderProfile)?.isPremium === true).map(u => u.id)
            );
            allStartups = allStartups.filter(s => s.founderIds.some(fid => premiumFounderIds.has(fid)));
        }

        // Filter & format user-specific interests (Applicants / Applications)
        let myInterests: Interest[] = [];
        if (currentUser.role === 'founder') {
            const founderJobIds = new Set(allJobs.filter(j => j.founderId === currentUser.id).map(j => j.id));
            myInterests = allInterests.filter(i => i.targetType === 'job' && founderJobIds.has(i.targetId));
        } else if (currentUser.role === 'investor') {
            const investorThesisIds = new Set(allTheses.filter(t => t.investorId === currentUser.id).map(t => t.id));
            myInterests = allInterests.filter(i => i.targetType === 'thesis' && investorThesisIds.has(i.targetId));
        } else if (currentUser.role === 'talent') {
            myInterests = allInterests.filter(i => i.userId === currentUser.id);
        }

        const getInterestDescription = (interest: Interest) => {
            const user = allUsers.find(u => u.id === interest.userId) || (interest.userId === currentUser.id ? currentUser : null);
            const userName = user?.name || `User ${interest.userId}`;
            let targetName = `ID: ${interest.targetId}`;
            if (interest.targetType === 'job') {
                const j = allJobs.find(x => x.id === interest.targetId);
                targetName = j ? `job "${j.title}"` : `job ${interest.targetId}`;
            } else if (interest.targetType === 'thesis') {
                const t = allTheses.find(x => x.id === interest.targetId);
                targetName = t ? `thesis "${t.title}"` : `thesis ${interest.targetId}`;
            } else if (interest.targetType === 'startup') {
                const s = allStartups.find(x => x.id === interest.targetId);
                targetName = s ? `startup "${s.companyName}"` : `startup ${interest.targetId}`;
            }
            return `- Applicant/Interest: "${userName}" (ID: ${interest.userId}, Role: ${user?.role || 'N/A'}) expressed interest in ${targetName} (Type: ${interest.targetType}) on ${interest.timestamp}`;
        };
        const interestsText = myInterests.map(getInterestDescription).join('\n');

        // Filter & format user-specific mutual matches
        const myMatches = allMatches.filter(m => m.participantIds?.includes(currentUser.id));
        const getMatchDescription = (match: Match) => {
            const otherId = match.participantIds.find(pid => pid !== currentUser.id) || '';
            const otherUser = allUsers.find(u => u.id === otherId);
            const otherName = otherUser?.name || `User ${otherId}`;
            return `- Match: Mutually matched connection with "${otherName}" (ID: ${otherId}, Role: ${otherUser?.role || 'N/A'}) on ${match.matchDate}`;
        };
        const matchesText = myMatches.map(getMatchDescription).join('\n');

        // Format database context
        const startupsText = allStartups.map(s => `- Startup: "${s.companyName}" (ID: ${s.id}) in ${s.industry}, Stage: ${s.stage}. Tagline: "${s.tagline}". Description: "${s.description}". Location: ${s.location || 'N/A'}. Founders: ${s.founderIds.join(', ')}`).join('\n');
        
        const usersText = allUsers.map(u => {
            let detail = "";
            if (u.role === 'founder') {
                detail = `Company ID: ${(u.profile as FounderProfile)?.companyId || 'N/A'}`;
            } else if (u.role === 'investor') {
                const ip = u.profile as InvestorProfile;
                detail = `Company: ${ip?.companyName || 'N/A'} | Interests: ${(ip?.investmentInterests || []).join(', ')} | Stages: ${(ip?.investmentStages || []).join(', ')} | Thesis: "${ip?.thesis || 'N/A'}"`;
            } else if (u.role === 'talent') {
                const tp = u.profile as TalentProfile;
                detail = `Subrole: ${tp?.subRole || 'N/A'} | Headline: "${tp?.headline || 'N/A'}" | Skills: ${(tp?.skills || []).join(', ')} | Experience: "${tp?.experience || 'N/A'}"`;
            }
            return `- User: "${u.name}" (ID: ${u.id}), Role: ${u.role}. Details: ${detail}`;
        }).join('\n');

        const jobsText = allJobs.map(j => `- Job: "${j.title}" at "${j.companyName}" (ID: ${j.id}). Description: "${j.description}". Location: ${j.location}, Type: ${j.type}. Posted by Founder ID: ${j.founderId}`).join('\n');

        const thesesText = allTheses.map(t => `- Thesis: "${t.title}" (ID: ${t.id}) by Investor ID: ${t.investorId}. Summary: "${t.summary}". Industries: ${(t.industries || []).join(', ')}. Stages: ${(t.stages || []).join(', ')}`).join('\n');

        const systemPrompt = `You are OkiAgent, the intelligent ecosystem assistant for the Okidex platform.
Your goal is to help founders, investors, and talent connect, navigate the application, and grow their businesses.

APP NAVIGATION & FEATURES:
Okidex has the following pages and features:
- Dashboard (/dashboard): View metrics, matches, unread messages, and notifications.
- Search (/search): Find other users and startups in the ecosystem.
- Jobs (/jobs): Post new job openings (founders/investors) or browse and apply for jobs (talent).
- Theses (/theses): Share investment focus (investors) or read investment focus areas.
- Applicants (/applicants): View job applicants and investor/thesis interests on your posts. (founders/investors view this)
- Matches (/matches): View mutual connections where both sides showed interest.
- Messages (/messages): Direct messages with your active matches.
- Upgrade to Oki+ (/settings/billing): Premium membership for founders.
- Profile Settings (/settings): Edit your profile details.

USER PRIVACY & ACCESS RULES:
The database context passed to you has already been filtered based on the current user's role and premium status.
1. FOUNDERS (premium or not) cannot search for investors. They must attract investor attention by responding to live investment theses posted at [Investment Theses](/theses).
   - If any founder asks about investors, asks to raise capital, or wants to contact investors, you MUST NOT show investor profiles.
   - Instead, encourage them warmly: explain that Okidex works the other way around — investors post live investment theses and founders (Oki+ members) can respond to attract investor interest. Direct them to [Browse Investment Theses](/theses).
   - If the founder is NOT Oki+ premium, also explain they need to upgrade to access and respond to investment theses: [Upgrade to Oki+](/settings/billing).
2. Investors are only allowed to see or connect with founders who are paying Oki+ premium members (profile.isPremium === true). Non-premium founders have been excluded from your context.

CAPABILITIES:
1. Match investment thesis: Help investors find startups, and help founders find investors (if the founder is Oki+ premium).
2. Search startups & talent: Recommend matching profiles based on the ecosystem database. Always output profiles as markdown links, e.g. [Ada Lovelace](/users/user-1) or [InnovateAI](/users/user-1) (direct links using their correct user ID).
3. Draft message replies: If a user asks to draft a reply or message, generate a professional, compelling message draft.
4. Navigate the app: Explain where features are and provide direct markdown links (e.g. [View My Matches](/matches), [Browse Jobs](/jobs), [Check Messages](/messages)).
5. Google Search: You have Google Search grounding enabled. Use it to answer questions about external market trends, competitor analysis, startup news, or general industry concepts.

IMPORTANT - USER TRANSPORTATION & REDIRECTIONS:
If the user explicitly requests to open, go to, view, browse, visit, or check a page or feature (or if the conversation naturally leads to opening a feature like messages, settings, applicants list, job list), you MUST append a redirection command at the very end of your response text in the exact format: [REDIRECT: /path] (where /path is the destination).
Valid redirection paths:
- /dashboard
- /search
- /jobs
- /theses
- /applicants
- /matches
- /messages
- /settings
- /settings/billing
- /users/USER_ID (to view a specific user's profile)

Example user query: "take me to my applicants page"
Example response: "I am transporting you to your applicants page now. [REDIRECT: /applicants]"
Example user query: "let's check messages"
Example response: "Sure, let's open direct messages. [REDIRECT: /messages]"
Example user query: "view ada's profile"
Example response: "Opening Ada's profile for you. [REDIRECT: /users/user-1]"

IMPORTANT: If the user asks what you can do, what your features are, how to use you, or for help, output a clean, numbered top feature list:
1. **Match Investment Thesis**: Scan matching founders and startups based on investment preferences (premium founders only).
2. **Talent Sourcing**: Match you with co-founders or fractional leaders (operations, product, tech) in the database.
3. **Job Hunting**: Search open B2B SaaS, Tech, and Logistics jobs posted by our startups.
4. **Draft Messages & Outreach**: Draft custom pitch responses, follow-up messages, or introduction emails.
5. **App Navigation Guide**: Direct you to key areas like [My Matches](/matches), [Direct Messages](/messages), [Browse Jobs](/jobs), or [Settings](/settings).
6. **Google Search Grounding**: Search the live web for market trends, competitor analysis, compensation, and tech stacks.

CURRENT USER info:
Name: ${currentUser.name}
Role: ${currentUser.role}
Premium (Oki+): ${currentUser.role === 'founder' ? ((currentUser.profile as FounderProfile).isPremium === true ? 'Yes' : 'No') : 'N/A'}

ECOSYSTEM DATABASE CONTEXT (Firestore):

=== STARTUPS ===
${startupsText || 'No startups found.'}

=== PEOPLE ===
${usersText || 'No people found.'}

=== JOBS ===
${jobsText || 'No jobs found.'}

=== INVESTMENT THESES ===
${thesesText || 'No investment theses found.'}

=== APPLICANTS & INTERESTS ===
${interestsText || 'No applications or interest received/sent.'}

=== MUTUAL MATCHES ===
${matchesText || 'No mutual matches yet.'}

Please refer to the above database entities when answering matchmaking, search, or hiring questions. If an entity matches, mention it by name and link to its profile page (/users/USER_ID). Use Google Search for general questions or external market data. Be polite, concise, and helpful. Always format links using standard markdown (e.g. [link text](/path)).`;

        const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
        if (!geminiApiKey) {
            console.error(`[OKIAGENT-SERVER-DEBUG] Gemini API key is missing from environment variables.`);
            return {
                text: "Gemini API key is not configured in local environment variables.",
                sources: []
            };
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
        console.log(`[OKIAGENT-SERVER-DEBUG] 7. Preparing Gemini POST request to: ${url}`);

        const contents = [
            ...history,
            {
                role: 'user',
                parts: [{ text: userMessage }]
            }
        ];

        console.log(`[OKIAGENT-SERVER-DEBUG] 8. Sending fetch to Gemini (with 12s abort timeout)...`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.error(`[OKIAGENT-SERVER-DEBUG] AbortController triggered! Gemini API fetch timed out after 12s.`);
            controller.abort();
        }, 12000);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    contents,
                    tools: [
                        {
                            googleSearch: {} // Gemini's built-in Google Search grounding!
                        }
                    ],
                    generationConfig: {
                        temperature: 0.4,
                        maxOutputTokens: 2048
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log(`[OKIAGENT-SERVER-DEBUG] 9. Gemini API response status: ${response.status} (${response.statusText})`);

            if (!response.ok) {
                const errText = await response.text();
                console.error("[GEMINI-ERROR] API call failed:", errText);
                return {
                    text: "Sorry, I encountered an error communicating with Gemini. Please try again.",
                    sources: []
                };
            }

            const data = await response.json();
            const candidate = data.candidates?.[0];
            const responseText = candidate?.content?.parts?.[0]?.text || "No response received.";
            console.log(`[OKIAGENT-SERVER-DEBUG] 10. Gemini API candidate text parsed successfully (Length: ${responseText.length} chars)`);
            
            // Parse Grounding sources if any
            const sources: { title: string; url: string }[] = [];
            const groundingMetadata = candidate?.groundingMetadata;
            if (groundingMetadata && groundingMetadata.groundingChunks) {
                const seenUrls = new Set<string>();
                for (const chunk of groundingMetadata.groundingChunks) {
                    if (chunk.web?.uri) {
                        const urlStr = chunk.web.uri;
                        if (!seenUrls.has(urlStr)) {
                            seenUrls.add(urlStr);
                            sources.push({
                                title: chunk.web.title || urlStr,
                                url: urlStr
                            });
                        }
                    }
                }
            }

            return {
                text: responseText,
                sources
            };
        } catch (fetchErr: any) {
            clearTimeout(timeoutId);
            if (fetchErr.name === 'AbortError') {
                console.error(`[OKIAGENT-SERVER-DEBUG] Caught AbortError during Gemini API call.`);
                return {
                    text: "Connection to the Gemini API timed out. Please verify your internet connection or check if the Google Gemini service is reachable from your local network.",
                    sources: []
                };
            }
            throw fetchErr;
        }
    } catch (e: any) {
        console.error("[GEMINI-ERROR] Server Action failed:", e);
        return {
            text: `An unexpected error occurred: ${e.message || e}`,
            sources: []
        };
    }
}
