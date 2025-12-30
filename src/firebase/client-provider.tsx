// src/firebase/client-provider.tsx
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './client-init';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  // Use a state to track hydration to prevent SSR mismatch errors in Next.js 15
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize services only on the client
  const firebaseServices = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return initializeFirebase();
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Avoid "dummy" values that can crash hooks. 
  // Instead, provide null/undefined and let your hooks handle the loading state.
  return (
    <FirebaseProvider
      firebaseApp={firebaseServices?.firebaseApp ?? null}
      auth={firebaseServices?.auth ?? null}
      firestore={firebaseServices?.firestore ?? null}
    >
      {/* 
        Optional: If you find child components are crashing due to null services 
        during the first mount, you can wrap {children} in:
        {isHydrated ? children : null} 
        However, for SEO/SSR it's better to render children with null context.
      */}
      {children}
    </FirebaseProvider>
  );
}
