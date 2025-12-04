'use server';

import 'server-only';
import admin from 'firebase-admin';

// ... (interfaces and adminServices variable remain the same) ...
interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;


function getServiceAccount(): admin.ServiceAccount {
  // CHANGE 1: Use the correct environment variable name
  const serviceAccountJson = process.env.FIREBASE_ADMIN_KEY;
  if (!serviceAccountJson) {
    throw new Error(
      // CHANGE 2: Update the error message for clarity
      "The FIREBASE_ADMIN_KEY environment variable is not set. This is required for server-side operations."
    );
  }
  try {
    return JSON.parse(serviceAccountJson);
  } catch (e: any) {
    // CHANGE 3: Update the error message for clarity
    console.error('Failed to parse FIREBASE_ADMIN_KEY JSON from environment variable.', e);
    throw new Error("Failed to parse FIREBASE_ADMIN_KEY. Ensure it's a valid, un-escaped JSON string.");
  }
}

// ... (the rest of the initializeAdminApp function remains unchanged) ...
export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  if (admin.apps.length > 0) {
    if (adminServices) {
      return adminServices;
    }
    const app = admin.app();
    adminServices = {
      auth: app.auth(),
      firestore: app.firestore(),
      storage: app.storage(),
    };
    return adminServices;
  }

  try {
    const serviceAccount = getServiceAccount();
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id;

    if (!projectId) {
       throw new Error("Could not determine Firebase Project ID. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID or ensure project_id is in your service account.");
    }

    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: projectId,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
    });

    adminServices = {
      auth: app.auth(),
      firestore: app.firestore(),
      storage: app.storage(),
    };

  } catch (e: any) {
    console.error("Could not initialize Firebase Admin SDK.", e);
    throw new Error(`Could not initialize Firebase Admin SDK. Original error: ${e.message}`);
  }

  return adminServices;
}

