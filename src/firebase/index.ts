
'use client';

import React, { useContext } from 'react';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';

import { initializeFirebase, getSdks } from './client-init';
import { FirebaseProvider, FirebaseContext } from './provider';
import { useUser } from './auth/use-user';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';


// Main hooks
export const useAuth = (): Auth | null => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseProvider");
  }
  return context?.auth || null;
};

export const useFirestore = (): Firestore | null => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirestore must be used within a FirebaseProvider");
  }
  return context?.firestore || null;
};

export const useFirebaseApp = (): FirebaseApp | null => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error("useFirebaseApp must be used within a FirebaseProvider");
    }
    return context?.firebaseApp || null;
}

export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = React.useMemo(factory, deps);
  if (memoizedValue && typeof memoizedValue === 'object' && !('__memo' in memoizedValue)) {
    try {
      (memoizedValue as any).__memo = true;
    } catch (e) {}
  }
  return memoizedValue;
}


// Re-export everything for convenience
export {
  // client-init
  initializeFirebase,
  getSdks,
  // provider
  FirebaseProvider,
  FirebaseContext,
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
