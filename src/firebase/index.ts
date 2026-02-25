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

// Initialize and export direct SDK constants for use in components/actions
// This ensures they are available to 'src/lib/actions.ts'
const sdks = getSdks();

export const app = sdks.app;
export const auth = sdks.auth;
export const db = sdks.db;
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
