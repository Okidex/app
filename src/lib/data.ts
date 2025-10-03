
import { doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { FullUserProfile, InvestmentStage } from './types';

export const investmentStages: InvestmentStage[] = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];

export async function getCurrentUser(): Promise<FullUserProfile | null> {
  const { auth, firestore } = initializeFirebase();
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) {
    return null;
  }

  const userDocRef = doc(firestore, "users", firebaseUser.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data() as FullUserProfile;
  }

  return null;
}

export async function getUserById(userId: string): Promise<FullUserProfile | null> {
    const { firestore } = initializeFirebase();
    const userDocRef = doc(firestore, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        return userDocSnap.data() as FullUserProfile;
    }

    return null;
}

    
