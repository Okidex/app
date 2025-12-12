
"use client";

import { Suspense } from "react";
import SearchResults from './client';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
    return (
        <Suspense>
            <SearchResults />
        </Suspense>
    );
}
