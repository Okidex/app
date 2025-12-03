
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
  // Path for GitHub Actions and other environments where the key is at the root
  const rootKeyPath = path.join(process.cwd(), 'service_account_key.json');

  if (fs.existsSync(rootKeyPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(rootKeyPath, 'utf8'));
      if (!serviceAccount) throw new Error('Service account file is empty.');
      return serviceAccount;
    } catch (e: any) {
      console.error(`Failed to parse service account file at ${rootKeyPath}.`, e);
      throw new Error(`Could not parse the service account file. Error: ${e.message}`);
    }
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT from environment variable.', e);
      throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT. Ensure it's a valid, un-escaped JSON string.");
    }
  }
  
  throw new Error('Could not find Firebase credentials. Searched for service_account_key.json in project root and checked FIREBASE_SERVICE_ACCOUNT env var.');
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

