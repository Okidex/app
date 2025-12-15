
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { initializeFirebase } from "@/firebase";
import { FirebaseApp } from "firebase/app";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FullUserProfile } from "@/lib/types";
import { getUserById } from "@/lib/actions";
import { FirebaseErrorListener } from "@/components/FirebaseErrorListener";

// Define the shape of the context
interface FirebaseContextState {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  user: FullUserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Create the context
const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

// Custom hook to use the Firebase context
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const useUser = () => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
}

// The provider component
function FirebaseProvider({ children }: { children: ReactNode }) {
  const services = initializeFirebase();
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
    if (!services?.auth) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth service not available.") });
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

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
}

// The main export for your layout.tsx
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      {children}
    </FirebaseProvider>
  );
}
