
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (admin.apps.length === 0) {
      try {
        // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is automatically set
        // and initializeApp() with no arguments will use it.
        admin.initializeApp();
      } catch (e: any) {
        console.error("Firebase Admin SDK initialization failed.", e.message);
      }
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}