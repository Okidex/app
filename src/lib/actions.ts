'use server';

import 'server-only';
// FIX: Import the direct named function for reliability in Next.js 14/15
import { getFirebaseAdmin } from '@/lib/firebase-server-init';
import { FieldValue } from 'firebase-admin/firestore';
import {
    FullUserProfile, Startup, Profile, Message,
    FounderProfile,
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

// --- User Actions ---

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
  if (!userId) return null;
  // Use the standard getter
  const { firestore } = getFirebaseAdmin();
  const userDoc = await firestore.collection('users').doc(userId).get();
  if (userDoc.exists) {
    return toSerializable(userDoc.data()) as FullUserProfile;
  }
  return null;
}

export async function getUsersByIds(userIds: string[]): Promise<FullUserProfile[]> {
    if (!userIds || userIds.length === 0) return [];
    
    const { firestore } = getFirebaseAdmin();
    const uniqueIds = [...new Set(userIds)].filter(Boolean);
    
    if (uniqueIds.length === 0) return [];
    
    // Firestore 'in' queries limited to 30
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

export async function updateUserProfile(userId: string, data: Partial<Profile>) {
    const { firestore } = getFirebaseAdmin();
    try {
        const userRef = firestore.collection("users").doc(userId);
        const existingDoc = await userRef.get();
        if (!existingDoc.exists) {
            throw new Error("User not found");
        }
        const existingData = existingDoc.data();
        const existingProfile = existingData?.profile || {};

        await userRef.update({
            profile: { ...existingProfile, ...data },
            updatedAt: FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating user profile:", error);
        return { success: false, error: error.message || "Failed to update profile." };
    }
}

// --- Startup Actions ---

export async function getStartupById(startupId: string): Promise<Startup | null> {
    if (!startupId) return null;
    const { firestore } = getFirebaseAdmin();
    const startupDoc = await firestore.collection('startups').doc(startupId).get();
    if (startupDoc.exists) {
        return toSerializable(startupDoc.data()) as Startup;
    }
    return null;
}

// --- Messaging Actions ---

export async function sendMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) {
    const { firestore } = getFirebaseAdmin();
    try {
        const convoRef = firestore.collection('conversations').doc(conversationId);
        const newMessage: Message = {
            ...message,
            id: firestore.collection('tmp').doc().id,
            timestamp: new Date().toISOString(),
        }
        await convoRef.update({
            messages: FieldValue.arrayUnion(newMessage),
            lastMessageAt: FieldValue.serverTimestamp()
        });
        return { success: true, message: newMessage };
    } catch (error: any) {
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
}

// ... AI and Search Actions (logic remains correct)
