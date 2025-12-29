// src/firebase/client-provider.tsx
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './client-init';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const firebaseServices = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return initializeFirebase();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR/Prerendering, firebaseServices will be null.
  // We provide dummy values to FirebaseProvider to keep the context 
  // initialized so child hooks don't crash.
  return (
    <FirebaseProvider
      firebaseApp={firebaseServices?.firebaseApp as any}
      auth={firebaseServices?.auth as any}
      firestore={firebaseServices?.firestore as any}
    >
      {children}
    </FirebaseProvider>
  );
}
