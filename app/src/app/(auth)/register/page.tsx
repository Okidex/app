
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Join the premier platform for innovation. Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Log In
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs text-muted-foreground">
          <strong>Okidex is in early access.</strong> We're working to a full release and are actively developing new features, so things may change. Your feedback is invaluable—please{' '}
          <a href="mailto:wilfred@okidex.com" className="underline">
            share your thoughts with us
          </a>
          .
        </AlertDescription>
      </Alert>
    </div>
  );
}
