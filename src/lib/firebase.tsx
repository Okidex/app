'use client';

import { createContext, useContext, useMemo, ReactNode } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// 1. Configuration (Keep your existing env variables)
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 2. Initialization
function createFirebaseApp() {
  if (typeof window === 'undefined') return null;
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export const firebaseApp = createFirebaseApp();
export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;
export const firestore: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;
export const storage: FirebaseStorage | null = firebaseApp ? getStorage(firebaseApp) : null;

// --- 3. CONTEXT & PROVIDER LOGIC (REPAIR) ---

// Define the shape of your context
interface FirebaseContextType {
  auth: Auth | null;
  firestore: Firestore | null;
  storage: FirebaseStorage | null;
}

// Create the context with a default null value
const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  // useMemo prevents unnecessary re-renders of child components
  const contextValue = useMemo(() => ({ auth, firestore, storage }), []);

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

// 4. Custom hook for consumption
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
