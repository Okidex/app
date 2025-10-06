
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      // In a managed environment like Firebase App Hosting,
      // call initializeApp() without arguments to use Application Default Credentials.
      admin.initializeApp();
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

