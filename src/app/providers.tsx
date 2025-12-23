// src/app/providers.tsx
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Explicit import
import { initializeFirebase } from "@/firebase";
// Import your types
import { FirebaseContextState, FullUserProfile } from "@/lib/types"; 

const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  // 1. Safe Firebase Initialization
  // Ensure Firebase only initializes if the window object is present (Client-only)
  const services = useMemo(() => {
    if (typeof window === "undefined") return null;
    return initializeFirebase();
  }, []);

  const [userAuthState, setUserAuthState] = useState<{
    user: FullUserProfile | null;
    isUserLoading: boolean;
    userError: Error | null;
  }>({ 
    user: null, 
    isUserLoading: typeof window !== "undefined", // Only load if on client
    userError: null 
  });

  useEffect(() => {
    if (!services?.auth) return;

    const unsubscribe = onAuthStateChanged(services.auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Add your existing logic to fetch FullUserProfile here
          // setUserAuthState({ user: profile, isUserLoading: false, userError: null });
        } else {
          setUserAuthState({ user: null, isUserLoading: false, userError: null });
        }
      } catch (error) {
        setUserAuthState({ user: null, isUserLoading: false, userError: error as Error });
      }
    });
    
    return () => unsubscribe();
  }, [services?.auth]);

  const contextValue = useMemo(() => ({
    firebaseApp: services?.firebaseApp || null,
    auth: services?.auth || null,
    firestore: services?.firestore || null,
    ...userAuthState,
  }), [services, userAuthState]);

  // 2. CRITICAL BUILD FIX: Do not return null during prerendering.
  // Returning null can break the component tree during static generation.
  // Instead, render the children immediately so the tree is always defined.
  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Ensure you export the hook to avoid 'undefined' errors when consuming
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
