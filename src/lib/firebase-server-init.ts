'use server';

import 'server-only';
import admin from 'firebase-admin';
// Remove fs and path imports as the SDK handles reading the file path provided by the OS environment variable.

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

// The custom getServiceAccount function is removed entirely.

export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  if (adminServices) {
    return adminServices;
  }

  if (admin.apps.length === 0) {
    // Check for the standard GOOGLE_APPLICATION_CREDENTIALS environment variable first.
    // The value of this variable must be an absolute file path to the service account JSON file.
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
       throw new Error("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set. A file path to service account JSON is required.");
    }
    
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    // Note: The SDK can often infer the projectId from the credentials file itself,
    // but keeping this explicit check is fine.

    if (!projectId) {
       throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in the environment variables.");
    }

    try {
      // The admin.initializeApp() function will automatically use
      // the file path provided in GOOGLE_APPLICATION_CREDENTIALS when initialized this way.
      admin.initializeApp({
        // 'credential' argument is omitted to use auto-discovery via the env variable
        projectId: projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
      });
      console.log("Firebase Admin SDK initialized using GOOGLE_APPLICATION_CREDENTIALS.");
    } catch (e: any) {
      console.error("Could not initialize Firebase Admin SDK.", e.message);
      throw new Error("Could not initialize Firebase Admin SDK. There might be an issue with the credentials file path or permissions.");
    }
  }

  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}

