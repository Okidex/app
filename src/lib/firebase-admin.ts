import admin from 'firebase-admin';

export function initializeAdminApp() {
    if (!admin.apps.length) {
      try {
        if (process.env.VERCEL) { // Vercel environment
             admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
        } else { // Firebase App Hosting or local emulator
            admin.initializeApp();
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
