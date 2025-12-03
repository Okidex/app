
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

function getServiceAccount(): admin.ServiceAccount {
  // Priority 1: GitHub Actions environment variable with absolute path
  if (process.env.SERVICE_ACCOUNT_KEY_PATH && fs.existsSync(process.env.SERVICE_ACCOUNT_KEY_PATH)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(process.env.SERVICE_ACCOUNT_KEY_PATH, 'utf8'));
      if (!serviceAccount) throw new Error('Service account file from SERVICE_ACCOUNT_KEY_PATH is empty.');
      return serviceAccount;
    } catch (e: any) {
      console.error(`Failed to parse service account file from SERVICE_ACCOUNT_KEY_PATH at ${process.env.SERVICE_ACCOUNT_KEY_PATH}.`, e);
      throw new Error(`Could not parse the service account file from environment variable. Error: ${e.message}`);
    }
  }

  // Priority 2: Local development path from project root as specified by the user.
  const localKeyPath = path.resolve(process.cwd(), 'wilfredwong/app/service_account_key.json');
  if (fs.existsSync(localKeyPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(localKeyPath, 'utf8'));
      if (!serviceAccount) throw new Error('Local service account file is empty.');
      return serviceAccount;
    } catch (e: any) {
      console.error(`Failed to parse local service account file at ${localKeyPath}.`, e);
      throw new Error(`Could not parse local service account file. Error: ${e.message}`);
    }
  }
  
  // Priority 3: Fallback to environment variable for other setups (e.g. Vercel)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT from environment variable.', e);
      throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT. Ensure it's a valid, un-escaped JSON string.");
    }
  }
  
  throw new Error('Could not find Firebase credentials. Checked SERVICE_ACCOUNT_KEY_PATH, local path, and FIREBASE_SERVICE_ACCOUNT env var.');
}

export async function initializeAdminApp(): Promise<FirebaseAdminServices> {
  if (adminServices) {
    return adminServices;
  }

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

