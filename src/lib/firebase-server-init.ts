
import 'server-only';
import admin from 'firebase-admin';

// This function reads the environment variable and initializes the app.
// It's designed to be called once and its result re-used.

function getServiceAccount() {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    // In a production/deployed environment, we might rely on Application Default Credentials
    if (process.env.NODE_ENV === 'production') {
        return undefined;
    }
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set for local development.');
  }
  try {
    return JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf8'));
  } catch (e) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY", e);
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not a valid base64 encoded JSON string.");
  }
}

function getStorageBucket() {
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!storageBucket) {
        throw new Error('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET environment variable is not set.');
    }
    return storageBucket;
}

if (!admin.apps.length) {
    const serviceAccount = getServiceAccount();
    const storageBucket = getStorageBucket();

    if (serviceAccount) {
        // Used for local development and explicit credential provision
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: storageBucket,
        });
        console.log("Firebase Admin SDK initialized with service account.");
    } else {
        // Used for deployed environments (like Firebase App Hosting)
        // where Application Default Credentials are automatically available.
        admin.initializeApp({
             storageBucket: storageBucket,
        });
        console.log("Firebase Admin SDK initialized with Application Default Credentials.");
    }
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();
export { admin };

