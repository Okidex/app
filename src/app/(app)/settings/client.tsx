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
import { logout, deleteCurrentUserAccount } from "@/lib/auth-actions";


export default function SettingsClient() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your login and security settings have been updated.",
    });
  };
  
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    if (!user) {
        toast({ title: "Error", description: "Could not delete account. User not found.", variant: "destructive" });
        setIsDeleting(false);
        return;
    }

    const result = await deleteCurrentUserAccount(user.id, user.role, (user.profile as FounderProfile)?.companyId);
    
    setIsDeleting(false);

    if (result.success) {
        toast({
            title: "Account Deleted",
            description: "Your account and all associated data have been permanently deleted.",
        });
        await logout();
        router.push('/register');
    } else {
        toast({
            title: "Error Deleting Account",
            description: result.error || "An unexpected error occurred.",
            variant: "destructive",
        });
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
    )
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
                    : "Upgrade to Oki+ to unlock premium features and accelerate your startup's growth."
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
            <CardDescription>
              Update your email and password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legal Agreements</CardTitle>
          <CardDescription>
            Below are the terms and policies that govern your use of Okidex.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Link href="/legal/user-agreement" target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between")}>
                Okidex User Agreement
                <ExternalLink className="w-4 h-4" />
            </Link>
            <Link href="/legal/privacy-policy" target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between")}>
                Okidex Privacy Policy
                <ExternalLink className="w-4 h-4" />
            </Link>
        </CardContent>
      </Card>

       <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              These actions are permanent and cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting}>
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
