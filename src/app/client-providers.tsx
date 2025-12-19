'use client';

import React from 'react';
// Changed: Direct import to ensure Firebase starts handshaking immediately
import { FirebaseClientProvider } from '@/firebase/client-provider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
