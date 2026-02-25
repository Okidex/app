'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// FIX: Force the Web SDK specifically
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export function getSdks(firebaseApp?: FirebaseApp) {
  // Use a singleton check to ensure we don't re-init
  const app = firebaseApp || (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig));
  
  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app)
  };
}

export function initializeFirebase() {
  return getSdks();
}
