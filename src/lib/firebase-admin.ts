import admin from 'firebase-admin';
import { getFirebaseAdminApp } from 'firebase-frameworks';

// This pattern ensures that the Firebase Admin SDK is initialized only once.
export function initializeAdminApp() {
    // Use getFirebaseAdminApp() to safely initialize the app in any environment.
    // It handles the check for existing apps and uses the correct credentials.
    const app = getFirebaseAdminApp();
    
    return {
        auth: admin.auth(app),
        firestore: admin.firestore(app),
        storage: admin.storage(app)
    }
}

