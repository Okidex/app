'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
/** 
 * CRITICAL: Import directly from the init file, NOT the index barrel.
 * This prevents the 'TypeError: (0, n.aF) is not a function' build error.
 */
import { initializeFirebase } from "@/firebase/client-init"; 
import { FirebaseContextState, FullUserProfile } from "@/lib/types"; 

const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // 1. Client-only Initialization
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
    isUserLoading: true, 
    userError: null 
  });

  useEffect(() => {
    if (!services?.auth) return;

    const unsubscribe = onAuthStateChanged(services.auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // If you have logic to fetch additional profile data from Firestore:
          // const profile = await fetchUserProfile(firebaseUser.uid);
          // setUserAuthState({ user: profile, isUserLoading: false, userError: null });
          
          // Trigger a refresh so Middleware/Server Components see the new cookie
          router.refresh();
        } else {
          setUserAuthState({ user: null, isUserLoading: false, userError: null });
          // If user signs out, refresh to ensure protected routes redirect
          router.refresh();
        }
      } catch (error) {
        setUserAuthState({ user: null, isUserLoading: false, userError: error as Error });
      }
    });
    
    return () => unsubscribe();
  }, [services?.auth, router]);

  const contextValue = useMemo(() => ({
    firebaseApp: services?.firebaseApp || null,
    auth: services?.auth || null,
    firestore: services?.firestore || null,
    ...userAuthState,
  }), [services, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
