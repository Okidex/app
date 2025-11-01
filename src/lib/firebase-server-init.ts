
import 'server-only';
import admin from 'firebase-admin';
import { firebaseConfig } from '@/firebase/config';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
if (admin.apps.length === 0) {
  // When running in a deployed environment (like Firebase App Hosting),
  // NODE_ENV will be 'production' and GOOGLE_APPLICATION_CREDENTIALS will be set automatically.
  if (process.env.NODE_ENV === 'production') {
    admin.initializeApp();
    console.log("Firebase Admin SDK initialized with Application Default Credentials.");
  } else {
    // For local development, use the service account key from environment variables.
    try {
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      if (!serviceAccountKey) {
          throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set for local development.');
      }
      const serviceAccount = JSON.parse(
        Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
      );
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket,
      });
      console.log("Firebase Admin SDK initialized with service account for local development.");
    } catch (e: any) {
        console.error("Firebase Admin SDK local initialization failed. Ensure FIREBASE_SERVICE_ACCOUNT_KEY is set correctly in your .env file.", e.message);
        // Throwing the error is important to prevent the app from running with a misconfigured backend.
        throw new Error("Firebase Admin SDK local initialization failed.");
    }
  }
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();
export { admin };
