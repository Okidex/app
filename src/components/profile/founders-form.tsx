
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FullUserProfile, Startup, FounderProfile } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getUserById } from '@/lib/actions';
import UserAvatar from '@/components/shared/user-avatar';
import { Star, Trash, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FoundersFormProps {
    startup: Startup;
}

export default function FoundersForm({ startup: initialStartup }: FoundersFormProps) {
    const [startup, setStartup] = useState<Startup>(initialStartup);
    const [founders, setFounders] = useState<FullUserProfile[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();
    
    useEffect(() => {
        const fetchFounders = async () => {
            const founderProfiles = await Promise.all(startup.founderIds.map(id => getUserById(id)));
            setFounders(founderProfiles.filter((p): p is FullUserProfile => p !== null));
        };
        fetchFounders();
    }, [startup]);

    const [newFounderName, setNewFounderName] = useState('');
    const [newFounderTitle, setNewFounderTitle] = useState('');
    const [newFounderLinkedin, setNewFounderLinkedin] = useState('');


    const handleAddFounder = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newFounderName || !newFounderTitle) {
            toast({
                title: "Missing Information",
                description: "Please provide a name and title for the co-founder.",
                variant: "destructive",
            });
            return;
        }

        // In a real app, this would invite or create a new user.
        // For this prototype, we'll just show a success message.
        const newFounderId = `user-new-${Date.now()}`;
        const newFounder: FullUserProfile = {
            id: newFounderId,
            name: newFounderName,
            email: `${newFounderName.split(' ').join('.').toLowerCase()}@example.com`,
            role: 'founder',
            avatarUrl: 'https://picsum.photos/seed/newfounder/400/400',
            profile: {
                companyId: startup.id,
                isLead: false,
                title: newFounderTitle,
            }
        };

        // Note: This only simulates adding. The new user won't persist.
        // We'll update the UI temporarily to give feedback.
        
        toast({
            title: "Co-founder Added",
            description: `${newFounderName} has been added to ${startup.companyName}.`,
        });

        // Reset form and close dialog
        setNewFounderName('');
        setNewFounderTitle('');
        setNewFounderLinkedin('');
        setIsAddDialogOpen(false);
    };
    
    const handleRemoveFounder = (founderId: string) => {
        const founder = founders.find(u => u.id === founderId);
        if (!founder) return;

        setStartup(prev => ({
            ...prev,
            founderIds: prev.founderIds.filter(id => id !== founderId)
        }));

        toast({
            title: "Founder Removed",
            description: `${founder.name} has been removed from ${startup.companyName}.`,
            variant: "destructive"
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Founding Team</CardTitle>
                        <CardDescription>Manage your startup's co-founders.</CardDescription>
                    </div>
                     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><UserPlus className="mr-2 h-4 w-4" /> Add Co-founder</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add a Co-founder</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddFounder} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="founder-name">Name</Label>
                                    <Input id="founder-name" value={newFounderName} onChange={e => setNewFounderName(e.target.value)} placeholder="e.g. Ada Lovelace" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="founder-title">Title</Label>
                                    <Input id="founder-title" value={newFounderTitle} onChange={e => setNewFounderTitle(e.target.value)} placeholder="e.g. CTO & Co-founder" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="founder-linkedin">LinkedIn Profile</Label>
                                    <Input id="founder-linkedin" value={newFounderLinkedin} onChange={e => setNewFounderLinkedin(e.target.value)} placeholder="https://www.linkedin.com/in/..." />
                                </div>
                                <Button type="submit" className="w-full">Add Co-founder</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {founders.map(founder => {
                        const profile = founder.profile as FounderProfile;
                        return (
                            <div key={founder.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <UserAvatar name={founder.name} avatarUrl={founder.avatarUrl} className="w-12 h-12" />
                                    <div>
                                        <p className="font-semibold flex items-center gap-1.5">
                                            {founder.name}
                                            {profile.isLead && <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" title="Lead Founder" />}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{profile.title}</p>
                                    </div>
                                </div>
                                {!profile.isLead && (
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently remove {founder.name} from the founding team.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleRemoveFounder(founder.id!)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
