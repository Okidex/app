
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { investmentStages } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Exit, InvestorProfile } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Trash, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { createUserAndSetSession } from "@/lib/auth-actions";
import ProfilePhotoUploader from "./profile-photo-uploader";
import { initializeFirebase } from "@/firebase/client-init";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function InvestorRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [exits, setExits] = useState<Exit[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExit, setNewExit] = useState<Exit>({ companyName: '', companyUrl: '' });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('registrationDetails')) {
      router.push('/register');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const registrationDetailsString = sessionStorage.getItem('registrationDetails');
    if (!registrationDetailsString) {
      toast({
        title: "Registration Error",
        description: "Your session has expired. Please start over.",
        variant: "destructive",
      });
      router.push('/register');
      return;
    }
    const registrationDetails = JSON.parse(registrationDetailsString);
    const formData = new FormData(e.currentTarget);
    
    const investmentStagesChecked = investmentStages.filter(stage => formData.get(`stage-${stage}`));

    const profileData = {
        companyName: formData.get('investorCompanyName') as string,
        companyUrl: formData.get('investorCompanyUrl') as string,
        investorType: formData.get('investorType') as InvestorProfile['investorType'],
        about: formData.get('about') as string,
        investmentInterests: (formData.get('investmentInterests') as string).split(',').map((s: string) => s.trim()),
        investmentStages: investmentStagesChecked,
        exits: exits,
    };
    
    const getFileAsDataURL = async (file: File | null): Promise<string | undefined> => {
        if (!file) return undefined;
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
        });
    };

    const avatarDataUrl = await getFileAsDataURL(avatarFile);

    try {
        const { auth } = initializeFirebase();
        const userCredential = await createUserWithEmailAndPassword(auth, registrationDetails.email, registrationDetails.password);
        const idToken = await userCredential.user.getIdToken();

        const result = await createUserAndSetSession(
            idToken,
            registrationDetails.name,
            'investor',
            profileData,
            undefined,
            avatarDataUrl
        );
        
        if (result.success) {
          sessionStorage.removeItem('registrationDetails');
          router.push("/dashboard");
        } else {
          throw new Error(result.error || "An unknown error occurred.");
        }

    } catch(error: any) {
        toast({
            title: "Registration Failed",
            description: error.message,
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

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
    setNewExit({ companyName: '', companyUrl: '' });
    setIsAddDialogOpen(false);
  };

  const handleRemoveExit = (companyName: string) => {
    setExits(exits.filter(p => p.companyName !== companyName));
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                 <Label className="mb-2 block text-center">Profile Photo</Label>
                 <ProfilePhotoUploader onFileChange={setAvatarFile} />
            </div>
            <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="investorCompanyName">Company Name</Label>
                        <Input name="investorCompanyName" id="investorCompanyName" placeholder="e.g. Smith Ventures"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="investorCompanyUrl">Company URL</Label>
                        <Input name="investorCompanyUrl" id="investorCompanyUrl" placeholder="https://smith.ventures" type="url" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="investorType">Investor Type</Label>
                    <Select name="investorType">
                        <SelectTrigger>
                            <SelectValue placeholder="Select your investor type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GP">General Partner (GP)</SelectItem>
                            <SelectItem value="LP">Limited Partner (LP)</SelectItem>
                            <SelectItem value="Family Office Administrator">Family Office Administrator</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About Me</Label>
                    <Textarea name="about" id="about" placeholder="Write a brief professional bio..." required/>
                </div>
                <div className="space-y-2">
                    <Label>Investment Interests</Label>
                    <Input name="investmentInterests" placeholder="Add interests as comma separated values (e.g., AI, Fintech, SaaS)" />
                    <p className="text-xs text-muted-foreground">Separate interests with a comma.</p>
                </div>
                 <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <Label>Exits</Label>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button type="button" variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Exit</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add an Exit</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddExit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="exit-company-name">Company Name</Label>
                                        <Input id="exit-company-name" value={newExit.companyName} onChange={e => setNewExit({...newExit, companyName: e.target.value})} placeholder="e.g. Innovate Inc." required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="exit-company-url">Company URL</Label>
                                        <Input id="exit-company-url" value={newExit.companyUrl} onChange={e => setNewExit({...newExit, companyUrl: e.target.value})} placeholder="https://innovate.com" type="url" required />
                                    </div>
                                    <Button type="submit" className="w-full">Add Exit</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    
                    <Card className="p-3 space-y-2">
                         {exits.length > 0 ? (
                            exits.map((exit, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex flex-col">
                                      <span className="font-medium">{exit.companyName}</span>
                                      <span className="text-muted-foreground text-xs">{exit.companyUrl}</span>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleRemoveExit(exit.companyName)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center">No exits added yet.</p>
                        )}
                    </Card>
                </div>
                <div className="space-y-2">
                    <Label>Investment Stages</Label>
                    <div className="flex flex-wrap gap-4 pt-2">
                        {investmentStages.map(stage => (
                            <div key={stage} className="flex items-center space-x-2">
                                <Checkbox name={`stage-${stage}`} id={`stage-${stage}`} />
                                <Label htmlFor={`stage-${stage}`}>{stage}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Complete Registration
      </Button>
    </form>
  );
}
