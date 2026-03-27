import 'server-only';
import admin from 'firebase-admin';

const ADMIN_APP_NAME = 'okidex-admin-app';

/**
 * [DEBUGGER] Firebase Admin Initialization (v2026)
 * Resolves "Missing Service Account" warnings by falling back to
 * Default Application Credentials in production environments.
 */
function getAdminApp(): admin.app.App | null {
  const existingApp = admin.apps.find((a) => a?.name === ADMIN_APP_NAME);
  if (existingApp) {
    return existingApp;
  }

  const timestamp = new Date().toISOString();
  console.log(`[DEBUGGER-ADMIN] [${timestamp}] Booting Admin SDK...`);

  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT;

    // --- OPTION A: PRODUCTION FALLBACK ---
    if (!serviceAccountString) {
      console.log('[DEBUGGER-ADMIN] No ENV key found. Initializing with Default Application Credentials...');
      return admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      }, ADMIN_APP_NAME);
    }

    // --- LOCAL / CI: JSON PARSING ---
    let serviceAccount;
    try {
      const isBase64 = !serviceAccountString.trim().startsWith('{');
      const serviceAccountJson = isBase64
        ? Buffer.from(serviceAccountString, 'base64').toString('utf8')
        : serviceAccountString;

      serviceAccount = JSON.parse(serviceAccountJson);
      
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      
      console.log(`[DEBUGGER-ADMIN] SUCCESS: Using Service Account for ${serviceAccount.project_id}`);
    } catch (parseError: any) {
      console.error('[DEBUGGER-ADMIN] ERROR: Malformed JSON. Falling back to Default Credentials.');
      return admin.initializeApp({}, ADMIN_APP_NAME);
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id,
    }, ADMIN_APP_NAME);

  } catch (error: any) {
    console.error("[DEBUGGER-ADMIN] FATAL Error:", error.message);
    // Last ditch effort to prevent a total app crash
    try { return admin.initializeApp({}, ADMIN_APP_NAME); } catch { return null; }
  }
}

const app = getAdminApp();

// Export services with safety fallbacks to prevent "undefined" crashes in components
export const db = app ? app.firestore() : null as unknown as admin.firestore.Firestore;
export const auth = app ? app.auth() : null as unknown as admin.auth.Auth;
export const storage = app ? app.storage() : null as unknown as admin.storage.Storage;

export const getDb = () => db;
export { admin as firebaseAdmin };
