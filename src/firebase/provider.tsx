'use client';

import React, { createContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, onAuthStateChanged } from 'firebase/auth'; // Added listener
import { FirebaseStorage } from 'firebase/storage';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { FullUserProfile } from '@/lib/types';

export interface UserHookResult {
  user: FullUserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
}

interface FirebaseContextState extends UserHookResult {
  areServicesAvailable: boolean;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  storage: FirebaseStorage | null;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

interface FirebaseProviderProps {
    children: ReactNode;
    firebaseApp: FirebaseApp | null; // Changed to allow null for SSR safety
    firestore: Firestore | null;
    auth: Auth | null;
    storage: FirebaseStorage | null;
    initialUser: FullUserProfile | null;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
  storage,
  initialUser,
}) => {
  // Initialize state with the server-provided initialUser
  const [user, setUser] = useState<FullUserProfile | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser);
  const [error, setError] = useState<Error | null>(null);

  // CRITICAL: Synchronize client state with Auth changes
  useEffect(() => {
    if (!auth) return;

    // This listener handles the bridge between Firebase Auth and your Context
    const unsubscribe = onAuthStateChanged(auth, 
      (firebaseUser) => {
        // If firebaseUser is null, and we don't have an initialUser, set loading false
        setIsLoading(false);
        // Note: FullUserProfile mapping usually happens in your auth-action
        // but this ensures the context updates when the SDK detects a login
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp,
      firestore,
      auth,
      storage,
      user,
      isUserLoading: isLoading,
      userError: error,
    };
  }, [firebaseApp, firestore, auth, storage, user, isLoading, error]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};
