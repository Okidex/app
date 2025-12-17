
'use client';

import { initializeFirebase, getSdks } from './client-init';
import {
  FirebaseProvider,
  FirebaseContext,
  useFirebase,
  useAuth,
  useFirestore,
  useFirebaseApp,
  useMemoFirebase,
} from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useUser } from './auth/use-user';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';

export {
  // client-init
  initializeFirebase,
  getSdks,
  // provider
  FirebaseProvider,
  FirebaseContext,
  useFirebase,
  useAuth,
  useFirestore,
  useFirebaseApp,
  useMemoFirebase,
  // client-provider
  FirebaseClientProvider,
  // firestore
  useCollection,
  useDoc,
  // auth
  useUser,
  // errors
  FirestorePermissionError,
  errorEmitter,
};
