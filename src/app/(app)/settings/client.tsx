
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Loader2, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FounderProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { deleteUser, createSession } from "@/lib/auth-actions";

export default function SettingsClient() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    console.log('[DEBUGGER-CLIENT] Starting profile save...');

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const payload = { email };
    console.log('[DEBUGGER-CLIENT] Submitting payload:', payload);

    try {
        const response = await fetch('/api/profile/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log('[DEBUGGER-CLIENT] Received result from /api/profile/update:', result);
        
        if (!response.ok || !result.success) {
          throw new Error(result.error || "An unexpected error occurred.");
        }
        
        toast({
            title: "Settings Saved",
            description: "Your profile has been updated.",
        });
    } catch (error: any) {
        console.error('[DEBUGGER-CLIENT] Save failed:', error);
        toast({
            title: "Save Failed",
            description: error.message,
            variant: "destructive",
        });
    } finally {
        setIsSaving(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (!user) {
        toast({ title: "Error", description: "User not found.", variant: "destructive" });
        return;
    }

    setIsDeleting(true);

    try {
        const companyId = user.role === 'founder' ? (user.profile as FounderProfile)?.companyId : undefined;
        
        const result = await deleteUser(user.id, user.role, window.location.origin, companyId);
        
        if (result.success) {
            toast({
                title: "Account Deleted",
                description: "Your data has been permanently removed.",
            });
            // This needs to be a full page redirect to clear the session
            window.location.assign('/register');
        } else {
            throw new Error(result.error || "An unexpected error occurred.");
        }
    } catch (error: any) {
        toast({
            title: "Error Deleting Account",
            description: error.message,
            variant: "destructive",
        });
    } finally {
        setIsDeleting(false);
    }
  };

  if (isUserLoading || !user) {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }
  
  const isFounder = user.role === 'founder';
  const isPremiumFounder = isFounder && (user.profile as FounderProfile).isPremium;

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and view legal agreements.</p>
      </div>
      
       {isFounder && (
         <Card>
            <CardHeader>
              <CardTitle>Oki+ Subscription</CardTitle>
              <CardDescription>
                {isPremiumFounder 
                    ? "You are an Oki+ member. Manage your subscription and payment details."
                    : "Upgrade to Oki+ to unlock premium features."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/settings/billing">
                        {isPremiumFounder ? "Manage Subscription" : "Upgrade to Oki+"}
                        {!isPremiumFounder && <Star className="ml-2 h-4 w-4" />}
                    </Link>
                </Button>
            </CardContent>
        </Card>
      )}

       <Card>
        <form onSubmit={handleSaveChanges}>
          <CardHeader>
            <CardTitle>Login & Security</CardTitle>
            <CardDescription>Update your contact email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" defaultValue={user.email} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legal Agreements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Link href="/legal/user-agreement" target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between")}>
                Okidex User Agreement
                <ExternalLink className="w-4 h-4" />
            </Link>
        </CardContent>
      </Card>

       <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete your data.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isDeleting ? "Deleting..." : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </CardContent>
      </Card>
    </div>
  );
}
