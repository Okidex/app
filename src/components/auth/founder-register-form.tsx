
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { investmentStages } from "@/lib/constants";
import { useState, useEffect } from "react";
import { FounderProfile, FullUserProfile, Startup } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import LogoUploader from "./logo-uploader";
import { useAuth, useFirestore, FirestorePermissionError, errorEmitter } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { createUserAndSetSession } from "@/lib/auth-actions";

export default function FounderRegisterFormClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem('registrationDetails')) {
        router.push('/register');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!auth || !firestore) {
        toast({ title: "System Initializing...", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);
    
    const registrationDetailsString = sessionStorage.getItem('registrationDetails');
    if (!registrationDetailsString) {
      toast({ title: "Registration Error", description: "Session expired.", variant: "destructive" });
      router.push('/register');
      return;
    }
    
    const registrationDetails = JSON.parse(registrationDetailsString);
    const formData = new FormData(e.currentTarget);
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, registrationDetails.email, registrationDetails.password);
        const { user } = userCredential;
        
        // 1. Create Startup Document
        const startupRef = doc(collection(firestore, 'startups'));
        const startupId = startupRef.id;
        const companyName = formData.get('companyName') as string;

        const newStartup: Startup = {
            id: startupId,
            companyName: companyName,
            companyLogoUrl: `https://picsum.photos/seed/${companyName.toLowerCase().replace(/\s/g, '-')}/200/200`,
            founderIds: [user.uid],
            industry: formData.get('industry') as string,
            stage: formData.get('stage') as Startup['stage'],
            tagline: formData.get('tagline') as string,
            description: formData.get('description') as string,
            website: formData.get('website') as string,
            financials: { // Default empty financials
                companyName,
                revenue: 0,
                expenses: 0,
                netIncome: 0,
                grossProfitMargin: 0,
                ebitda: 0,
                customerAcquisitionCost: 0,
                customerLifetimeValue: 0,
                monthlyRecurringRevenue: 0,
                cashBurnRate: 0,
                runway: 0,
            },
            monthlyFinancials: [],
            capTable: [],
            incorporationDetails: { isIncorporated: false },
        };
        
        await setDoc(startupRef, newStartup);

        // 2. Create User Document
        const profile: FounderProfile = {
          companyId: startupId,
          isLead: true,
          isPremium: false, // Default to non-premium
          title: 'Founder',
        };

        const fullUser: FullUserProfile = {
            id: user.uid,
            email: user.email!,
            name: registrationDetails.name,
            role: 'founder',
            avatarUrl: 'https://picsum.photos/seed/new-founder-avatar/400/400',
            profile,
        };
        
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, fullUser).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'create',
                requestResourceData: fullUser,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError;
        });

        // 3. Create session and redirect
        const idToken = await user.getIdToken();
        const result = await createUserAndSetSession(idToken);

        if (result.success) {
            sessionStorage.removeItem('registrationDetails');
            router.push("/dashboard");
        } else {
            throw new Error(result.error || "Session creation failed.");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Label className="mb-2 block text-center">Company Logo</Label>
                <LogoUploader onFileChange={setLogoFile} />
            </div>
            <div className="md:col-span-2 space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" placeholder="e.g., InnovateAI" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="tagline">Company Tagline</Label>
                    <Input id="tagline" name="tagline" placeholder="e.g., AI for everyone" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" name="industry" placeholder="e.g., Artificial Intelligence" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stage">Stage</Label>
                        <Select name="stage" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your startup's stage" />
                            </SelectTrigger>
                            <SelectContent>
                                {investmentStages.map(stage => (
                                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" type="url" placeholder="https://..." required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea id="description" name="description" placeholder="What does your company do?" required />
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
