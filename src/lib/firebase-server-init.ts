
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
 * For local development, it reads from the FIREBASE_SERVICE_ACCOUNT environment variable.
 * For production builds (like in GitHub Actions), it reads from a 'service_account_key.json' file.
 * @returns {admin.ServiceAccount} The parsed service account object.
 */
function getServiceAccount(): admin.ServiceAccount {
  // 1. Try reading from environment variable (for local development)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT from .env.local.', e);
      throw new Error(
        "Failed to parse FIREBASE_SERVICE_ACCOUNT. Ensure it's a valid, un-escaped JSON string in your .env.local file. See .env.local.example for guidance."
      );
    }
  }

  // 2. Try reading from the key file (for production/deployment)
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

  // 3. If neither method works, throw a comprehensive error.
  throw new Error(
    'Could not find Firebase credentials. For local development, set the FIREBASE_SERVICE_ACCOUNT in your .env.local file. For production builds, ensure the service_account_key.json file is created correctly during your CI/CD process.'
  );
}

/**
 * Initializes the Firebase Admin SDK if it hasn't been already.
 * This function is a singleton and will only initialize the app once.
 * It intelligently sources credentials for both local and production environments.
 * @returns {Promise<FirebaseAdminServices>} A promise that resolves with the initialized admin services.
 */
export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  // Return the existing instance if it's already been initialized.
  if (adminServices) {
    return adminServices;
  }

  // Initialize the app if it's the first time.
  if (admin.apps.length === 0) {
    try {
      const serviceAccount = getServiceAccount();
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id;
  
      if (!projectId) {
         throw new Error("Could not determine Firebase Project ID. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID or ensure project_id is in your service account.");
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
      });

    } catch (e: any) {
      console.error("Could not initialize Firebase Admin SDK.", e);
      // Re-throw with a user-friendly message, but include the original error.
      throw new Error(`Could not initialize Firebase Admin SDK. There might be an issue with the credentials. Original error: ${e.message}`);
    }
  }

  // Store the initialized services in the singleton instance.
  adminServices = {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };

  return adminServices;
}

