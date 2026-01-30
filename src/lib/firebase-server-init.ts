import 'server-only';
import admin from 'firebase-admin';

function initializeAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // 1. Look for the Base64 variable first
  const base64ServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const rawServiceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  let serviceAccount: any;

  try {
    if (base64ServiceAccount) {
      // 2. Decode the Base64 string into a JSON string, then parse it
      const decodedJson = Buffer.from(base64ServiceAccount, 'base64').toString('utf8');
      serviceAccount = JSON.parse(decodedJson);
    } else if (rawServiceAccountJson) {
      // Fallback for raw JSON string
      serviceAccount = JSON.parse(rawServiceAccountJson);
    } else {
      throw new Error('Neither FIREBASE_SERVICE_ACCOUNT_BASE64 nor FIREBASE_SERVICE_ACCOUNT is set.');
    }

    // 3. Fix the private key formatting
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
    throw new Error(`Firebase Admin failed: ${error.message}`);
  }
}

export function getDb() { return initializeAdmin().firestore(); }
export function getAuth() { return initializeAdmin().auth(); }
export function getStorage() { return initializeAdmin().storage(); }
export { admin as firebaseAdmin };
