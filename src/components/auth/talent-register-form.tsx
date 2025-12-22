"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { createUserAndSetSession } from "@/lib/auth-actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import ProfilePhotoUploader from "./profile-photo-uploader";
import { useAuth, useFirestore, FirestorePermissionError, errorEmitter } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TalentProfile, FullUserProfile } from "@/lib/types";
import { doc, setDoc } from "firebase/firestore";

export default function TalentRegisterFormClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  // 2025 Build-Safety: Initialize hooks but guard their usage
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    // Only run session check in the browser
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem('registrationDetails')) {
        router.push('/register');
      }
    }
  }, [router]);

  /**
   * DEBUGGER SCRIPT: Detailed Error Reporting
   */
  const executeDebuggableWrite = async (docRef: any, data: any, currentUser: any) => {
    // Guard: Prevent execution during Next.js prerendering
    if (typeof window === "undefined" || !firestore) return;

    console.log("[DEBUGGER] Checking Permission State for UID:", currentUser?.uid);

    try {
      await new Promise(resolve => setTimeout(resolve, 800)); 
      await setDoc(docRef, data, { merge: true });
      console.log("[DEBUGGER] Profile Write Successful.");
    } catch (error: any) {
      console.error("[DEBUGGER] Firestore Permission Denial Details:", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'create',
        requestResourceData: data,
        authContext: {
            uid: currentUser?.uid,
            hasValidToken: !!(await currentUser?.getIdToken())
        },
        errorCode: error.code,
        errorMessage: error.message
      });
      errorEmitter.emit('permission-error', permissionError);
      throw error; 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // CRITICAL: Prevent the build server from attempting Auth/Firestore calls
    if (!auth || !firestore) {
        toast({ 
            title: "System initializing", 
            description: "Please wait a moment and try again.",
            variant: "destructive" 
        });
        return;
    }

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

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, registrationDetails.email, registrationDetails.password);
        const { user } = userCredential;
        
        const avatarUrl = 'https://picsum.photos/seed/new-talent-avatar/400/400';

        const profile: TalentProfile = {
          subRole: registrationDetails.subRole,
          headline: formData.get('headline') as string,
          skills: (formData.get('skills') as string).split(',').map(s => s.trim()),
          experience: formData.get('experience') as string,
          linkedin: formData.get('linkedin') as string,
          github: formData.get('github') as string,
          about: formData.get('about') as string,
          organization: formData.get('organization') as string,
          education: formData.get('education') as string,
          isSeekingCoFounder: registrationDetails.subRole === 'co-founder',
        };

        const fullUser: FullUserProfile = {
            id: user.uid,
            email: user.email!,
            name: registrationDetails.name,
            role: 'talent',
            avatarUrl,
            profile,
        };
        
        const userDocRef = doc(firestore, 'users', user.uid);
        await executeDebuggableWrite(userDocRef, fullUser, user);

        const idToken = await user.getIdToken();
        const result = await createUserAndSetSession(idToken);

        if (result.success) {
            sessionStorage.removeItem('registrationDetails');
            router.push("/dashboard");
        } else {
            throw new Error(result.error || "Session initialization failed.");
        }
    } catch(error: any) {
        console.error("Submission Error:", error);
        toast({
            title: "Registration Failed",
            description: error.code === 'permission-denied' 
                ? "Permission Denied: Check Firestore rules for the users collection." 
                : error.message,
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
                    <Textarea id="experience" name="experience" placeholder="Professional summary..." required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="education">Education & Certifications</Label>
                    <Textarea id="education" name="education" placeholder="Degrees or certifications..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                        <Input id="linkedin" name="linkedin" type="url" placeholder="https://..." required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub Profile URL (Optional)</Label>
                        <Input id="github" name="github" type="url" placeholder="https://..." />
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
