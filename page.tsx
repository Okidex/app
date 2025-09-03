
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UserRole } from '@/lib/types';
import Logo from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';

export default function AuthenticationPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [signInEmail, setSignInEmail] = React.useState('');
  const [signInPassword, setSignInPassword] = React.useState('');
  const [resetEmail, setResetEmail] = React.useState('');
  
  const [signUpName, setSignUpName] = React.useState('');
  const [signUpEmail, setSignUpEmail] = React.useState('');
  const [signUpPassword, setSignUpPassword] = React.useState('');
  const [signUpRole, setSignUpRole] = React.useState<UserRole | ''>('');
  const [signUpAgreed, setSignUpAgreed] = React.useState(false);

  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [isSigningUp, setIsSigningUp] = React.useState(false);
  const [isResettingPassword, setIsResettingPassword] = React.useState(false);
  const [showResetForm, setShowResetForm] = React.useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      toast({ title: "Success", description: "Signed in successfully. Redirecting..." });
      router.push('/dashboard?view=mobile');
    } catch (error: any) {
        let description = "An unexpected error occurred. Please try again.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            description = "The email or password you entered is incorrect. Please check your credentials and try again.";
        } else if (error.code === 'auth/invalid-email') {
            description = "The email address is not valid. Please enter a valid email.";
        }
      toast({
        variant: "destructive",
        title: "Sign-in Failed",
        description: description,
      });
    } finally {
        setIsSigningIn(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if(isSigningUp) return;
    if (!signUpRole) {
        toast({
            variant: "destructive",
            title: "Role Required",
            description: "Please select a role to continue.",
        });
        return;
    }
    if (!signUpAgreed) {
        toast({
            variant: "destructive",
            title: "Agreement Required",
            description: "You must agree to the User Agreement to create an account.",
        });
        return;
    }
    setIsSigningUp(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      const user = userCredential.user;

      await sendEmailVerification(user);
      await updateProfile(user, { displayName: signUpName });

      // Create a clean user document without any undefined fields.
      const newUserDoc = {
        id: user.uid,
        name: signUpName,
        email: signUpEmail,
        role: signUpRole,
        avatarUrl: '',
        profile: {}, // Start with a completely empty profile
      };

      await setDoc(doc(db, "users", user.uid), newUserDoc);

      toast({
        title: "Account Created",
        description: "Please check your inbox to verify your email address, then proceed to onboarding."
      });
      router.push('/onboarding');
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
          errorMessage = "This email address is already in use. Please sign in or use a different email.";
      } else if (error.code === 'auth/weak-password') {
          errorMessage = "The password is too weak. Please choose a stronger password (at least 6 characters).";
      }
      toast({
        variant: "destructive",
        title: "Sign-up Failed",
        description: errorMessage,
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isResettingPassword || !resetEmail) return;
    setIsResettingPassword(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
          title: "Password Reset Email Sent",
          description: "If an account exists for this email, you will receive a link to reset your password shortly.",
      });
      setShowResetForm(false);
      setResetEmail('');
    } catch (error: any) {
        console.error("Password reset error:", error);
        toast({
            variant: 'destructive',
            title: "Error Sending Reset Email",
            description: "Something went wrong. Please ensure the email is correct and try again.",
        });
    } finally {
        setIsResettingPassword(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <div className="text-center">
            <Logo />
            <p className="text-muted-foreground mt-2">Where ideas connect.</p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Early Access Preview</AlertTitle>
          <AlertDescription>
            Okidex is currently under active development. Follow our progress and get updates by subscribing to our newsletter.
            <Button asChild variant="link" className="p-0 h-auto ml-1">
                <Link href="https://okidex.beehiiv.com/subscribe" target="_blank">
                    Subscribe here.
                </Link>
            </Button>
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <Card>
              <form onSubmit={handleSignIn}>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Welcome back! Please sign in to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input id="email-signin" type="email" placeholder="m@example.com" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password-signin">Password</Label>
                        <button
                            type="button"
                            onClick={() => setShowResetForm(!showResetForm)}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Forgot your password?
                        </button>
                    </div>
                    <Input id="password-signin" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required/>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSigningIn}>
                    {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </CardContent>
              </form>
               {showResetForm && (
                    <form onSubmit={handlePasswordReset}>
                        <CardFooter className="flex-col items-start gap-4 border-t pt-6">
                             <div className="space-y-2 w-full">
                                <Label htmlFor="reset-email">Email for Password Reset</Label>
                                <Input
                                    id="reset-email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    required
                                />
                             </div>
                             <Button type="submit" variant="secondary" className="w-full" disabled={isResettingPassword}>
                                {isResettingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Reset Link
                             </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
          </TabsContent>
          <TabsContent value="sign-up">
            <Card>
              <form onSubmit={handleSignUp}>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Join Okidex to connect with the best in the industry.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                    <Label htmlFor="name-signup">Name</Label>
                    <Input id="name-signup" type="text" placeholder="Your Name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" placeholder="m@example.com" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" type="password" minLength={6} placeholder="6+ characters" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
                  </div>
                  <div className="space-y-3">
                    <Label>I am a...</Label>
                    <RadioGroup
                      onValueChange={(value) => setSignUpRole(value as UserRole)}
                      defaultValue={signUpRole}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Founder" id="role-founder" />
                        <Label htmlFor="role-founder" className="font-normal">Founder</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Talent" id="role-talent" />
                        <Label htmlFor="role-talent" className="font-normal">Talent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Investor" id="role-investor" />
                        <Label htmlFor="role-investor" className="font-normal">Investor</Label>
                      </div>
                    </RadioGroup>
                  </div>
                   <div className="items-top flex space-x-2 pt-2">
                        <Checkbox id="terms" checked={signUpAgreed} onCheckedChange={(checked) => setSignUpAgreed(checked as boolean)} />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="terms" className="text-sm font-normal">
                            I agree to the{' '}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" className="p-0 h-auto text-sm" type="button">User Agreement</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Okidex User Agreement</DialogTitle>
                                        <DialogDescription>
                                            Summary of key terms that apply to your use of our services.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ScrollArea className="h-96 pr-6">
                                    <div className="prose prose-sm dark:prose-invert text-sm text-muted-foreground space-y-4">
                                        <p>Below is a summary of the key terms of the “Contract” that applies to your conduct during your use of our Services. When you use our Services you agree to our “User Agreement.” Your use of our Services is also subject to our Terms of Service as well as our Privacy Policy and Cookie Policy (which together cover how we collect, use, share, and store your personal data).</p>
                                        <h4 className="font-semibold text-foreground">Here are some key obligations that you agree to in the Contract:</h4>
                                        <ul className="list-disc pl-5 space-y-2">
                                        <li>You’re eligible to enter into the Contract and you are at least our “Minimum Age.”</li>
                                        <li>You will keep your password a secret.</li>
                                        <li>You will not share an account with anyone else.</li>
                                        <li>You will follow our “Dos and Don’ts” and our Investment Community Policies. Our Investment Community Policies have three main elements:
                                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                                <li><strong>Be Safe:</strong> do not distribute harassing content; do not threaten, incite, or promote violence; do not share material depicting the exploitation of children; do not promote, sell or attempt to purchase illegal or dangerous goods or services; do not share content promoting dangerous organizations or individuals.</li>
                                                <li><strong>Be Trustworthy:</strong> do not share false or misleading content; do not create a fake profile or falsify information about yourself; do not scam, defraud, deceive others.</li>
                                                <li><strong>Be Professional:</strong> do not be hateful, do not engage in sexual innuendos or unwanted advances; do not share harmful or shocking material; do not spam members or the platform.</li>
                                            </ul>
                                        </li>
                                        <li>You will comply with the law.</li>
                                        <li>You will keep your contact information up to date.</li>
                                        <li>You will only provide information and content that you have the right to share.</li>
                                        <li>Your Okidex profile will be truthful.</li>
                                        <li>For Founders, business and financial information that you provide Okidex and the Investors on it will be accurate and truthful.</li>
                                        <li>For Investors, Founders and business profiles on Okidex Carousel, does not constitute our organization endorsing their business practices or advocating that you should invest in them. Always do your own due diligence and research, Okidex should be one of the data points in your decision making process.</li>
                                        <li>Financial information from businesses remain sensitive and Okidex request Investors not to share any information transmitted or distributed in any way without the Founders’ consent.</li>
                                        <li>You’re okay with us providing notices and messages to you through our websites, apps, and contact information you provided to us.</li>
                                        <li>If you get a paid service from us, You’ll honor your payment obligations and you are okay with us storing your payment information.</li>
                                        <li>You understand that there may be fees and taxes that are added to our prices and that refunds are subject to our refund policy.</li>
                                        <li>You agree that we have limited liability under the contract and have disclaimed warranties regarding our Services.</li>
                                        <li>You agree that we can use data and information about you to make relevant suggestions to you and others.</li>
                                        </ul>
                                        <h4 className="font-semibold text-foreground">Here are some things that you acknowledge about our Services:</h4>
                                        <ul className="list-disc pl-5 space-y-2">
                                        <li>When you share information on our Services, you understand that others can see, copy and use that information.</li>
                                        <li>While we offer many choices about how your personal data is used in connection with the Service, you agree that we can use your personal data subject to this Contract, our Privacy Policy and notices and consents we provide in the context of the Service.</li>
                                        <li>You grant us a non-exclusive right to use the information and content you share on our Services.</li>
                                        <li>Your use of others’ content and information distributed on our Services is at your own risk. Okidex is not responsible for those third-party products and services offered through our platform.</li>
                                        <li>We have the right to limit how you connect and interact on our Services.</li>
                                        <li>We may change or end any part of the Service.</li>
                                        <li>We may make changes to the Contract (and our prices) which will have a prospective effect from the date of change.</li>
                                        <li>If we have a legal dispute, you agree to use the courts and law identified in the Contract.</li>
                                        </ul>
                                        <h4 className="font-semibold text-foreground">Here are some key obligations that Okidex agrees to in the Contract:</h4>
                                        <ul className="list-disc pl-5 space-y-2">
                                        <li>Distributing original content or providing feedback and personal data through our Service does not change ownership in this content and information and so you would continue to own what is yours.</li>
                                        <li>We will honor the terms of the non-exclusive license that you grant to us for your original content and feedback.</li>
                                        <li>We’ll honor the choices that you make about who gets to see your content, including how and if it can be used for ads.</li>
                                        <li>We’ll honor the terms of our Privacy Policy and the choices that you make about your personal data through our settings.</li>
                                        <li>We agree to provide you notice and an explanation if we believe your content violates our Contract and will provide you an opportunity to get a further review.</li>
                                        <li>If we have a legal dispute, we agree to use the courts and law identified in the Contract.</li>
                                        </ul>
                                    </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                            .
                            </Label>
                        </div>
                    </div>
                  <Button type="submit" className="w-full" disabled={isSigningUp}>
                    {isSigningUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </CardContent>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

