import 'server-only';
import admin from 'firebase-admin';

const ADMIN_APP_NAME = 'okidex-admin-app';

/**
 * Initialize the Firebase Admin SDK as a singleton to prevent
 * "App already exists" errors during Next.js Hot Module Replacement (HMR).
 */
function getAdminApp(): admin.app.App {
  const existingApp = admin.apps.find((a) => a?.name === ADMIN_APP_NAME);
  if (existingApp) return existingApp;

  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (!serviceAccountString) {
      throw new Error("Firebase service account credentials not found in environment variables.");
    }

    // Detect if the string is Base64 or raw JSON
    const isBase64 = !serviceAccountString.trim().startsWith('{');
    const serviceAccountJson = isBase64
      ? Buffer.from(serviceAccountString, 'base64').toString('utf8')
      : serviceAccountString;

    const serviceAccount = JSON.parse(serviceAccountJson);

    // Fix escaped newlines in the private key (common in CI/CD env vars)
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }, ADMIN_APP_NAME);

  } catch (error: any) {
    console.error("Firebase Admin initialization failed:", error.message);
    // Final fallback: check if another process initialized the app simultaneously
    const fallbackApp = admin.apps.find(a => a?.name === ADMIN_APP_NAME);
    if (fallbackApp) return fallbackApp;
    throw error;
  }
}

// Initialize the app instance
const app = getAdminApp();

/**
 * EXPORTS
 * Using direct exports for better tree-shaking and compatibility with Next.js 16
 */
export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();

// Compatibility export for Stripe actions
export const getDb = () => db;

// Renamed export to avoid naming collisions with 'admin' import
export { admin as firebaseAdmin };
