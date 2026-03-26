import 'server-only';
import admin from 'firebase-admin';

const ADMIN_APP_NAME = 'okidex-admin-app';

/**
 * [DEBUGGER] Firebase Admin Initialization
 * Hardened to prevent crashes when service account credentials are missing or malformed.
 * Provides detailed logs during the boot sequence.
 */
function getAdminApp(): admin.app.App | null {
  const existingApp = admin.apps.find((a) => a?.name === ADMIN_APP_NAME);
  if (existingApp) {
    console.log('[DEBUGGER-ADMIN] Using existing Admin instance.');
    return existingApp;
  }

  const timestamp = new Date().toISOString();
  console.log(`[DEBUGGER-ADMIN] [${timestamp}] Initializing Firebase Admin SDK...`);

  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT;
    
    // Check if individual variables exist
    const hasIndividualVars = process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY;
    
    if (!serviceAccountString && !hasIndividualVars) {
      console.warn('[DEBUGGER-ADMIN] ==================================================');
      console.warn('[DEBUGGER-ADMIN] FATAL: FIREBASE_SERVICE_ACCOUNT environment variable is missing.');
      console.warn('[DEBUGGER-ADMIN] Current Env:');
      console.warn(`[DEBUGGER-ADMIN] - FIREBASE_PROJECT_ID: ${!!process.env.FIREBASE_PROJECT_ID}`);
      console.warn(`[DEBUGGER-ADMIN] - FIREBASE_CLIENT_EMAIL: ${!!process.env.FIREBASE_CLIENT_EMAIL}`);
      console.warn(`[DEBUGGER-ADMIN] - FIREBASE_PRIVATE_KEY: ${!!process.env.FIREBASE_PRIVATE_KEY}`);
      console.warn('[DEBUGGER-ADMIN] Server-side features will be completely disabled. auth is returning null.');
      console.warn('[DEBUGGER-ADMIN] ==================================================');
      return null;
    }

    let serviceAccount;
    try {
      if (hasIndividualVars && !serviceAccountString) {
          serviceAccount = {
              project_id: process.env.FIREBASE_PROJECT_ID,
              client_email: process.env.FIREBASE_CLIENT_EMAIL,
              private_key: process.env.FIREBASE_PRIVATE_KEY,
          };
          console.log(`[DEBUGGER-ADMIN] Fallback: Using individual FIREBASE_* environment variables.`);
      } else {
        const isBase64 = !serviceAccountString?.trim().startsWith('{');
        const serviceAccountJson = isBase64
          ? Buffer.from(serviceAccountString as string, 'base64').toString('utf8')
          : serviceAccountString;
  
        serviceAccount = JSON.parse(serviceAccountJson as string);
        console.log(`[DEBUGGER-ADMIN] SUCCESS: Parsed service account json for project: ${serviceAccount.project_id}`);
      }
    } catch (parseError: any) {
      console.error('[DEBUGGER-ADMIN] ERROR: Failed to parse service account JSON:', parseError.message);
      return null;
    }

    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key
        .replace(/\\n/g, '\n')
        .replace(/"/g, '')
        .trim();
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id,
    }, ADMIN_APP_NAME);

  } catch (error: any) {
    console.error("[DEBUGGER-ADMIN] FATAL Initialization Error:", error.message);
    return null;
  }
}

const app = getAdminApp();

// Export services with safety fallbacks
export const db = app ? app.firestore() : null as unknown as admin.firestore.Firestore;
export const auth = app ? app.auth() : null as unknown as admin.auth.Auth;
export const storage = app ? app.storage() : null as unknown as admin.storage.Storage;

export const getDb = () => db;
export { admin as firebaseAdmin };
