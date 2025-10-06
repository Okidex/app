
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      admin.initializeApp({
        // If you have service account credentials, you can pass them in here.
        // Otherwise, it will try to use Application Default Credentials.
      });
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

