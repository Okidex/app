"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';
import { ArrowRight, Briefcase, Lightbulb, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientProviders } from './client-providers';

// This component remains separate to handle the top-level logic
// of showing either the public landing page or the authenticated app.
function AppContent({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading: loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        // If the user is logged in and they land on the homepage,
        // redirect them to their dashboard.
        if (!loading && user && window.location.pathname === '/') {
            router.replace('/dashboard');
        }
    }, [user, loading, router]);
    
    // If the user is authenticated, we render the children, which will
    // be the authenticated routes wrapped in their own protected layout.
    if (user) {
        return <>{children}</>;
    }

    // While authentication is loading, show a full-page skeleton.
    if (loading) {
         return (
            <div className="flex flex-col min-h-screen">
                <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Skeleton className="h-8 w-32" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-24" />
                </div>
                </header>
                <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <Skeleton className="h-[400px] w-full" />
                </main>
            </div>
        );
    }
    
    // If not loading and no user, render the public landing page.
    // The router will handle showing the correct page content (e.g., /login, /register).
    return <>{children}</>;
}


export default function RootPageClient({ children }: { children: React.ReactNode }) {
    return (
        <ClientProviders>
            <AppContent>
                {children}
            </AppContent>
        </ClientProviders>
    );
}
