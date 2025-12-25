'use client';

import { ClientProviders } from './client-providers';

/**
 * RootPageClient serves as the top-level Client Component boundary.
 * It provides the Firebase Context to all child components.
 */
export default function RootPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      {/* 
        We do not put router.push logic here. 
        Individual pages (like the landing page or login page) 
        should handle their own redirection logic via useEffect.
      */}
      {children}
    </ClientProviders>
  );
}
