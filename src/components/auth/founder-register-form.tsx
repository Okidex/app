
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { investmentStages, founderObjectives } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createUserAndSetSession } from "@/lib/auth-actions";
import { useToast } from "@/hooks/use-toast";
import { InvestmentStage, FounderObjective, Startup, FounderProfile, FullUserProfile } from "@/lib/types";
import ProfilePhotoUploader from "./profile-photo-uploader";
import LogoUploader from "./logo-uploader";
import { useAuth, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "../ui/date-input";
import { doc, setDoc, collection } from "firebase/firestore";


export default function FounderRegisterFormClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isIncorporated, setIsIncorporated] = useState(false);
  const [incorporationDate, setIncorporationDate] = useState<string>('');
  const [isSeekingCoFounder, setIsSeekingCoFounder] = useState(false);
  const [selectedObjectives, setSelectedObjectives] = useState<FounderObjective[]>([]);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (!sessionStorage.getItem('registrationDetails')) {
      router.push('/register');
    }
  }, [router]);

  const handleObjectiveChange = (objective: FounderObjective) => {
    // Also manage the isSeekingCoFounder state if that objective is toggled
    if (objective === 'seekingCoFounders') {
      setIsSeekingCoFounder(prev => !prev);
    }

    setSelectedObjectives(prev => 
      prev.includes(objective) 
        ? prev.filter(o => o !== objective) 
        : [...prev, objective]
    );
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
      toast({
        title: 'Registration Error',
        description: 'Firebase services are not available.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, registrationDetails.email, registrationDetails.password);
        const { user } = userCredential;
        
        const avatarUrl = 'https://picsum.photos/seed/new-founder-avatar/400/400';
        
        const startupRef = doc(collection(firestore, "startups"));
        const companyLogoUrl = `https://picsum.photos/seed/logo-${startupRef.id}/200/200`;
        
        const startupData: Startup = {
            id: startupRef.id,
            companyName: formData.get('companyName') as string,
            companyLogoUrl,
            founderIds: [user.uid],
            industry: formData.get('industry') as string,
            stage: formData.get('stage') as InvestmentStage,
            tagline: formData.get('tagline') as string,
            website: formData.get('website') as string,
            description: formData.get('description') as string,
            financials: { revenue: 0, expenses: 0, netIncome: 0, grossProfitMargin: 0, ebitda: 0, customerAcquisitionCost: 0, customerLifetimeValue: 0, monthlyRecurringRevenue: 0, cashBurnRate: 0, runway: 0, companyName: formData.get('companyName') as string },
            monthlyFinancials: [],
            capTable: [],
            incorporationDetails: {
                isIncorporated: isIncorporated,
                country: formData.get('country') as string,
                incorporationType: formData.get('incorporation-type') as 'C-Corp' | 'S-Corp' | 'LLC' | 'Other',
                incorporationDate: incorporationDate ? new Date(incorporationDate).toISOString() : undefined,
                entityNumber: formData.get('entity-number') as string,
                taxId: formData.get('tax-id') as string,
            }
        };

        const profile: FounderProfile = {
            companyId: startupRef.id,
            title: formData.get('title') as string,
            isLead: true,
            isPremium: false,
            isSeekingCoFounder,
            objectives: selectedObjectives,
        };
        
        const fullUser: FullUserProfile = {
            id: user.uid,
            email: user.email!,
            name: registrationDetails.name,
            role: 'founder',
            avatarUrl,
            profile,
        };

        await setDoc(startupRef, startupData);
        
        const userDocRef = doc(firestore, 'users', user.uid);
        
        setDoc(userDocRef, fullUser, { merge: true }).catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'create',
                requestResourceData: fullUser,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

        // Now call server action just to set the cookie
        const idToken = await user.getIdToken();
        const result = await createUserAndSetSession(idToken);
        
        if (result.success) {
            router.push("/dashboard");
        } else {
            throw new Error(result.error || "Failed to set session.");
        }

    } catch (error: any) {
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
         <div className="md:col-span-1 space-y-8">
            <div>
                <Label className="mb-2 block text-center">Profile Photo</Label>
                <ProfilePhotoUploader onFileChange={setAvatarFile} />
            </div>
             <div>
                <Label className="mb-2 block text-center">Company Logo</Label>
                <LogoUploader onFileChange={setLogoFile} />
            </div>
        </div>
        <div className="md:col-span-2 space-y-6">
            <div>
                <h3 className="text-lg font-medium">Your Founder Profile</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Your Title</Label>
                        <Input name="title" id="title" placeholder="e.g., CEO & Co-founder" required />
                    </div>
                </div>
            </div>
          
          <Separator />

          <div className="space-y-4">
             <h3 className="text-lg font-medium">Your Startup Details</h3>
            <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input name="companyName" id="companyName" placeholder="e.g., InnovateAI" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="tagline">Company Tagline</Label>
                <Input name="tagline" id="tagline" placeholder="e.g., Bringing AI to every business" required />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input name="industry" id="industry" placeholder="e.g., Artificial Intelligence" required />
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
                <Input name="website" id="website" type="url" placeholder="https://innovate.ai" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea name="description" id="description" placeholder="Describe your company, vision, and product..." required />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What are you looking for?</h3>
            <div className="grid grid-cols-2 gap-4">
              {founderObjectives.map((obj) => (
                <div key={obj.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`objective-${obj.id}`}
                    checked={selectedObjectives.includes(obj.id)}
                    onCheckedChange={() => handleObjectiveChange(obj.id)}
                  />
                  <Label htmlFor={`objective-${obj.id}`}>{obj.label}</Label>
                </div>
              ))}
            </div>
             {selectedObjectives.includes('fundraising') && (
              <div className="space-y-2 pt-2">
                <Label htmlFor="fundraisingGoal">Fundraising Goal (USD)</Label>
                <Input type="number" id="fundraisingGoal" name="fundraisingGoal" placeholder="e.g., 500000" />
              </div>
            )}
          </div>
          
          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Switch id="is-incorporated" name="isIncorporated" checked={isIncorporated} onCheckedChange={setIsIncorporated} />
                <Label htmlFor="is-incorporated">Is your startup incorporated?</Label>
            </div>

            {isIncorporated && (
                <div className="space-y-4 pt-4 border-t">
                     <h4 className="text-md font-medium">Incorporation Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="country">Country of Incorporation</Label>
                            <Input name="country" id="country" placeholder="e.g., USA" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="incorporation-type">Incorporation Type</Label>
                            <Select name="incorporation-type">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="C-Corp">C-Corp</SelectItem>
                                    <SelectItem value="S-Corp">S-Corp</SelectItem>
                                    <SelectItem value="LLC">LLC</SelectItem>
                                    <SelectItem value="Private Limited">Private Limited</SelectItem>
                                    <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
                                    <SelectItem value="Charity">Charity</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <DateInput 
                                label="Date of Incorporation"
                                value={incorporationDate}
                                onChange={(e) => setIncorporationDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="entity-number">Unique Entity Number (UEN)</Label>
                            <Input name="entity-number" id="entity-number" placeholder="e.g., 123456789" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tax-id">Business Tax ID / EIN</Label>
                        <Input name="tax-id" id="tax-id" placeholder="e.g., 98-7654321" />
                    </div>
                </div>
            )}
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
