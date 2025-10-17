
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      try {
        // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is automatically set.
        // Calling initializeApp() without arguments uses these default credentials.
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
