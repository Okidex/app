
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useStorage, useUser, useAuth } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getProfilePictureTags } from "@/lib/actions";

interface ProfilePictureUploaderProps {
  initialAvatarUrl: string;
  initialName: string;
}

const MAX_DIMENSION = 512;

async function resizeImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > height) {
          if (width > MAX_DIMENSION) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not get canvas context"));
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(new File([blob], file.name, { type: "image/webp", lastModified: Date.now() }));
            } else {
                reject(new Error("Canvas to Blob failed"));
            }
        }, "image/webp", 0.8);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function ProfilePictureUploader({ initialAvatarUrl, initialName }: ProfilePictureUploaderProps) {
  const { user, refreshUser } = useUser();
  const storage = useStorage();
  const auth = useAuth();
  const { toast } = useToast();

  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialAvatarUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      resizeImage(file).then(resizedFile => {
        setSelectedFile(resizedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
          setTags([]);
        };
        reader.readAsDataURL(resizedFile);
      }).catch(err => toast({ title: "Resize failed", variant: "destructive" }));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.uid || !storage || !auth?.currentUser) {
        toast({ title: "No file or session missing.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    
    try {
        const storageRef = ref(storage, `profiles/${user.uid}/${Date.now()}.webp`);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        const idToken = await auth.currentUser.getIdToken();
        const payload = { avatarUrl: downloadURL };

        const response = await fetch('/api/profile/update', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error(result.error || "Failed to save profile picture URL.");
        }

        toast({ title: "Success", description: "Profile picture saved." });
        setPreviewUrl(downloadURL);
        setSelectedFile(null);
        refreshUser();
    } catch (error: any) {
        toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  const handleAutoTag = async () => {
    if (!previewUrl) return;
    setIsLoadingTags(true);
    try {
        const result = await getProfilePictureTags({ photoDataUri: previewUrl });
        setTags(result.tags);
    } catch (error) {
        toast({ title: "Auto-tagging failed", variant: "destructive" });
    } finally {
        setIsLoadingTags(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
       <div 
        className={cn(
            "w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden",
            isDragging ? "border-primary bg-accent" : "border-border"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0]); }}
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <Image src={previewUrl} alt={initialName} width={128} height={128} className="rounded-full object-cover w-full h-full" />
        ) : (
          <div className="text-center p-4">
            <UploadCloud className="mx-auto h-8 w-8 mb-1" />
            <p className="text-xs">Upload</p>
          </div>
        )}
        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
      </div>

       <div className="flex gap-2">
        <Button onClick={handleUpload} disabled={isLoading || !selectedFile}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          Upload
        </Button>
        <Button variant="outline" onClick={handleAutoTag} disabled={isLoadingTags || !previewUrl}>
          {isLoadingTags && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          AI Tag
        </Button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag, i) => <Badge key={i} variant="secondary">{tag}</Badge>)}
        </div>
      )}
    </div>
  );
}
