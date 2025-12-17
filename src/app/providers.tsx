'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { initializeFirebase } from "@/firebase";
import { FirebaseApp } from "firebase/app";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FullUserProfile } from "@/lib/types";
import { getUserById } from "@/lib/actions";
import { FirebaseErrorListener } from "@/components/FirebaseErrorListener";

interface FirebaseContextState {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  user: FullUserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
}

const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const useUser = () => {
  const context = useFirebase();
  return { user: context.user, isUserLoading: context.isUserLoading, userError: context.userError };
}

function FirebaseProvider({ children }: { children: ReactNode }) {
  // 1. Prevent multiple initializations using useMemo
  const services = useMemo(() => initializeFirebase(), []);
  
  // 2. Add a mounting state to prevent hydration mismatches and early setState calls
  const [mounted, setMounted] = useState(false);
  
  const [userAuthState, setUserAuthState] = useState<{
    user: FullUserProfile | null;
    isUserLoading: boolean;
    userError: Error | null;
  }>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  useEffect(() => {
    setMounted(true); // Confirm component is mounted on client

    if (!services?.auth) {
      setUserAuthState(prev => ({ ...prev, isUserLoading: false }));
      return;
    }

    const unsubscribe = onAuthStateChanged(
      services.auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const fullUserProfile = await getUserById(firebaseUser.uid);
            setUserAuthState({ user: fullUserProfile, isUserLoading: false, userError: null });
          } catch (error) {
            setUserAuthState({ user: null, isUserLoading: false, userError: error as Error });
          }
        } else {
          setUserAuthState({ user: null, isUserLoading: false, userError: null });
        }
      },
      (error) => {
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, [services?.auth]);

  const contextValue = useMemo(() => ({
    firebaseApp: services?.firebaseApp || null,
    auth: services?.auth || null,
    firestore: services?.firestore || null,
    ...userAuthState,
  }), [services, userAuthState]);

  // 3. Return null until mounted to ensure child hooks (like useFirebase in RootPage) 
  // only execute once the Provider is fully ready in the DOM.
  if (!mounted) return null;

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      {children}
    </FirebaseProvider>
  );
}
