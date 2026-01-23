
"use client";

import { Suspense } from "react";
import SearchResults from './client';

export default function SearchPage() {
    return (
        <Suspense>
            <SearchResults />
        </Suspense>
    );
}
