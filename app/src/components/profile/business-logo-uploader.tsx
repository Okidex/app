
"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Loader2, Upload, UploadCloud } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BusinessLogoUploaderProps {
  initialLogoUrl: string;
  initialName: string;
}

const MAX_DIMENSION = 200;

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
        }, "image/webp", 0.8);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function BusinessLogoUploader({ initialLogoUrl, initialName }: BusinessLogoUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(initialLogoUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (file: File | null) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      resizeImage(file).then(resizedFile => {
        setSelectedFile(resizedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoUrl(e.target?.result as string);
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
    if (!selectedFile) return;
    setIsLoading(true);
    // Placeholder for actual upload logic to a storage service.
    // In a real app, you would upload `selectedFile` here.
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({ title: "Logo Updated", description: "Your new company logo has been saved." });
    setSelectedFile(null); // Reset after upload
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
        <Button onClick={handleUpload} disabled={isLoading || !selectedFile}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {isLoading ? "Uploading..." : "Upload Logo"}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">Recommended size: 200x200px. WEBP, JPG, PNG, GIF</p>
      </div>
    </div>
  );
}
