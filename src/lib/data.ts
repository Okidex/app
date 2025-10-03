
import { initializeAdminApp } from './firebase-admin';
import { FullUserProfile, InvestmentStage } from './types';
import { getAuth } from 'firebase-admin/auth';

export const investmentStages: InvestmentStage[] = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];

export async function getCurrentUser(idToken?: string): Promise<FullUserProfile | null> {
  const { auth, firestore } = initializeAdminApp();
  
  if (!idToken) {
    return null;
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const userDocRef = firestore.collection("users").doc(uid);
    const userDocSnap = await userDocRef.get();

    if (userDocSnap.exists) {
      return userDocSnap.data() as FullUserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
    const { firestore } = initializeAdminApp();
    const userDocRef = firestore.collection("users").doc(userId);
    const userDocSnap = await userDocRef.get();

    if (userDocSnap.exists) {
        return userDocSnap.data() as FullUserProfile;
    }

    return null;
}

    
