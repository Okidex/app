"use client";

import LoginForm from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function LoginPage() {
  // Middleware now handles all redirection logic.
  // This page is now only responsible for rendering the form.
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
