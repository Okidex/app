// src/lib/firebase-admin.ts
import * as admin from 'firebase-admin';

let auth: admin.auth.Auth;
let firestore: admin.firestore.Firestore;
let storage: admin.storage.Storage;

// Prevent initializing the app multiple times during development hot-reloading
if (!admin.apps.length) {
  // Check for the environment variable, which should be set in .env.local
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("Initializing Firebase Admin with service account...");
    const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } else {
    // This is for production environments like Firebase App Hosting or other Google Cloud services
    // that handle Application Default Credentials automatically.
    console.log("Initializing Firebase Admin with default credentials...");
    admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
}

auth = admin.auth();
firestore = admin.firestore();
storage = admin.storage();

export { auth, firestore, storage, admin };

