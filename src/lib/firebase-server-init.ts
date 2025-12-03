'use server';

import 'server-only';
import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// ... (Interface and getServiceAccount function remain the same) ...
interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount(): admin.ServiceAccount {
  // ... (implementation remains the same) ...
}


/**
 * Initializes the Firebase Admin SDK if it hasn't been already.
 * This function is a singleton and will only initialize the app once.
 * @returns {FirebaseAdminServices} The initialized admin services.
 */
export function initializeAdminApp(): FirebaseAdminServices { // Removed async
  if (adminServices) {
    return adminServices;
  }

  // Check if an app is already initialized in the current process (safety check)
  if (admin.apps.length === 0) {
    try {
      const serviceAccount = getServiceAccount();
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id;
  
      if (!projectId) {
         throw new Error("Could not determine Firebase Project ID.");
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

