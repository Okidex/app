
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      try {
        // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is automatically set
        // and initializeApp() will use it.
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
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
