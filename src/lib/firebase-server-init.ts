
'use server';

import 'server-only';
import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount() {
  // For local development, use the FIREBASE_SERVICE_ACCOUNT from .env.local
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable.', e);
      throw new Error(
        "Failed to parse FIREBASE_SERVICE_ACCOUNT from .env.local. Ensure it's a valid, un-escaped JSON string."
      );
    }
  }

  // For production deployment (GitHub Actions), use the created key file.
  const keyFilePath = path.join(process.cwd(), 'service_account_key.json');
  if (fs.existsSync(keyFilePath)) {
    try {
      const serviceAccount = fs.readFileSync(keyFilePath, 'utf8');
      if (!serviceAccount) {
        throw new Error('Service account file is empty.');
      }
      return JSON.parse(serviceAccount);
    } catch (e: any) {
      console.error(`Failed to read or parse service account file at ${keyFilePath}.`, e);
      throw new Error(
        `Could not parse the service account file. Error: ${e.message}`
      );
    }
  }

  throw new Error(
    "Could not find Firebase credentials. Please make sure either the FIREBASE_SERVICE_ACCOUNT environment variable is set for local development or the service_account_key.json file exists for production builds."
  );
}

export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  if (adminServices) {
    return adminServices;
  }

  if (admin.apps.length === 0) {
    const serviceAccount = getServiceAccount();
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id;

    if (!projectId) {
       throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in the environment variables, and project_id is missing from the service account.");
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

