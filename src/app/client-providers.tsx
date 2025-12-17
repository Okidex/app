'use client'; // This directive is mandatory for this wrapper

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the main Providers from your existing file
// ssr: false prevents the "useFirebase must be used within a FirebaseProvider" error 
// that occurs if Next.js tries to render this on the server.
const DynamicProviders = dynamic(
  () => import('./providers').then((mod) => mod.Providers),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-background" /> // Optional loading state
  }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <DynamicProviders>{children}</DynamicProviders>;
}
