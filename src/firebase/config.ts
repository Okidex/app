import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 1. Initialize App (Singleton pattern)
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// 2. Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * 3. Client-Side Persistence Fix
 * For Next.js 15 Apps using Server Actions + Session Cookies (__session):
 * We set persistence to 'inMemoryPersistence' on the client.
 * This ensures the Firebase Client SDK doesn't fight with your Server-side
 * cookies for 'control' over the user session, fixing redirect loops.
 */
if (typeof window !== "undefined") {
  setPersistence(auth, inMemoryPersistence);
}

export { app, auth, db, storage };
