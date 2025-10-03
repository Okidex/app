
import { doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { FullUserProfile, InvestmentStage } from './types';
import { auth } from './firebase';

export const investmentStages: InvestmentStage[] = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const { auth, db } = initializeFirebase();
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) {
    return null;
  }

  const userDocRef = doc(db, "users", firebaseUser.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data() as FullUserProfile;
  }

  return null;
}

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
    const { db } = initializeFirebase();
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        return userDocSnap.data() as FullUserProfile;
    }

    return null;
}

