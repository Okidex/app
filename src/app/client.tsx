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

function AppContent({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading: loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            // If user is logged in, but on the landing page, redirect to dashboard.
            if (window.location.pathname === '/') {
                router.replace('/dashboard');
            }
        }
    }, [user, loading, router]);
    
    // This handles the main authenticated part of the app
    if (user) {
        return <>{children}</>;
    }

    // Skeleton for loading state
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
    
    // Render public-facing content (landing page) if not loading and no user.
    // This assumes that unauthenticated users can only see the landing page.
    // The actual routing logic in child pages/layouts will handle redirects for protected routes.
    return (
        <div className="flex flex-col min-h-screen bg-background">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Sign Up</Link>
            </Button>
            </div>
        </header>
        <main className="flex-1">
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline">
                The Nexus for Innovation and Investment
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Okidex is the premier platform where visionary founders, astute investors, and exceptional talent converge to build the future.
            </p>
            </section>

            <section className="bg-secondary/50 py-20 md:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-headline">Where Ideas Connect</h2>
                    <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                    Whether you're building, investing, or contributing, Okidex is your launchpad.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center">
                        <CardHeader>
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Lightbulb className="w-8 h-8" />
                        </div>
                        <CardTitle>For Startup Founders</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <CardDescription>
                            Connect with top-tier talent to build your team and engage with investors to secure the capital you need to grow.
                        </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardHeader>
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Users className="w-8 h-8" />
                        </div>
                        <CardTitle>For Private Investors</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <CardDescription>
                            Discover exciting startups to deploy funding, expand your GP/LP network, create your own fund, and hire specialized talent.
                        </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardHeader>
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Briefcase className="w-8 h-8" />
                        </div>
                        <CardTitle>For Talent & Vendors</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <CardDescription>
                            Join the startup ecosystem as a fractional leader, find a co-founder for your next big idea, or offer your services to innovative startups and investors.
                        </CardDescription>
                        </CardContent>
                    </Card>
                    </div>
                    <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link href="/register">
                            Join Okidex <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
        <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Okidex. All rights reserved.</p>
        </footer>
        </div>
    );
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