
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getProfilePictureTags, updateUserProfile } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useStorage, useUser } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ProfilePictureUploaderProps {
  initialAvatarUrl: string;
  initialName: string;
}

const MAX_DIMENSION = 512; // Max width/height for resized images

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
        if (!ctx) {
            return reject(new Error("Could not get canvas context"));
        }
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
            if (blob) {
                const newFile = new File([blob], file.name, {
                    type: "image/webp",
                    lastModified: Date.now(),
                });
                resolve(newFile);
            } else {
                reject(new Error("Canvas to Blob conversion failed"));
            }
        }, "image/webp", 0.8); // Use webp for better compression
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}


export default function ProfilePictureUploader({ initialAvatarUrl, initialName }: ProfilePictureUploaderProps) {
  const { user } = useUser();
  const storage = useStorage();
  const { toast } = useToast();

  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialAvatarUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      resizeImage(file).then(resizedFile => {
        setSelectedFile(resizedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
          setTags([]);
        };
        reader.readAsDataURL(resizedFile);
      }).catch(error => {
        console.error("Image resize failed:", error);
        toast({ title: "Image resize failed", description: error.message, variant: "destructive" });
      });
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileChange(file || null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile || !user || !storage) {
        toast({ title: "No file selected or user not logged in.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    
    try {
        const storageRef = ref(storage, `profiles/${user.id}/${selectedFile.name.split('.')[0]}.webp`);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const result = await updateUserProfile(user.id, { avatarUrl: downloadURL });

        if (result.success) {
            toast({ title: "Profile Picture Updated", description: "Your new photo has been saved." });
            setPreviewUrl(downloadURL);
            setSelectedFile(null); 
        } else {
            throw new Error(result.error);
        }

    } catch (error: any) {
        toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleAutoTag = async () => {
    if (!previewUrl) return;

    setIsLoadingTags(true);
    setTags([]);

    try {
        const result = await getProfilePictureTags({photoDataUri: previewUrl});
        setTags(result.tags);
    } catch (error) {
        console.error("Error auto-tagging profile picture:", error);
        toast({ title: "Auto-tagging failed", variant: "destructive" });
    } finally {
        setIsLoadingTags(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
       <div 
        className={cn(
            "w-32 h-32 border-2 border-dashed rounded-full flex flex-col items-center justify-center text-muted-foreground cursor-pointer relative overflow-hidden",
            isDragging ? "border-primary bg-accent" : "border-border"
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleUploadClick}
      >
        {previewUrl ? (
          <Image src={previewUrl} alt={initialName} width={128} height={128} className="rounded-full object-cover w-full h-full" />
        ) : (
          <div className="text-center p-4">
            <UploadCloud className="mx-auto h-8 w-8 mb-1" />
            <p className="text-xs">Drag & drop</p>
            <p className="text-xs text-muted-foreground/80">or click</p>
          </div>
        )}
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden"
          accept="image/jpeg, image/png, image/gif"
          onChange={onFileInputChange}
        />
      </div>

       <div className="flex gap-2">
        <Button onClick={handleUpload} disabled={isLoading || !selectedFile}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
        <Button onClick={handleAutoTag} disabled={isLoadingTags || !previewUrl}>
          {isLoadingTags ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Auto-tag with AI
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">Recommended size: 400x400px. JPG, PNG, GIF</p>
      
      {tags.length > 0 && (
        <div className="w-full pt-2">
            <p className="text-sm font-medium mb-2">Suggested Tags:</p>
            <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
            </div>
        </div>
      )}
    </div>
  );
}
