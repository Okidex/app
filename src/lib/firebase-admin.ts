
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (admin.apps.length === 0) {
      // When running locally via `npm run db:seed`, `dotenv/config` loads the .env file.
      // We check for GOOGLE_APPLICATION_CREDENTIALS to determine if we are in that local environment.
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Use the service account key and explicitly provide the projectId for local development.
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
      } else {
        // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is not set by us.
        // In this case, initializeApp() will automatically use the production service account.
        admin.initializeApp();
      }
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

