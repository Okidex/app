
'use client';

import { ClientProviders } from './client-providers';

export default function RootPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClientProviders>
        {children}
      </ClientProviders>
  );
}
