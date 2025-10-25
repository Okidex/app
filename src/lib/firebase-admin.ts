
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (admin.apps.length === 0) {
      // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is automatically set
      // and initializeApp() will use the service account associated with the backend.
      //
      // When running locally, the 'db:seed' script in package.json uses 'dotenv/config'
      // to load the .env file, which sets the GOOGLE_APPLICATION_CREDENTIALS environment variable.
      // The Firebase Admin SDK automatically detects and uses this variable.
      admin.initializeApp();
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}
