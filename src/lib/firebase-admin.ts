import * as admin from 'firebase-admin';

export function initializeAdminApp() {
  if (admin.apps.length === 0) {
    try {
      // 1. Attempt default initialization (Works in Firebase App Hosting)
      admin.initializeApp();
    } catch (error) {
      // 2. Fallback for Local/Studio development
      // Ensure these keys are in your dev.nix and synced to .env.local
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Replace escaped newlines if they are passed as strings
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  }

  return {
    auth: admin.auth(),
    firestore: admin.firestore(),
    storage: admin.storage(),
  };
}

// Export a singleton instance for easier use
export const adminApp = initializeAdminApp();
