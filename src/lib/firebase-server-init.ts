'use server-only';

import * as admin from 'firebase-admin';
import { getApps, getApp, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

function getServiceAccount() {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing Firebase Admin environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).');
  }

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    // Ensure the private key is properly formatted for Node.js
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

/**
 * Core function to initialize or retrieve the Firebase Admin instance.
 */
export function getFirebaseAdmin(): FirebaseAdminServices {
  const existingApps = getApps();
  let app: admin.app.App;

  if (existingApps.length === 0) {
    const serviceAccount = getServiceAccount();
    app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.projectId}.appspot.com`,
    });
    console.log('Firebase Admin initialized successfully.');
  } else {
    app = getApp();
  }

  return {
    auth: getAuth(app),
    firestore: getFirestore(app),
    storage: getStorage(app),
  };
}

// --- EXPORTS FOR BACKWARD COMPATIBILITY ---

// Fixes: "Attempted import error: 'initializeAdminApp' is not exported"
export const initializeAdminApp = getFirebaseAdmin;

// Named exports for direct use in Server Actions
const services = getFirebaseAdmin();
export const adminAuth = services.auth;
export const adminDb = services.firestore;
export const adminStorage = services.storage;
