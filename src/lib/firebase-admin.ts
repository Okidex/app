
import admin from 'firebase-admin';
import { HttpsProxyAgent } from 'https-proxy-agent';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    if (!admin.apps.length) {
      // The proxy is only needed in the Cloud Workstation environment.
      // We conditionally create it to avoid affecting other environments.
      // The proxy agent should be instantiated inside the function to avoid it being applied globally.
      const httpAgent = new HttpsProxyAgent('http://127.0.0.1:8001');
      admin.initializeApp({
        httpAgent
      });
    }
    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage()
    }
}

