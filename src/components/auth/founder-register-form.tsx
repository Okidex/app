
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { investmentStages } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { createUserAndProfile } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { InvestmentStage } from "@/lib/types";
import ProfilePhotoUploader from "./profile-photo-uploader";
import LogoUploader from "./logo-uploader";

export default function FounderRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isIncorporated, setIsIncorporated] = useState(false);
  const [incorporationDate, setIncorporationDate] = useState<Date | undefined>();
  const [isSeekingCoFounder, setIsSeekingCoFounder] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const registrationDetails = JSON.parse(sessionStorage.getItem('registrationDetails') || '{}');
    const formData = new FormData(e.currentTarget);

    const profileData = {
        title: formData.get('title') as string,
        companyName: formData.get('companyName') as string,
        tagline: formData.get('tagline') as string,
        industry: formData.get('industry') as string,
        stage: formData.get('stage') as InvestmentStage,
        website: formData.get('website') as string,
        description: formData.get('description') as string,
        isSeekingCoFounder,
        isIncorporated,
        country: formData.get('country') as string,
        incorporationType: formData.get('incorporation-type') as string,
        incorporationDate: incorporationDate?.toISOString(),
        entityNumber: formData.get('entity-number') as string,
        taxId: formData.get('tax-id') as string,
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
    const logoDataUrl = await getFileAsDataURL(logoFile);

    const result = await createUserAndProfile(
      registrationDetails.email,
      registrationDetails.password,
      registrationDetails.name,
      'founder',
      profileData,
      undefined,
      avatarDataUrl,
      logoDataUrl
    );
    
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
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
            <div className="flex items-center space-x-2 pt-2">
                <Switch 
                    id="is-seeking-cofounder" 
                    checked={isSeekingCoFounder}
                    onCheckedChange={setIsSeekingCoFounder}
                />
                <Label htmlFor="is-seeking-cofounder">Open to Co-founder Opportunities</Label>
            </div>
             <div className="flex items-center space-x-2 pt-2">
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
                                    <SelectItem value="PLT">PLT</SelectItem>
                                    <SelectItem value="PLC">PLC</SelectItem>
                                    <SelectItem value="OPC">OPC</SelectItem>
                                    <SelectItem value="LLPs">LLPs</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="incorporation-date">Date of Incorporation</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !incorporationDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {incorporationDate ? format(incorporationDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={incorporationDate}
                                        onSelect={setIncorporationDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
