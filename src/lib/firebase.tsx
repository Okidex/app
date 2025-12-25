import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Safety check for 2025: Ensure the app doesn't crash during build if env vars are missing
if (!firebaseConfig.apiKey && typeof window !== 'undefined') {
  console.warn("Firebase API Key is missing. Check your .env.local file.");
}

// 1. Initialize the App (Singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 2. Initialize Services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// 3. EXPLICIT NAMED EXPORTS (Fixes the "Attempted import error")
export { app, auth, firestore, storage };

// Default export as a fallback
export default app;
