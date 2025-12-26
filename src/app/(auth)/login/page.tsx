"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase"; // Assuming this is your hook using onAuthStateChanged
import LoginForm from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // Fixes "Double Login" by immediately moving users who are already logged in 
  // (e.g., via persistent cookie) away from the login page.
  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isUserLoading, router]);

  // Prevents the "Flash" of the login form while checking auth state
  if (isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  // If user is logged in, don't render the form (prevents "Double Login" flicker)
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
          <strong>Okidex is in early access.</strong> We&apos;re working toward a full release and are actively developing new features, so things may change. Your feedback is invaluable—please{' '}
          <a href="mailto:wilfred@okidex.com" className="underline">
            share your thoughts with us
          </a>
          .
        </AlertDescription>
      </Alert>
    </div>
  );
}
