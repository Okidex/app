import { initializeApp, getApps, getApp } from "firebase/app";

// Your current config
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// SAFE INITIALIZATION:
// Only initialize if we have an API Key (prevents build crash)
// and if we haven't already initialized an app.
const app = (getApps().length === 0 && firebaseConfig.apiKey)
  ? initializeApp(firebaseConfig)
  : (getApps().length > 0 ? getApp() : null);

export { app };
