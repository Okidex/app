
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (admin.apps.length === 0) {
      // When deployed to App Hosting, initializeApp() with no arguments
      // will automatically use the production service account. In local development,
      // the GOOGLE_APPLICATION_CREDENTIALS environment variable should be set.
      admin.initializeApp();
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

