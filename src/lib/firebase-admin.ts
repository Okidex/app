import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once per server instance.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    return {
        auth: admin.auth,
        firestore: admin.firestore,
        storage: admin.storage
    }
}

