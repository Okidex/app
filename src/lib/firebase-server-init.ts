import 'server-only';
import admin from 'firebase-admin';

const ADMIN_APP_NAME = 'okidex-admin-app';

let app: admin.app.App;

if (!admin.apps.some((a) => a?.name === ADMIN_APP_NAME)) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (!serviceAccountString) {
      throw new Error("Firebase service account credentials not found.");
    }

    const isBase64 = !serviceAccountString.trim().startsWith('{');
    const serviceAccountJson = isBase64
      ? Buffer.from(serviceAccountString, 'base64').toString('utf8')
      : serviceAccountString;

    const serviceAccount = JSON.parse(serviceAccountJson);

    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }, ADMIN_APP_NAME);

  } catch (error: any) {
    console.error("Firebase Admin initialization failed:", error.message);
    const existingApp = admin.apps.find(a => a?.name === ADMIN_APP_NAME);
    if (existingApp) {
      app = existingApp;
    } else {
      throw error;
    }
  }
} else {
  app = admin.app(ADMIN_APP_NAME);
}

// Fixed: Added getDb export to satisfy imports in Stripe actions
export const getDb = () => app.firestore();

export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export { admin as firebaseAdmin }; // Renamed from 'admin' to avoid local naming collisions
