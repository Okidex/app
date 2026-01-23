import 'server-only';
import admin from 'firebase-admin';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount(): admin.ServiceAccount {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID) throw new Error('Missing FIREBASE_PROJECT_ID');
  if (!FIREBASE_CLIENT_EMAIL) throw new Error('Missing FIREBASE_CLIENT_EMAIL');
  if (!FIREBASE_PRIVATE_KEY) throw new Error('Missing FIREBASE_PRIVATE_KEY');

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

export function getFirebaseAdmin(): FirebaseAdminServices {
  if (adminServices) return adminServices;

  if (admin.apps.length === 0) {
    try {
      const serviceAccount = getServiceAccount();

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Use the modern 2026 .firebasestorage.app domain
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.projectId}.firebasestorage.app`,
      });
      
      admin.firestore().settings({
        ignoreUndefinedProperties: true,
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

export const initializeAdminApp = getFirebaseAdmin;
