// src/lib/firebase-admin.ts
import * as admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
if (admin.apps.length === 0) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // When running locally, we use the service account key file.
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
