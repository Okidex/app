
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createUserAndProfile } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import ProfilePhotoUploader from "./profile-photo-uploader";

export default function TalentRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const registrationDetails = JSON.parse(sessionStorage.getItem('registrationDetails') || '{}');
    const formData = new FormData(e.currentTarget);
    
    const profileData = {
      headline: formData.get('headline') as string,
      about: formData.get('about') as string,
      skills: (formData.get('skills') as string),
      organization: formData.get('organization') as string,
      experience: formData.get('experience') as string,
      education: formData.get('education') as string,
      linkedin: formData.get('linkedin') as string,
      github: formData.get('github') as string,
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

    const result = await createUserAndProfile(
      registrationDetails.email,
      registrationDetails.password,
      registrationDetails.name,
      'talent',
      profileData,
      registrationDetails.subRole,
      avatarDataUrl
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
            <div className="md:col-span-1">
                 <Label className="mb-2 block text-center">Profile Photo</Label>
                <ProfilePhotoUploader onFileChange={setAvatarFile} />
            </div>
            <div className="md:col-span-2 space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" name="headline" placeholder="e.g., Fractional Marketing Leader" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About Me</Label>
                    <Textarea id="about" name="about" placeholder="A brief bio..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Skills</Label>
                        <Input name="skills" placeholder="e.g., React, Node.js" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="organization">Current/Latest Organization</Label>
                        <Input id="organization" name="organization" placeholder="e.g., Acme Inc." />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea id="experience" name="experience" placeholder="Summarize your professional experience, goals, and what you're looking for..." required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="education">Education & Certifications</Label>
                    <Textarea id="education" name="education" placeholder="e.g., B.S. in Computer Science from University of Example, AWS Certified Developer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                        <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub Profile URL (Optional)</Label>
                        <Input id="github" name="github" type="url" placeholder="https://github.com/..." />
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
