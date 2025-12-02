'use server';

import 'server-only';
import admin from 'firebase-admin';
// Remove fs and path imports
// import fs from 'fs';
// import path from 'path';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount() {
  // Use the env var name we will set in the workflow
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_RAW;

  if (!serviceAccountString) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_RAW environment variable is not set.");
  }

  // ONLY attempt to parse the environment variable content as a raw JSON string
  try {
    return JSON.parse(serviceAccountString);
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_RAW JSON string.', e);
    throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT_RAW. Ensure it's a valid JSON string.");
  }
}

export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  if (adminServices) {
    return adminServices;
  }

  if (admin.apps.length === 0) {
    const serviceAccount = getServiceAccount();
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    if (!projectId) {
       throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in the environment variables.");
    }

    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
      });
      console.log("Firebase Admin SDK initialized using raw JSON string.");
    } catch (e: any) {
      console.error("Could not initialize Firebase Admin SDK.", e.message);
      throw new Error("Could not initialize Firebase Admin SDK. Check the raw JSON credentials format.");
    }
  }

  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}

