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

// 1. Build Guard: Check if we have a valid configuration.
// This prevents 'auth/invalid-api-key' crashes during GitHub Actions/Next.js Build.
const isConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined";

// 2. Initialize App (Singleton pattern)
let app: FirebaseApp;

if (getApps().length === 0) {
  // If config is invalid (during build), we initialize with a dummy config
  // to let the build finish. At runtime, the real secrets will be used.
  app = initializeApp(isConfigValid ? firebaseConfig : { ...firebaseConfig, apiKey: "AIza-BUILD-PLACEHOLDER" });
} else {
  app = getApp();
}

// 3. Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * 4. Client-Side Persistence Fix
 * For Next.js 15 Apps using Server Actions + Session Cookies (__session):
 * We set persistence to 'inMemoryPersistence' on the client.
 */
if (typeof window !== "undefined") {
  // Ensure we don't attempt persistence calls if the auth service is
  // currently using a placeholder key during build.
  if (isConfigValid) {
    setPersistence(auth, inMemoryPersistence).catch((err) => {
      console.error("Persistence error:", err);
    });
  }
}

export { app, auth, db, storage };
