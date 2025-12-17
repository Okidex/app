
'use server';

import 'server-only';
import admin from 'firebase-admin';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount(): admin.ServiceAccount {
  if (!process.env.FIREBASE_PROJECT_ID) {
    throw new Error('The FIREBASE_PROJECT_ID environment variable is not set.');
  }
  if (!process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error('The FIREBASE_CLIENT_EMAIL environment variable is not set.');
  }
  if (!process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('The FIREBASE_PRIVATE_KEY environment variable is not set.');
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  if (adminServices) {
    return adminServices;
  }

  if (admin.apps.length === 0) {
    try {
      const serviceAccount = getServiceAccount();
      const projectId = serviceAccount.projectId;

      if (!projectId) {
         throw new Error("Could not determine Firebase Project ID. Set FIREBASE_PROJECT_ID in your environment.");
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
      });

    } catch (e: any) {
      console.error("Could not initialize Firebase Admin SDK.", e);
      throw new Error(`Could not initialize Firebase Admin SDK. Original error: ${e.message}`);
    }
  }

  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}

