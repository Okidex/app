import 'server-only'; // Ensures this file never runs on the client
import admin from 'firebase-admin';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

// Global variable to persist the admin instance during HMR/Build
let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount(): admin.ServiceAccount {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error('Firebase Admin environment variables are missing.');
  }

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    // Fixes formatting issues with private keys in .env files
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

/**
 * Modern 2025 initialization helper.
 */
export function getFirebaseAdmin(): FirebaseAdminServices {
  if (adminServices) return adminServices;

  if (admin.apps.length === 0) {
    try {
      const serviceAccount = getServiceAccount();

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Fallback to newer 2025 storage bucket naming convention
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.projectId}.firebasestorage.app`,
      });
      
      console.log('Firebase Admin initialized successfully.');
    } catch (error: any) {
      console.error('Firebase Admin initialization error:', error.message);
      throw new Error('Failed to initialize Firebase Admin SDK.');
    }
  }

  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}

/**
 * CRITICAL BUILD FIX:
 * Alias to support legacy code importing 'initializeAdminApp'
 */
export const initializeAdminApp = getFirebaseAdmin;
