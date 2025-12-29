"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Loader2, AlertCircle } from "lucide-react";

// Internal absolute imports to bypass barrel file circularity
import { useAuth } from "@/firebase/provider"; 
import { login } from "@/lib/auth-actions";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email to reset your password."),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    if (!auth) {
      toast({ title: "Error", description: "Auth service unavailable.", variant: "destructive" });
      return;
    }

    setIsLoggingIn(true);

    try {
      // 1. Firebase Client-Side Auth
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const idToken = await userCredential.user.getIdToken();

      // 2. Set Server-Side Session Cookie via Action
      const result = await login(idToken);

      if (result?.success) {
        toast({ title: "Success", description: "Syncing session and redirecting..." });
        
        // 3. Sync the Next.js Router Cache
        router.refresh();

        // 4. Force navigation with a small delay to ensure cookie propagation
        // Required for Firebase Studio proxy environments
        startTransition(() => {
          setTimeout(() => {
            router.push("/dashboard");
          }, 200);
        });
      } else {
        throw new Error(result?.error || "Failed to sync session.");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials.",
        variant: "destructive",
      });
      setIsLoggingIn(false); // Only reset if login failed
    }
  }

  async function onReset(values: z.infer<typeof resetSchema>) {
    if (!auth) return;
    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast({ title: "Email Sent", description: "Check your inbox for reset instructions." });
      setIsForgotOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ada@example.com" {...field} autoComplete="email" />
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
                  <Button 
                    type="button" 
                    variant="link" 
                    className="px-0 font-normal text-xs" 
                    onClick={() => setIsForgotOpen(true)}
                  >
                    Forgot Password?
                  </Button>
                </div>
                <FormControl>
                  <Input type="password" {...field} autoComplete="current-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <Dialog open={isForgotOpen} onOpenChange={setIsForgotOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              We&apos;ll send a recovery link to your email.
            </DialogDescription>
          </DialogHeader>
          <Form {...resetForm}>
            <form onSubmit={resetForm.handleSubmit(onReset)} className="space-y-4">
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
                  <Button type="button" variant="outline">Cancel</Button>
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
