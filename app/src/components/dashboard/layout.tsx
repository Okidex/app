import 'server-only';
import admin from 'firebase-admin';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountJson) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set. This is required for server-side operations.");
  }
  try {
    return JSON.parse(serviceAccountJson);
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON.', e);
    throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT. Ensure it's a valid JSON string.");
  }
}

export function initializeAdminApp(): FirebaseAdminServices {
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
    } catch (e: any) {
      console.error("Could not initialize Firebase Admin SDK.", e.message);
      throw new Error("Could not initialize Firebase Admin SDK. There might be an issue with the provided credentials.");
    }
  }

  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}