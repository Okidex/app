import admin from 'firebase-admin';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      try {
        if (process.env.GCP_PROJECT) {
            // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is automatically set
            // and initializeApp() will use it.
            admin.initializeApp();
        } else {
             admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            });
        }
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