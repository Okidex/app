'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, getDoc } from 'firebase/firestore';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { FullUserProfile } from '@/lib/types';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';

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
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
}) => {
  const router = useRouter();
  const [userAuthState, setUserAuthState] = useState<UserHookResult>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  useEffect(() => {
    if (!auth || !firestore) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth or Firestore service not provided.") });
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
            const userDocRef = doc(firestore, 'users', firebaseUser.uid);
            try {
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                setUserAuthState({ user: userDocSnap.data() as FullUserProfile, isUserLoading: false, userError: null });
              } else {
                setUserAuthState({ user: null, isUserLoading: false, userError: null });
              }
              // SYNC: Invalidate Next.js cache so Middleware sees the session cookie
              router.refresh();
            } catch (serverError) {
              const contextualError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'get',
              });
              errorEmitter.emit('permission-error', contextualError);
              setUserAuthState({ user: null, isUserLoading: false, userError: contextualError });
            }
        } else {
            setUserAuthState({ user: null, isUserLoading: false, userError: null });
            // SYNC: Ensure middleware redirects to login if cookie is cleared
            router.refresh();
        }
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, [auth, firestore, router]);

  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
      user: userAuthState.user,
      isUserLoading: userAuthState.isUserLoading,
      userError: userAuthState.userError,
    };
  }, [firebaseApp, firestore, auth, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

/**
 * HOOKS
 * UPDATED FOR 2025 BUILD COMPATIBILITY:
 * During 'next build', Next.js executes pages on the server to generate static HTML.
 * If the context is undefined (common during prerendering), we return a safe 
 * loading state instead of throwing an error to allow the build to complete.
 */

export const useFirebase = (): FirebaseContextState => {
  const context = useContext(FirebaseContext);
  
  if (context === undefined) {
    return {
      areServicesAvailable: false,
      firebaseApp: null,
      firestore: null,
      auth: null,
      user: null,
      isUserLoading: true,
      userError: null,
    };
  }
  return context;
};

export const useAuth = (): Auth | null => {
  const context = useContext(FirebaseContext);
  return context?.auth || null;
};

export const useFirestore = (): Firestore | null => {
  const context = useContext(FirebaseContext);
  return context?.firestore || null;
};

export const useFirebaseApp = (): FirebaseApp | null => {
  const context = useContext(FirebaseContext);
  return context?.firebaseApp || null;
};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(factory, deps);
  if (memoizedValue && typeof memoizedValue === 'object' && !('__memo' in memoizedValue)) {
    try {
      (memoizedValue as any).__memo = true;
    } catch (e) {}
  }
  return memoizedValue;
}
