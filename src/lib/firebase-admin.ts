
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      try {
        // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is automatically set
        // and initializeApp() will use it.
        admin.initializeApp();
      } catch (e: any) {
        // This catch block is for local development where you might not have the
        // GOOGLE_APPLICATION_CREDENTIALS env var set.
        console.error("Firebase Admin SDK initialization failed. Ensure you've run 'firebase login' and 'firebase apphosting:secrets:set' for local development.", e.message);
      }
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

