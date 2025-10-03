import { initializeFirebase } from '@/firebase';

const { firebaseApp: app, firestore: db, storage, auth } = initializeFirebase();

export { app, db, storage, auth };

