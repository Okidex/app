
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (admin.apps.length === 0) {
      // When deployed to App Hosting, initializeApp() with no arguments
      // will automatically use the production service account.
      // For local development (including `npm run build`), the GOOGLE_APPLICATION_CREDENTIALS
      // environment variable must be set in the `.env.local` file.
      admin.initializeApp();
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

