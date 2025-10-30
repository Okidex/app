"use server";

import * as admin from 'firebase-admin';
import { getServiceAccountCredentials } from './server-credentials';

let auth: admin.auth.Auth;
let firestore: admin.firestore.Firestore;
let storage: admin.storage.Storage;

function getOrCreateFirebaseAdmin() {
  if (admin.apps.length === 0) {
    const serviceAccount = getServiceAccountCredentials();
    if (serviceAccount) {
      console.log("Initializing Firebase Admin with service account...");
      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } else {
      console.log("Initializing Firebase Admin with default credentials...");
      return admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }
  }
  return admin.app();
}

const app = getOrCreateFirebaseAdmin();
auth = app.auth();
firestore = app.firestore();
storage = app.storage();

export { auth, firestore, storage, admin };
