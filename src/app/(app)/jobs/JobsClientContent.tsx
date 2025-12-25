
"use client";

import { useState, useEffect } from "react";
import { Job, FounderProfile, InvestorProfile, FullUserProfile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, PlusCircle, Plus } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import FounderApplyPrompt from "@/components/jobs/founder-apply-prompt";
import { collection, addDoc, serverTimestamp, query, getDocs, orderBy } from "firebase/firestore";
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobsClientContent() {
    const { user: currentUser, isUserLoading: authLoading } = useUser();
    const db = useFirestore();
    const jobsQuery = useMemoFirebase(() => db ? query(collection(db, "jobs"), orderBy("postedAt", "desc")) : null, [db]);
    const { data: jobs, isLoading: jobsLoading } = useCollection<Job>(jobsQuery);

    const [isPostJobOpen, setIsPostJobOpen] = useState(false);
    const [showFounderPrompt, setShowFounderPrompt] = useState(false);
    const { toast } = useToast();
    
    const [newJob, setNewJob] = useState({
        title: "",
        location: "Remote",
        type: "Full-time" as Job['type'],
        description: "",
    });

    const loading = authLoading || jobsLoading;
    
    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
        );
    }
    
    if (!currentUser) {
        return (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold font-headline">Jobs</h1>
                        <p className="text-muted-foreground">Log in to find your next role at a high-growth startup.</p>
                    </div>
                </div>
                <Card>
                    <CardContent className="p-8 text-center">
                        <p>Please <Link href="/login" className="text-primary underline">log in</Link> to view and apply for jobs.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const isFounder = currentUser.role === 'founder';
    const isInvestor = currentUser.role === 'investor';
    const isPremiumFounder = isFounder && (currentUser.profile as FounderProfile).isPremium;

    const handlePostJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser || !db) return;

        let companyName = "Your Company";
        let companyLogoUrl = `https://picsum.photos/seed/logo-default/200/200`;

        if (isFounder) {
            companyName = 'InnovateAI';
            companyLogoUrl = 'https://picsum.photos/seed/logo1/200/200';
        } else if (isInvestor) {
            const profile = currentUser.profile as InvestorProfile;
            companyName = profile.companyName || 'Investor Firm';
             companyLogoUrl = `https://picsum.photos/seed/${companyName.toLowerCase().replace(' ', '')}/200/200`
        }

        const newJobData: Omit<Job, 'id'> = {
            title: newJob.title,
            companyName: companyName,
            companyLogoUrl: companyLogoUrl,
            founderId: currentUser.id,
            location: newJob.location,
            type: newJob.type,
            description: newJob.description,
            postedAt: new Date().toISOString(),
        };

        try {
            await addDoc(collection(db, 'jobs'), newJobData);
            setIsPostJobOpen(false);
            setNewJob({ title: "", location: "Remote", type: "Full-time", description: "" });
            toast({ title: "Job Posted", description: "Your job has been successfully posted." });
        } catch (error) {
            console.error("Error posting job:", error);
            toast({ title: "Error", description: "Failed to post job.", variant: "destructive" });
        }
    };

    const handleApply = (jobTitle: string, companyName: string) => {
        if (currentUser.role === 'founder') {
            setShowFounderPrompt(true);
            return;
        }

        toast({
            title: "Application Sent!",
            description: `Your application for ${jobTitle} at ${companyName} has been submitted.`
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Jobs</h1>
                    <p className="text-muted-foreground">Find your next role at a high-growth startup.</p>
                </div>
                {(isInvestor || (isFounder && isPremiumFounder)) && (
                    <Button onClick={() => setIsPostJobOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Post a Job
                    </Button>
                )}
                {isFounder && !isPremiumFounder && (
                    <Button asChild variant="outline">
                        <Link href="/settings/billing">
                            <Plus className="mr-2 h-4 w-4" /> Post a Job
                        </Link>
                    </Button>
                )}
            </div>
            
            <Card>
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <Input placeholder="Search by title, company, or keyword..." className="flex-1" />
                    <div className="flex gap-4">
                        <Select>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="ny">New York, NY</SelectItem>
                                <SelectItem value="sf">San Francisco, CA</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Job Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            
            <div className="grid grid-cols-1 gap-6">
                {jobs && jobs.map(job => (
                    <Card key={job.id}>
                        <CardHeader className="flex flex-row items-start gap-4">
                            <Image src={job.companyLogoUrl} alt={job.companyName} width={56} height={56} className="rounded-full border" data-ai-hint="logo" />
                            <div className="flex-1">
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.companyName}</CardDescription>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</div>
                                    <div className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.type}</div>
                                </div>
                            </div>
                            <Button onClick={() => handleApply(job.title, job.companyName)} variant={isFounder ? 'secondary' : 'default'}>Apply Now</Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            

            <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Post a New Job</DialogTitle>
                        <DialogDescription>Fill out the details below to post a new job opening for your startup.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePostJob} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="job-title">Job Title</Label>
                            <Input id="job-title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} placeholder="e.g., Lead Frontend Engineer" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="job-location">Location</Label>
                                <Input id="job-location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} placeholder="e.g., Remote" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="job-type">Job Type</Label>
                                <Select value={newJob.type} onValueChange={(value: Job['type']) => setNewJob({ ...newJob, type: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="job-description">Description</Label>
                            <Textarea id="job-description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} placeholder="Describe the role, responsibilities, and requirements..." required />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Post Job</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <FounderApplyPrompt open={showFounderPrompt} onOpenChange={setShowFounderPrompt} />
        </div>
    );
}
