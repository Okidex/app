
import 'server-only';
import admin from 'firebase-admin';
import { firebaseConfig } from '@/firebase/config';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
if (admin.apps.length === 0) {
  // When running locally, we use a service account key file.
  // In production (on App Hosting), GOOGLE_APPLICATION_CREDENTIALS is automatically set.
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("Initializing Firebase Admin with service account...");
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // We pass the explicit storageBucket from the shared config file.
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
    });
  } else if (process.env.NODE_ENV !== 'production') {
      console.warn("GOOGLE_APPLICATION_CREDENTIALS not set. Firebase Admin SDK not initialized for local development.");
  } else {
    // When deployed to App Hosting, initializeApp() with no arguments 
    // will automatically use the production service account.
    console.log("Initializing Firebase Admin with Application Default Credentials...");
    admin.initializeApp({
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
    });
  }
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();
export { admin };
