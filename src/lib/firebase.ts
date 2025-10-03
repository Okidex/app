import { initializeFirebase } from '@/firebase';

const { app, db, storage, auth } = initializeFirebase();

export { app, db, storage, auth };

