
"use client";

import { useState, useRef } from "react";
import { UploadCloud, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfilePhotoUploaderProps {
  onFileChange: (file: File | null) => void;
}

export default function ProfilePhotoUploader({ onFileChange }: ProfilePhotoUploaderProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFileChange(file);
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

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className={cn(
            "w-48 h-48 border-2 border-dashed rounded-full flex flex-col items-center justify-center text-muted-foreground cursor-pointer transition-colors relative overflow-hidden",
            isDragging ? "border-primary bg-accent" : "border-border"
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleUploadClick}
      >
        {photoUrl ? (
          <Image src={photoUrl} alt="Profile Photo" width={192} height={192} className="rounded-full object-cover w-full h-full" />
        ) : (
          <div className="text-center p-4">
            <User className="mx-auto h-12 w-12 mb-2" />
            <p className="text-sm">Drag & drop photo</p>
             <p className="text-xs text-muted-foreground/80 mt-1">or click to browse</p>
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
      <p className="text-xs text-muted-foreground px-4 text-center">Recommended: 400x400px. JPG, PNG, GIF.</p>
    </div>
  );
}
