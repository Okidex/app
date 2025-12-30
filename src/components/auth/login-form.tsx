
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

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const resetPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email to reset your password.",
    }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const auth = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
        email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoggingIn(true);
    
    if (!auth) {
        toast({ title: "Auth service not available", variant: "destructive" });
        setIsLoggingIn(false);
        return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      
      const idToken = await userCredential.user.getIdToken();
      const result = await login(idToken);
      
      if (result?.success) {
        toast({ title: "Login successful", description: "Redirecting..." });
        router.refresh();
      } else {
        throw new Error(result?.error || "Failed to establish server session.");
      }

    } catch(error: any) {
       toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
        setIsLoggingIn(false);
    }
  };
  
  const handlePasswordReset = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsResetting(true);
    if(!auth) {
        toast({ title: "Auth service not available", variant: "destructive" });
        setIsResetting(false);
        return;
    }
    try {
        await sendPasswordResetEmail(auth, values.email);
        toast({
            title: "Password Reset Email Sent",
            description: "Please check your inbox.",
        });
        setIsForgotPasswordOpen(false);
    } catch (error: any) {
         toast({
            title: "Error Sending Reset Email",
            description: error.message,
            variant: "destructive",
        });
    } finally {
        setIsResetting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ada@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                   <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                     <Button type="button" variant="link" className="h-auto p-0 text-xs" onClick={() => setIsForgotPasswordOpen(true)}>
                        Forgot Password?
                    </Button>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
      
      <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogDescription>Enter your email address and we&apos;ll send you a link to reset your password.</DialogDescription>
            </DialogHeader>
             <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(handlePasswordReset)} className="space-y-4">
                     <FormField
                        control={resetForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="ada@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isResetting}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isResetting}>
                            {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Reset Link
                        </Button>
                    </DialogFooter>
                </form>
             </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
