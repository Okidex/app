// src/lib/firebase-admin.ts
import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Correctly initialize with the service account key when running locally or on a server.
    const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } else {
     // When deployed to App Hosting, initializeApp() with no arguments
    // will automatically use the production service account.
    admin.initializeApp();
  }
}

const auth = admin.auth();
const firestore = admin.firestore();
const storage = admin.storage();

export { auth, firestore, storage };

