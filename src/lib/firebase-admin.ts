
import 'server-only';
import admin from 'firebase-admin';

// This function is designed to be called ONCE, in firebase-server-init.ts
export const initializeAdminApp = (serviceAccount: any, storageBucket: string) => {
    if (admin.apps.length > 0) {
        return {
            auth: admin.auth(),
            firestore: admin.firestore(),
            storage: admin.storage(),
            admin,
        }
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket,
    });

    return {
        auth: admin.auth(),
        firestore: admin.firestore(),
        storage: admin.storage(),
        admin,
    }
}
