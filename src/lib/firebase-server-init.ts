'use server-only';

import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

interface FirebaseAdminServices {
  auth: Auth;
  firestore: Firestore;
  storage: Storage;
}

function getServiceAccount() {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing Firebase Admin environment variables.');
  }

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    // Fix for private key newline characters in environment variables
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

/**
 * Modern modular initialization for 2025.
 */
export function getFirebaseAdmin(): FirebaseAdminServices {
  const apps = getApps();
  let app: App;

  if (!apps.length) {
    const serviceAccount = getServiceAccount();
    app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.projectId}.appspot.com`,
    });
  } else {
    app = getApp();
  }

  return {
    auth: getAuth(app),
    firestore: getFirestore(app),
    storage: getStorage(app),
  };
}

/**
 * Individual exports for Server Actions.
 * Note: These call the function dynamically to ensure the app is ready.
 */
export const adminAuth = () => getFirebaseAdmin().auth;
export const adminDb = () => getFirebaseAdmin().firestore;
export const adminStorage = () => getFirebaseAdmin().storage;

// Keep for backward compatibility with your existing actions
export const initializeAdminApp = getFirebaseAdmin;
