'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { Auth, onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';
import { FirebaseStorage } from 'firebase/storage';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
}

// Internal state for user authentication and profile
interface UserAuthState {
  user: any | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  storage: FirebaseStorage | null;
  user: any | null;
  isUserLoading: boolean;
  userError: Error | null;
  refreshUser: () => void;
}

export interface FirebaseServicesAndUser {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
  user: any | null;
  isUserLoading: boolean;
  userError: Error | null;
  refreshUser: () => void;
}

export interface UserHookResult {
  user: any | null;
  isUserLoading: boolean;
  userError: Error | null;
  refreshUser: () => void;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 * It automatically syncs the Firestore user profile document.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
  storage,
}) => {
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  // Implementation of manual user refresh
  const refreshUser = useCallback(async () => {
    if (!auth?.currentUser || !firestore) return;
    try {
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const profileData = docSnap.data();
        setUserAuthState(prev => ({
          ...prev,
          user: { ...auth.currentUser, ...profileData, id: auth.currentUser?.uid },
          isUserLoading: false
        }));
      }
    } catch (error) {
      console.error("[DEBUG-FIREBASE] Manual refresh error:", error);
    }
  }, [auth, firestore]);

  useEffect(() => {
    if (!auth || !firestore) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth/Firestore service not provided.") });
      return;
    }

    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onIdTokenChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }

        if (firebaseUser) {
          setUserAuthState(prev => ({ ...prev, user: firebaseUser, isUserLoading: true }));

          // IMPORTANT: Sync token with the Next.js server so cookies work for Server Actions
          // Fire and forget so we don't block the UI profile load!
          firebaseUser.getIdToken().then(idToken => {
            fetch('/api/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken })
            }).catch(e => console.error("Failed to sync session with server:", e));
          }).catch(e => console.error("Failed to get ID token:", e));

          const userRef = doc(firestore, 'users', firebaseUser.uid);
          unsubscribeProfile = onSnapshot(userRef, (docSnap) => {
            const profileData = docSnap.exists() ? docSnap.data() : {};
            setUserAuthState({
              user: { ...firebaseUser, ...profileData, id: firebaseUser.uid },
              isUserLoading: false,
              userError: null
            });
          }, (error) => {
            console.error("[DEBUG-FIREBASE] Profile sync error:", error);
            setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
          });
        } else {
          setUserAuthState({ user: null, isUserLoading: false, userError: null });
          fetch('/api/session', { method: 'DELETE' }).catch(e => console.error("Failed to clear server session:", e));
        }
      },
      (error: Error) => {
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, [auth, firestore]);

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
      refreshUser,
    };
  }, [firebaseApp, firestore, auth, storage, userAuthState, refreshUser]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.auth || !context.storage) {
    throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }
  return {
    firebaseApp: context.firebaseApp,
    firestore: context.firestore,
    auth: context.auth,
    storage: context.storage,
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
    refreshUser: context.refreshUser,
  };
};

export const useAuth = (): Auth => useFirebase().auth;
export const useFirestore = (): Firestore => useFirebase().firestore;
export const useStorage = (): FirebaseStorage => useFirebase().storage;
export const useFirebaseApp = (): FirebaseApp => useFirebase().firebaseApp;

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  return memoized;
}

export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError, refreshUser } = useFirebase();
  return { user, isUserLoading, userError, refreshUser };
};
