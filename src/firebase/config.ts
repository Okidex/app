import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 1. Initialize App safely
let app: FirebaseApp;

if (getApps().length === 0) {
  // If we're missing an API key during build, use a placeholder to prevent crashes
  // while ensuring 'app' is never null for the client-side hooks.
  app = initializeApp(firebaseConfig.apiKey ? firebaseConfig : { ...firebaseConfig, apiKey: "placeholder" });
} else {
  app = getApp();
}

// 2. Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 3. Set Persistence (Fixes the "Double Login" race condition)
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence);
}

export { app, auth, db, storage };
