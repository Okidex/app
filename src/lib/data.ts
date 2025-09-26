

import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { FullUserProfile, InvestmentStage } from './types';

// This file is now simplified to hold only static configuration data.
// All user and dynamic data fetching is handled through Firebase.

export const investmentStages: InvestmentStage[] = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];


/**
 * Gets the currently authenticated user's profile from Firestore.
 * This is a server-side function. For client-side, use a hook with onAuthStateChanged.
 * @returns {Promise<FullUserProfile | null>} The user's full profile or null if not logged in.
 */
export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) {
    // This part is tricky because auth state is often not immediately available on server.
    // A more robust solution involves session cookies or waiting for auth state.
    // For this prototype, we'll assume client-side auth state is managed correctly.
    return null;
  }

  const userDocRef = doc(db, "users", firebaseUser.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data() as FullUserProfile;
  }

  return null;
}

/**
 * Gets a user's profile by their ID.
 * @param {string} userId The ID of the user to fetch.
 * @returns {Promise<FullUserProfile | null>} The user's full profile or null if not found.
 */
export async function getUserById(userId: string): Promise<FullUserProfile | null> {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        return userDocSnap.data() as FullUserProfile;
    }

    return null;
}

// All mock data arrays (users, startups, jobs, theses, conversations, notifications, interests) have been removed.
// They will be replaced by Firestore queries in their respective components or pages.

