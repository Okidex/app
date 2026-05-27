'use client';

import dynamic from 'next/dynamic';

const RedirectContent = dynamic(() => import('./RedirectContent'), { ssr: false });

export default function LegacyProfileRedirect() {
    return <RedirectContent />;
}
