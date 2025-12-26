'use client';

import { initializeFirebase, getSdks } from './client-init';
import {
  FirebaseProvider,
  useAuth,
  useFirestore,
  useFirebaseApp,
  useMemoFirebase,
} from './provider';
import { useUser } from './auth/use-user';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';

export {
  // client-init
  initializeFirebase,
  getSdks,
  // provider
  FirebaseProvider,
  useAuth,
  useFirestore,
  useFirebaseApp,
  useUser,
  useMemoFirebase,
  // client-provider
  FirebaseClientProvider,
  // firestore
  useCollection,
  useDoc,
  // errors
  FirestorePermissionError,
  errorEmitter,
};
