

"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortfolioCompany } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Link as LinkIcon, Trash, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface PortfolioFormProps {
    initialData: PortfolioCompany[];
}

const newEntryDefault: Omit<PortfolioCompany, 'companyLogoUrl'> = {
    companyName: '',
    companyUrl: ''
};

export default function PortfolioForm({ initialData }: PortfolioFormProps) {
    const [portfolio, setPortfolio] = useState<PortfolioCompany[]>(initialData || []);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { toast } = useToast();
    
    const [newCompany, setNewCompany] = useState(newEntryDefault);

    const handleAddCompany = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newCompany.companyName || !newCompany.companyUrl) {
            toast({
                title: "Missing Information",
                description: "Please provide a company name and URL.",
                variant: "destructive",
            });
            return;
        }

        const newPortfolioCompany: PortfolioCompany = {
            ...newCompany,
            companyLogoUrl: `https://picsum.photos/seed/${newCompany.companyName.toLowerCase()}/200/200`,
        };
        
        setPortfolio([...portfolio, newPortfolioCompany]);
        
        toast({
            title: "Company Added",
            description: `${newCompany.companyName} has been added to your portfolio.`,
        });

        setNewCompany(newEntryDefault);
        setIsAddDialogOpen(false);
    };
    
    const handleRemoveCompany = (companyName: string) => {
        setPortfolio(portfolio.filter(p => p.companyName !== companyName));
        toast({
            title: "Company Removed",
            description: `${companyName} has been removed from your portfolio.`,
            variant: "destructive"
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Portfolio Companies</CardTitle>
                        <CardDescription>Manage your current investments.</CardDescription>
                    </div>
                     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Company</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add a Portfolio Company</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddCompany} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Company Name</Label>
                                    <Input id="company-name" value={newCompany.companyName} onChange={e => setNewCompany({...newCompany, companyName: e.target.value})} placeholder="e.g. Acme Inc." required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-url">Company URL</Label>
                                    <Input id="company-url" value={newCompany.companyUrl} onChange={e => setNewCompany({...newCompany, companyUrl: e.target.value})} placeholder="https://acme.com" type="url" required />
                                </div>
                                <Button type="submit" className="w-full">Add Company</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {portfolio.map(company => (
                        <div key={company.companyName} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Image src={company.companyLogoUrl} alt={company.companyName} width={40} height={40} className="w-10 h-10 rounded-md border" data-ai-hint="logo" />
                                <div>
                                    <p className="font-semibold">{company.companyName}</p>
                                    <a href={company.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline flex items-center gap-1.5">
                                        <LinkIcon className="h-3.5 w-3.5" />
                                        {company.companyUrl}
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
                                            This action cannot be undone. This will permanently remove {company.companyName} from your portfolio.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleRemoveCompany(company.companyName)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))}
                     {portfolio.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No portfolio companies added yet.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
