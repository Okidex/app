'use client';

// Import only from web-safe paths
import { initializeFirebase, getSdks } from './client-init';
import {
  FirebaseProvider,
  useAuth,
  useFirestore,
  useFirebaseApp,
  useMemoFirebase,
  useStorage,
} from './provider';
import { useUser } from './auth/use-user';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';

// Initialize SDKs
const sdks = getSdks();

/**
 * FIXED: Rename these exports to match what your Provider/Components expect
 * This resolves the "Property 'firebaseApp' does not exist" error.
 */
export const firebaseApp = sdks.app; // Changed from 'app' to 'firebaseApp'
export const auth = sdks.auth;
export const firestore = sdks.db;    // Changed from 'db' to 'firestore'
export const storage = sdks.storage;

export {
  // client-init
  initializeFirebase,
  getSdks,
  // provider
  FirebaseProvider,
  useAuth,
  useFirestore,
  useFirebaseApp,
  useMemoFirebase,
  useStorage,
  // auth
  useUser,
  // client-provider
  FirebaseClientProvider,
  // firestore
  useCollection,
  useDoc,
  // errors
  FirestorePermissionError,
  errorEmitter,
};
