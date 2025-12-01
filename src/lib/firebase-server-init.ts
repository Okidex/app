'use server';

import 'server-only';
import admin from 'firebase-admin';
// Import the 'fs' module for file system operations (Node.js built-in)
import fs from 'fs';
// Use Node's built-in 'path' module to resolve absolute paths
import path from 'path';

interface FirebaseAdminServices {
  auth: admin.auth.Auth;
  firestore: admin.firestore.Firestore;
  storage: admin.storage.Storage;
}

let adminServices: FirebaseAdminServices | null = null;

function getServiceAccount() {
  // --- CHANGE MADE HERE ---
  // Use the new, non-reserved environment variable name
  const serviceAccountEnv = process.env.SERVICE_ACCOUNT_JSON;

  if (!serviceAccountEnv) {
    // Update the error message to reflect the new variable name
    throw new Error("SERVICE_ACCOUNT_JSON environment variable is not set. This is required for server-side operations.");
  }

  // --- Start of FIX: Handle both JSON string and file path inputs ---
  try {
    // Attempt 1: Try parsing the environment variable content as a raw JSON string
    return JSON.parse(serviceAccountEnv);
  } catch (e) {
    // If JSON parsing fails, assume the environment variable is a file path
    try {
      // Resolve the absolute path to ensure correct file finding
      const absolutePath = path.resolve(serviceAccountEnv);
      // Read the file content and parse it as JSON
      const fileContent = fs.readFileSync(absolutePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (fileError) {
      // If both attempts fail, log the errors and throw a final error
      console.error('Failed to parse SERVICE_ACCOUNT_JSON JSON string or read file path.', { envParseError: e, fileReadError: fileError });
      throw new Error("Failed to parse SERVICE_ACCOUNT_JSON. Ensure it's a valid JSON string OR a correct file path.");
    }
  }
  // --- End of FIX ---
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

