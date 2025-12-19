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
import { Exit, InvestorProfile, FullUserProfile } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Trash, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { createUserAndSetSession } from "@/lib/auth-actions";
import ProfilePhotoUploader from "./profile-photo-uploader";
import { useAuth, useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function InvestorRegisterFormClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [exits, setExits] = useState<Exit[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExit, setNewExit] = useState<Exit>({ companyName: '', companyUrl: '' });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (!sessionStorage.getItem('registrationDetails')) {
      router.push('/register');
    }
  }, [router]);

  /**
   * DEBUGGER SCRIPT: Detailed Permission Error Reporting
   * Specifically designed to catch race conditions during new user creation.
   */
  const executeDebuggableWrite = async (docRef: any, data: any, currentUser: any) => {
    console.log("[DEBUGGER] Verifying Session before Firestore Write:", {
      uid: currentUser?.uid,
      path: docRef.path
    });

    try {
      // 2025 Buffer: Give Firebase Security Rules time to sync with the new Auth Token
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      await setDoc(docRef, data, { merge: true });
      console.log("[DEBUGGER] Success: Profile persisted to Firestore.");
    } catch (error: any) {
      console.error("[DEBUGGER] CRITICAL PERMISSION ERROR:", error);

      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'create',
        requestResourceData: data,
        authContext: {
            uid: currentUser?.uid,
            token: !!(await currentUser?.getIdToken())
        },
        errorCode: error.code,
        errorMessage: error.message
      });

      // Emit to your global error monitor/dashboard
      errorEmitter.emit('permission-error', permissionError);
      throw error; 
    }
  };

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

    if (!auth || !firestore) {
        toast({ title: "Auth/Firestore unavailable", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    try {
        // 1. Authenticate User
        const userCredential = await createUserWithEmailAndPassword(auth, registrationDetails.email, registrationDetails.password);
        const { user } = userCredential;
        
        const avatarUrl = 'https://picsum.photos/seed/new-investor-avatar/400/400';
        const investmentStagesChecked = investmentStages.filter(stage => formData.get(`stage-${stage}`));
        
        const profile: InvestorProfile = {
            companyName: formData.get('investorCompanyName') as string,
            companyUrl: formData.get('investorCompanyUrl') as string,
            investorType: formData.get('investorType') as InvestorProfile['investorType'],
            about: formData.get('about') as string,
            investmentInterests: (formData.get('investmentInterests') as string).split(',').map((s: string) => s.trim()),
            investmentStages: investmentStagesChecked,
            exits: exits,
            portfolio: [],
        };
        
        const fullUser: FullUserProfile = {
            id: user.uid,
            email: user.email!,
            name: registrationDetails.name,
            role: 'investor',
            avatarUrl,
            profile,
        };

        const userDocRef = doc(firestore, 'users', user.uid);
        
        // 2. Execute Debuggable Firestore Write
        await executeDebuggableWrite(userDocRef, fullUser, user);

        // 3. Create Server-Side Session
        const idToken = await user.getIdToken();
        const result = await createUserAndSetSession(idToken);
        
        if (result.success) {
          sessionStorage.removeItem('registrationDetails');
          router.push("/dashboard");
        } else {
          throw new Error(result.error || "Failed to establish session.");
        }

    } catch(error: any) {
        toast({
            title: "Registration Failed",
            description: error.code === 'permission-denied' 
                ? "Debugger: Firestore permission denied. Check terminal/error logs." 
                : error.message,
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleAddExit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExit.companyName || !newExit.companyUrl) {
      toast({ title: "Missing Info", variant: "destructive" });
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
                        <Input name="investorCompanyUrl" id="investorCompanyUrl" placeholder="https://..." type="url" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="investorType">Investor Type</Label>
                    <Select name="investorType">
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GP">General Partner (GP)</SelectItem>
                            <SelectItem value="LP">Limited Partner (LP)</SelectItem>
                            <SelectItem value="Family Office Administrator">Family Office Administrator</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About Me</Label>
                    <Textarea name="about" id="about" placeholder="Bio..." required/>
                </div>
                <div className="space-y-2">
                    <Label>Investment Interests</Label>
                    <Input name="investmentInterests" placeholder="AI, Fintech, SaaS" />
                </div>
                 <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <Label>Exits</Label>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="sm"><PlusCircle className="h-4 w-4 mr-2" />Add Exit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Add Exit</DialogTitle></DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Company Name</Label>
                                    <Input value={newExit.companyName} onChange={(e) => setNewExit({...newExit, companyName: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Company URL</Label>
                                    <Input value={newExit.companyUrl} onChange={(e) => setNewExit({...newExit, companyUrl: e.target.value})} />
                                </div>
                                <Button onClick={handleAddExit} className="w-full">Add</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {exits.map((exit) => (
                            <Card key={exit.companyName} className="p-3 flex justify-between items-center">
                                <span>{exit.companyName}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveExit(exit.companyName)}><Trash className="h-4 w-4 text-destructive" /></Button>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Investment Stages</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                        {investmentStages.map((stage) => (
                            <div key={stage} className="flex items-center space-x-2">
                                <Checkbox id={`stage-${stage}`} name={`stage-${stage}`} />
                                <Label htmlFor={`stage-${stage}`} className="text-sm font-normal cursor-pointer capitalize">{stage}</Label>
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
