"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
/** 
 * FIXED FOR DECEMBER 2025: 
 * Direct import from the specific hook file to bypass barrel file circularity.
 * Based on your file structure, the correct path is '@/firebase/auth/use-user'.
 */
import { useUser } from "@/firebase/auth/use-user"; 
import LoginForm from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is already logged in, sync the session and move to dashboard
    if (!isUserLoading && user) {
      router.refresh();
      router.replace("/dashboard");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  // Prevent flash of form if user is found (redirecting)
  if (user) return null;

  return (
    <div className="w-full max-w-md animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account. Don&apos;t have one?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs text-muted-foreground">
          <strong>Okidex is in early access.</strong> We&apos;re working toward a full release. Your feedback is invaluable—please{' '}
          <a href="mailto:wilfred@okidex.com" className="underline">
            share your thoughts with us
          </a>
          .
        </AlertDescription>
      </Alert>
    </div>
  );
}
