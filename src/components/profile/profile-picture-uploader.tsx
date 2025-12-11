
"use client";

import { useState, useRef } from "react";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { getProfilePictureTags } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProfilePictureUploaderProps {
  initialAvatarUrl: string;
  initialName: string;
}

export default function ProfilePictureUploader({ initialAvatarUrl, initialName }: ProfilePictureUploaderProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
        setTags([]); // Reset tags when a new image is selected
      };
      reader.readAsDataURL(file);
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
    setIsLoading(true);
    // Placeholder for actual upload logic to a storage service.
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };
  
  const handleAutoTag = async () => {
    if (!avatarUrl || avatarUrl === initialAvatarUrl) return;

    setIsLoadingTags(true);
    setTags([]);

    try {
        const result = await getProfilePictureTags({photoDataUri: avatarUrl});
        setTags(result.tags);
    } catch (error) {
        console.error("Error auto-tagging profile picture:", error);
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
        {avatarUrl ? (
          <Image src={avatarUrl} alt={initialName} width={128} height={128} className="rounded-full object-cover w-full h-full" />
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
        <Button onClick={handleUpload} disabled={isLoading || avatarUrl === initialAvatarUrl}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
        <Button onClick={handleAutoTag} disabled={isLoadingTags || avatarUrl === initialAvatarUrl}>
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
