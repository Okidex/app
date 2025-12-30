// src/lib/firebase-server-init.ts
'use server-only';

// ADD getApps and getApp to this import line
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

  // The 'gm' flag handles global and multiline replacements reliably in 2025
  const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n');

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  };
}

export function getFirebaseAdmin(): FirebaseAdminServices {
  const apps = getApps(); // Now defined because of the import above
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

// Named exports for other services
export const adminAuth = () => getFirebaseAdmin().auth;
export const adminDb = () => getFirebaseAdmin().firestore;
export const adminStorage = () => getFirebaseAdmin().storage;
export const initializeAdminApp = getFirebaseAdmin;
