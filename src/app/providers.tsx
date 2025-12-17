// src/app/providers.tsx
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { initializeFirebase } from "@/firebase";
// ... (keep other imports)

const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const services = useMemo(() => initializeFirebase(), []); // Memoize to prevent multiple apps
  
  const [userAuthState, setUserAuthState] = useState<{
    user: FullUserProfile | null;
    isUserLoading: boolean;
    userError: Error | null;
  }>({ user: null, isUserLoading: true, userError: null });

  useEffect(() => {
    setMounted(true); // Signal that we are on the client
    if (!services?.auth) return;

    const unsubscribe = onAuthStateChanged(services.auth, async (firebaseUser) => {
      // ... (keep your existing auth logic)
    });
    return () => unsubscribe();
  }, [services?.auth]);

  const contextValue = useMemo(() => ({
    firebaseApp: services?.firebaseApp || null,
    auth: services?.auth || null,
    firestore: services?.firestore || null,
    ...userAuthState,
  }), [services, userAuthState]);

  // CRITICAL FIX: Do not render children until mounted.
  // This prevents RootPage from calling useFirebase before the provider is ready.
  if (!mounted) return null; 

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}
