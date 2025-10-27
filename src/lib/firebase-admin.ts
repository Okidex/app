
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (admin.apps.length === 0) {
      // When running locally, we use the service account key file.
      // The `GOOGLE_APPLICATION_CREDENTIALS` env var is set in the `.env` file
      // and loaded by the `db:seed` script.
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          // The projectId is also needed for the local environment
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
      } else {
        // When deployed to App Hosting, initializeApp() with no arguments
        // will automatically use the production service account.
        admin.initializeApp();
      }
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

