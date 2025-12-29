"use client";

import React from 'react';
/** 
 * FIXED: Direct import to avoid the @/firebase barrel file.
 * This prevents the "not a function" error during 'npm run build'.
 */
import { FirebaseClientProvider } from '@/firebase/client-provider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
      <FirebaseClientProvider>
        {children}
      </FirebaseClientProvider>
  );
}
