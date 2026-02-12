'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseStorage } from 'firebase/storage';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { FullUserProfile } from '@/lib/types';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';

// The UserHookResult type is now defined here as the single source of truth.
export interface UserHookResult {
  user: FullUserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
  refreshUser: () => void;
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
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
    storage: FirebaseStorage;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
  storage,
}) => {
  const [userAuthState, setUserAuthState] = useState<Omit<UserHookResult, 'refreshUser'>>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const refreshUser = useCallback(() => setRefreshTrigger(t => t + 1), []);

  useEffect(() => {
    let unsubscribeProfile: () => void = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribeProfile();

        if (firebaseUser) {
            setUserAuthState(prev => ({ ...prev, isUserLoading: true }));

            const userDocRef = doc(firestore, 'users', firebaseUser.uid);
            unsubscribeProfile = onSnapshot(userDocRef, 
                (userDocSnap) => {
                    if (userDocSnap.exists()) {
                        setUserAuthState({ 
                            user: { ...userDocSnap.data(), uid: firebaseUser.uid } as FullUserProfile, 
                            isUserLoading: false, 
                            userError: null 
                        });
                    } else {
                         setUserAuthState({ user: null, isUserLoading: false, userError: null });
                    }
                },
                (error) => {
                    console.error("FirebaseProvider: Firestore error", error);
                    const contextualError = new FirestorePermissionError({
                        path: `users/${firebaseUser.uid}`,
                        operation: 'get',
                    });
                    errorEmitter.emit('permission-error', contextualError);
                    setUserAuthState({ user: null, isUserLoading: false, userError: contextualError });
                }
            );
        } else {
            setUserAuthState({ user: null, isUserLoading: false, userError: null });
        }
    }, (error) => {
        console.error("FirebaseProvider: Auth Error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
    });

    return () => {
        unsubscribeAuth();
        unsubscribeProfile();
    };
  }, [auth, firestore, refreshTrigger]);

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
      refreshUser
    };
  }, [firebaseApp, firestore, auth, storage, userAuthState, refreshUser]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextState => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  return context;
};

// Raw service hooks
export const useAuth = (): Auth | null => {
  const { auth } = useFirebase();
  return auth;
};

export const useFirestore = (): Firestore | null => {
  const { firestore } = useFirebase();
  return firestore;
};

export const useFirebaseApp = (): FirebaseApp | null => {
  const { firebaseApp } = useFirebase();
  return firebaseApp;
};

export const useStorage = (): FirebaseStorage | null => {
  const { storage } = useFirebase();
  return storage;
};


export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(factory, deps);
  
  if (memoizedValue && typeof memoizedValue === 'object') {
    // @ts-ignore
    memoizedValue.__memo = true;
  }
  
  return memoizedValue;
}
