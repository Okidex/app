
"use client";

import React from 'react';
import { FirebaseClientProvider } from '@/firebase';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
      <FirebaseClientProvider>
        {children}
      </FirebaseClientProvider>
  );
}
