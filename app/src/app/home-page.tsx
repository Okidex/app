
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';
import { ArrowRight, Briefcase, Lightbulb, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

export default function HomePage() {
    const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
    return (
        <div className="flex flex-col min-h-screen">
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-2">
                    <Dialog open={isSubscribeOpen} onOpenChange={setIsSubscribeOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost">Subscribe</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl p-0 overflow-hidden">
                            <DialogHeader className="p-6 pb-0">
                                <DialogTitle>Subscribe to our newsletter</DialogTitle>
                                <DialogDescription>
                                    Get the latest news, updates, and special offers delivered directly to your inbox.
                                </DialogDescription>
                            </DialogHeader>
                            <iframe 
                                src="https://subscribe-forms.beehiiv.com/bdc3e853-fca8-4f03-b91f-97ff9cc32803?slim=true" 
                                data-test-id="beehiiv-embed" 
                                frameBorder="0" 
                                scrolling="no" 
                                style={{ width: '100%', height: '500px', margin: 0, backgroundColor: 'transparent', boxShadow: '0 0 #0000' }}
                            ></iframe>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Sign Up</Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1">
                <section className="py-20 md:py-32">
                    <div className="container mx-auto text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">
                            The Nexus for Innovation and Investment
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                            Okidex is the premier platform connecting visionary founders with strategic investors and top-tier talent. Discover, connect, and build the future, together.
                        </p>
                    </div>
                </section>

                 <section className="pb-20 md:pb-32">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                        <Lightbulb className="w-8 h-8" />
                                    </div>
                                    <CardTitle>For Founders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Showcase your vision, connect with investors who believe in your mission, and recruit the talent you need to scale.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <CardTitle>For Investors</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Discover curated, high-potential startups. Gain direct access to innovative founders and unique investment opportunities.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                        <Briefcase className="w-8 h-8" />
                                    </div>
                                    <CardTitle>For Talent</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Find your next big role. Join an ambitious startup, find a co-founder, or offer your skills as a fractional leader.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="pb-20 md:pb-32">
                    <div className="container mx-auto text-center">
                        <Button size="lg" asChild>
                            <Link href="/register">
                                Explore <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
             <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Okidex. All rights reserved.</p>
            </footer>
        </div>
    );
}
