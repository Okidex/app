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
  
  // 2025 Build-Safety: Hooks return null during build, so we guard usage below
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    // Only run in the browser to prevent sessionStorage/router crashes during build
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
    // Safety check for prerendering
    if (typeof window === "undefined" || !firestore) return;

    console.log("[DEBUGGER] Checking Auth State before write:", {
      uid: currentUser?.uid,
      email: currentUser?.email,
    });

    try {
      // 2025 Latency Buffer: Prevents "insufficient permissions" race conditions
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      await setDoc(docRef, data, { merge: true });
      console.log("[DEBUGGER] Firestore Write Successful to:", docRef.path);
    } catch (error: any) {
      console.error("[DEBUGGER] Permission Failure Detected:", error);

      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'create',
        requestResourceData: data,
        authContext: {
            uid: currentUser?.uid,
            tokenExists: !!(await currentUser?.getIdToken())
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
    
    // CRITICAL: Prevent execution if Firebase services are not available (build-time check)
    if (!auth || !firestore) {
        toast({ 
            title: "Initializing...", 
            description: "Please wait for the secure connection to establish.",
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
            throw new Error(result.error || "Session creation failed.");
        }
    } catch(error: any) {
        console.error("Final catch block:", error);
        toast({
            title: "Registration Failed",
            description: error.code === 'permission-denied' 
                ? "Debugger: Security rules rejected this write. Check error logs." 
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
                    <Label htmlFor="education">Education</Label>
                    <Textarea id="education" name="education" placeholder="University, degree..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input id="linkedin" name="linkedin" type="url" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub URL (Optional)</Label>
                        <Input id="github" name="github" type="url" />
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
