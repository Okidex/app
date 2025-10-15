
"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Loader2, Upload, UploadCloud } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BusinessLogoUploaderProps {
  initialLogoUrl: string;
  initialName: string;
}

export default function BusinessLogoUploader({ initialLogoUrl, initialName }: BusinessLogoUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(initialLogoUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
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

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className={cn(
            "w-48 h-48 border-2 border-dashed rounded-full flex flex-col items-center justify-center text-muted-foreground cursor-pointer transition-colors",
            isDragging ? "border-primary bg-accent" : "border-border"
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleUploadClick}
      >
        {logoUrl ? (
          <Image src={logoUrl} alt={initialName} width={192} height={192} className="rounded-full object-cover w-full h-full" />
        ) : (
          <div className="text-center p-4">
            <UploadCloud className="mx-auto h-10 w-10 mb-2" />
            <p className="text-sm">Drag & drop your logo here</p>
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
      <div className="text-center">
        <Button onClick={handleUpload} disabled={isLoading || logoUrl === initialLogoUrl}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {isLoading ? "Uploading..." : "Upload Logo"}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">Recommended size: 200x200px. JPG, PNG, GIF</p>
      </div>
    </div>
  );
}
