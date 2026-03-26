"use client";

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase'; // Ensure this is the correct index path

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // This returns { app, auth, db, storage }
    return initializeFirebase();
  }, []); 

  return (
    <FirebaseProvider
      // Map 'app' to 'firebaseApp'
      firebaseApp={firebaseServices.app} 
      auth={firebaseServices.auth}
      // Map 'db' to 'firestore'
      firestore={firebaseServices.db}
      storage={firebaseServices.storage}
    >
      {children}
    </FirebaseProvider>
  );
}
