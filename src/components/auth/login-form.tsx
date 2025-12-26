"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { login } from "@/lib/auth-actions";

// ... (Schemas remain the same)

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const auth = useAuth();

  // ... (Form initializations remain the same)

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoggingIn(true);
    
    if (!auth) {
        toast({ title: "Auth service not available", variant: "destructive" });
        setIsLoggingIn(false);
        return;
    }

    try {
      // 1. Authenticate with Firebase Client SDK
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      
      // 2. Get the ID Token
      const idToken = await userCredential.user.getIdToken();
      
      // 3. Sync to Server (Sets the __session cookie)
      const result = await login(idToken);
      
      if (result?.success) {
        toast({ title: "Login successful", description: "Redirecting to dashboard..." });
        
        // 4. CRITICAL FIX: Refresh the router to acknowledge the cookie 
        // before navigating to prevent "Double Login" loop.
        router.refresh();
        router.push("/dashboard");
      } else {
        throw new Error(result?.error || "Failed to establish server session.");
      }

    } catch(error: any) {
       setIsLoggingIn(false);
       toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  // ... (handlePasswordReset remains the same)

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* ... Form Fields ... */}
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoggingIn ? 'Establishing session...' : 'Login'}
          </Button>
        </form>
      </Form>
      
      {/* ... Forgot Password Dialog ... */}
    </>
  );
}
