
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import React, { useState } from "react";

const FaqSection = () => (
    <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions about Okidex.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is Okidex?</AccordionTrigger>
                    <AccordionContent>
                        Okidex is a platform designed to connect startup founders with investors and top-tier talent. Our goal is to create a dynamic ecosystem where innovation can thrive by facilitating meaningful connections.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How do I manage my subscription or upgrade to Oki+?</AccordionTrigger>
                    <AccordionContent>
                        You can manage all aspects of your subscription, including upgrading to Oki+, on the <Link href="/settings/billing" className="text-primary underline">Billing</Link> page. Your general account preferences can be found on the <Link href="/settings" className="text-primary underline">Settings</Link> page.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How does the matching process work?</AccordionTrigger>
                    <AccordionContent>
                        Our matching algorithm uses the information in your profile—such as industry, investment stage, skills, and stated interests—to suggest the most relevant connections. The more complete your profile, the better your matches will be.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                    <AccordionContent>
                        Yes. We take data security very seriously. Sensitive financial data for founders is only shared with investors after a connection has been mutually accepted, giving you full control over who sees your information. All data is encrypted in transit and at rest.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

const SupportTicketForm = () => {
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');

    const mailtoLink = `mailto:wilfred@okidex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>Experiencing an issue? Let us know, and we’ll help you out.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="support-subject">Subject</Label>
                        <Input id="support-subject" placeholder="e.g., Trouble uploading profile picture" required value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="support-details">Details</Label>
                        <Textarea id="support-details" placeholder="Please describe the issue in detail..." required rows={6} value={details} onChange={(e) => setDetails(e.target.value)} />
                    </div>
                    <Button asChild>
                        <a href={mailtoLink}>Submit Ticket</a>
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');
    
    const mailtoLink = `mailto:wilfred@okidex.com?subject=${encodeURIComponent('Okidex Feedback')}&body=${encodeURIComponent(feedback)}`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Give Feedback</CardTitle>
                <CardDescription>Have an idea for a new feature or an improvement? We’d love to hear it.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="feedback-details">Your Feedback</Label>
                        <Textarea id="feedback-details" placeholder="What's on your mind?" required rows={6} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                    </div>
                    <Button asChild>
                        <a href={mailtoLink}>Send Feedback</a>
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default function FeedbackPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Support & Feedback</h1>
                <p className="text-muted-foreground">We're here to help. Find answers, get support, and share your ideas.</p>
            </div>

            <Tabs defaultValue="faq" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                    <TabsTrigger value="support">Submit a Ticket</TabsTrigger>
                    <TabsTrigger value="feedback">Give Feedback</TabsTrigger>
                </TabsList>
                <TabsContent value="faq" className="pt-6">
                    <FaqSection />
                </TabsContent>
                <TabsContent value="support" className="pt-6">
                    <SupportTicketForm />
                </TabsContent>
                <TabsContent value="feedback" className="pt-6">
                    <FeedbackForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
