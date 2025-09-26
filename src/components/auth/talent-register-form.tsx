
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProfilePhotoUploader from "./profile-photo-uploader";

export default function TalentRegisterForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                 <Label className="mb-2 block text-center">Profile Photo</Label>
                <ProfilePhotoUploader />
            </div>
            <div className="md:col-span-2 space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" placeholder="e.g., Fractional Marketing Leader" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About Me</Label>
                    <Textarea id="about" placeholder="A brief bio..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Skills</Label>
                        <Input placeholder="e.g., React, Node.js" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="organization">Current/Latest Organization</Label>
                        <Input id="organization" placeholder="e.g., Acme Inc." />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea id="experience" placeholder="Summarize your professional experience, goals, and what you're looking for..." required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="education">Education & Certifications</Label>
                    <Textarea id="education" placeholder="e.g., B.S. in Computer Science from University of Example, AWS Certified Developer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                        <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/..." required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub Profile URL (Optional)</Label>
                        <Input id="github" type="url" placeholder="https://github.com/..." />
                    </div>
                </div>
            </div>
        </div>
      <Button type="submit" className="w-full">
        Complete
      </Button>
    </form>
  );
}
