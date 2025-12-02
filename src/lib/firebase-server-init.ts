'use server';

import 'server-only';
import admin from 'firebase-admin';
// No need to import fs or path anymore, the SDK handles reading the file.
// import fs from 'fs';
// import path from 'path';

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
    // The SDK will automatically look for GOOGLE_APPLICATION_CREDENTIALS
    // when initialized without specific credential arguments.
    
    // We add a check just for clarity/better error messaging if the env var is missing
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
       throw new Error("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set. A file path to service account JSON is required.");
    }
    
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    if (!projectId) {
       throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in the environment variables.");
    }

    try {
      // The admin.initializeApp() function will automatically use
      // the file path provided in GOOGLE_APPLICATION_CREDENTIALS
      admin.initializeApp({
        // credential: admin.credential.cert(...) is no longer necessary
        projectId: projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
      });
      console.log("Firebase Admin SDK initialized using GOOGLE_APPLICATION_CREDENTIALS.");
    } catch (e: any) {
      console.error("Could not initialize Firebase Admin SDK.", e.message);
      throw new Error("Could not initialize Firebase Admin SDK. There might be an issue with the credentials file path.");
    }
  }

  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}
