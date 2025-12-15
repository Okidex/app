'use client'; // Important for Next.js to treat this as client-side code where Firebase client SDKs run

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// 1. Firebase Configuration (Keep as is)
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// --- Recommended Helper Function for Initialization ---
function createFirebaseApp() {
  if (typeof window === 'undefined') return null; // Ensure this only runs client-side

  if (getApps().length > 0) {
    return getApp();
  } else {
    return initializeApp(firebaseConfig);
  }
}

// 2. Initialize the App once and export services directly
export const firebaseApp = createFirebaseApp();

// Conditionally export auth, firestore, etc., only if the app initialized successfully (client-side)
export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;
export const firestore: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;
export const storage: FirebaseStorage | null = firebaseApp ? getStorage(firebaseApp) : null;


// 3. Add your React Context Provider code *here* (lines 114-118 from original error report):

/*
// Example of the missing code you need to place here in src/firebase.tsx
const FirebaseContext = createContext({
  auth,
  firestore,
  // ... other services
});

export function FirebaseProvider({ children }) {
  const contextValue = useMemo(() => ({ auth, firestore, storage }), []);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
}
*/
