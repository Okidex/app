
import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
if (!admin.apps.length) {
  admin.initializeApp();
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();

