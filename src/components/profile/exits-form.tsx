

"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exit } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Link as LinkIcon, Trash, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExitsFormProps {
    initialData: Exit[];
}

const newEntryDefault: Exit = {
    companyName: '',
    companyUrl: ''
};

export default function ExitsForm({ initialData }: ExitsFormProps) {
    const [exits, setExits] = useState<Exit[]>(initialData || []);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();
    
    const [newExit, setNewExit] = useState(newEntryDefault);

    const handleAddExit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newExit.companyName || !newExit.companyUrl) {
            toast({
                title: "Missing Information",
                description: "Please provide a company name and URL.",
                variant: "destructive",
            });
            return;
        }
        
        setExits([...exits, newExit]);
        
        toast({
            title: "Exit Added",
            description: `${newExit.companyName} has been added to your exits.`,
        });

        setNewExit(newEntryDefault);
        setIsAddDialogOpen(false);
    };
    
    const handleRemoveExit = (companyName: string) => {
        setExits(exits.filter(p => p.companyName !== companyName));
        toast({
            title: "Exit Removed",
            description: `${companyName} has been removed from your exits.`,
            variant: "destructive"
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Exits</CardTitle>
                        <CardDescription>Manage your successful exits.</CardDescription>
                    </div>
                     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Exit</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add an Exit</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddExit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Company Name</Label>
                                    <Input id="company-name" value={newExit.companyName} onChange={e => setNewExit({...newExit, companyName: e.target.value})} placeholder="e.g. Innovate Inc." required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-url">Company URL</Label>
                                    <Input id="company-url" value={newExit.companyUrl} onChange={e => setNewExit({...newExit, companyUrl: e.target.value})} placeholder="https://innovate.com" type="url" required />
                                </div>
                                <Button type="submit" className="w-full">Add Exit</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {exits.map(exit => (
                        <div key={exit.companyName} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="font-semibold">{exit.companyName}</p>
                                    <a href={exit.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline flex items-center gap-1.5">
                                        <LinkIcon className="h-3.5 w-3.5" />
                                        {exit.companyUrl}
                                    </a>
                                </div>
                            </div>
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
                                            This action cannot be undone. This will permanently remove {exit.companyName} from your exits.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleRemoveExit(exit.companyName)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))}
                     {exits.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No exits added yet.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
