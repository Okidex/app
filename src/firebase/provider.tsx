
'use client';

import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { FirebaseStorage } from 'firebase/storage';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { FullUserProfile } from '@/lib/types';

export interface UserHookResult {
  user: FullUserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
}

interface FirebaseContextState {
  areServicesAvailable: boolean;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  storage: FirebaseStorage | null;
  user: FullUserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

interface FirebaseProviderProps {
    children: ReactNode;
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
    storage: FirebaseStorage;
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
  const [userAuthState] = useState<UserHookResult>({
    user: initialUser,
    isUserLoading: !initialUser, // If we have an initial user, we are not loading.
    userError: null,
  });

  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth && storage);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
      storage: servicesAvailable ? storage : null,
      user: userAuthState.user,
      isUserLoading: userAuthState.isUserLoading,
      userError: userAuthState.userError,
    };
  }, [firebaseApp, firestore, auth, storage, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};
