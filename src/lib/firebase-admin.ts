
import admin from 'firebase-admin';
import 'dotenv/config';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (admin.apps.length === 0) {
      // The GOOGLE_APPLICATION_CREDENTIALS environment variable is loaded via `dotenv/config`.
      // This variable is used by the Firebase Admin SDK to authenticate on your local machine.
      // On Firebase App Hosting, this variable is not set, and the SDK automatically
      // uses the default service account associated with the backend.
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        try {
          const serviceAccount = JSON.parse(
            require('fs').readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
          );
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        } catch (e) {
          console.error('Error initializing Firebase Admin SDK with service account. Make sure the path in GOOGLE_APPLICATION_CREDENTIALS is correct.', e);
          // Fallback to default credentials if local file fails
          admin.initializeApp();
        }
      } else {
        // Use default credentials for deployed environments
        admin.initializeApp();
      }
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}
