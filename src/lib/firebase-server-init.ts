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

// Singleton instance to prevent re-initialization
let adminServices: FirebaseAdminServices | null = null;

/**
 * Retrieves the service account credentials from the appropriate source.
 */
function getServiceAccount(): admin.ServiceAccount {
  const keyFilePath = path.join(process.cwd(), 'service_account_key.json');
  if (fs.existsSync(keyFilePath)) {
    try {
      const serviceAccount = fs.readFileSync(keyFilePath, 'utf8');
      if (!serviceAccount) {
        throw new Error('The service_account_key.json file is empty.');
      }
      return JSON.parse(serviceAccount);
    } catch (e: any) {
      console.error(`Failed to read or parse service account file at ${keyFilePath}.`, e);
      throw new Error(
        `Could not parse the service account file. Error: ${e.message}`
      );
    }
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT from .env.local.', e);
      throw new Error(
        "Failed to parse FIREBASE_SERVICE_ACCOUNT. Ensure it's a valid JSON string."
      );
    }
  }
  
  throw new Error(
    'Could not find Firebase credentials.'
  );
}

/**
 * Initializes the Firebase Admin SDK if it hasn't been already.
 * This function is a singleton and will only initialize the app once.
 * @returns {Promise<FirebaseAdminServices>} A promise that resolves with the initialized admin services.
 */
// MODIFIED: Added 'async' keyword and changed return type to Promise<T>
export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  // Return the existing instance if it's already been initialized.
  if (adminServices) {
    return adminServices;
  }

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

  // Store the initialized services in the singleton instance.
  // We use the non-null assertion operator (!) here as the checks above guarantee initialization
  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}

