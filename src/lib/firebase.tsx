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

// Initialize Firebase (Singleton pattern)
// Standard modular initialization is generally safe in Next.js 15
// as long as you don't call Auth/Firestore methods directly on the server.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export constants directly to fix the "Attempted import error"
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Export app instance in case it is needed for other services
export default app;
