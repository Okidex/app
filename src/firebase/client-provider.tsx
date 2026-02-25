"use client";

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase/client-init';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); 

  return (
    <FirebaseProvider
      // Updated keys to match the 'initializeFirebase' return type
      firebaseApp={firebaseServices.app} 
      auth={firebaseServices.auth}
      firestore={firebaseServices.db} 
      storage={firebaseServices.storage}
    >
      {children}
    </FirebaseProvider>
  );
}
