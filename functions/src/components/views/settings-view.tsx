
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  updateEmail,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '../ui/scroll-area';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Separator } from '../ui/separator';

const emailSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export default function SettingsView() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { toast } = useToast();

  const [isEmailUpdating, setIsEmailUpdating] = React.useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: user?.email || '' },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  React.useEffect(() => {
    if (user?.email) {
      emailForm.reset({ email: user.email });
    }
  }, [user, emailForm]);

  const handleUpdateEmail = async (data: z.infer<typeof emailSchema>) => {
    if (!user) return;
    setIsEmailUpdating(true);
    try {
      await updateEmail(user, data.email);
      toast({ title: 'Success', description: 'Your email has been updated. Please check your inbox to verify your new address.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: `Email update failed: ${error.message}. You may need to sign in again.` });
    } finally {
      setIsEmailUpdating(false);
    }
  };

  const handleUpdatePassword = async (data: z.infer<typeof passwordSchema>) => {
    if (!user || !user.email) return;

    setIsPasswordUpdating(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      toast({ title: 'Success', description: 'Your password has been updated.' });
      passwordForm.reset();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: `Password change failed: ${error.message}` });
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
      
      toast({ title: 'Account Deleted', description: 'Your account has been permanently deleted.' });
      router.push('/');
    } catch (error: any) {
       toast({ variant: 'destructive', title: 'Error', description: `Failed to delete account: ${error.message}. You may need to sign in again.` });
    } finally {
        setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
          <CardDescription>Change the email address associated with your account.</CardDescription>
        </CardHeader>
        <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleUpdateEmail)}>
                <CardContent>
                    <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isEmailUpdating}>
                    {isEmailUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                    </Button>
                </CardFooter>
            </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Choose a new, strong password.</CardDescription>
        </CardHeader>
        <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)}>
            <CardContent className="space-y-4">
                <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={isPasswordUpdating}>
                {isPasswordUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
                </Button>
            </CardFooter>
            </form>
        </Form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contact &amp; Support</CardTitle>
          <CardDescription>
            Have questions or feedback? We'd love to hear from you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-4">
              <Button asChild>
                  <a href="mailto:wilfred@okidex.com">
                      <Mail className="mr-2 h-4 w-4"/>
                      Contact Support
                  </a>
              </Button>
              
              <Separator className="my-2" />

              <Dialog>
                  <DialogTrigger asChild>
                      <Button variant="link" className="p-0 h-auto">User Agreement</Button>
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
              <Dialog>
                  <DialogTrigger asChild>
                      <Button variant="link" className="p-0 h-auto">Privacy &amp; Cookies Policy</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                      <DialogHeader>
                          <DialogTitle>Okidex Privacy Policy</DialogTitle>
                          <DialogDescription>Effective Date: August 29, 2025</DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-96 pr-6">
                          <div className="prose prose-sm dark:prose-invert text-sm text-muted-foreground space-y-4">
                              <p>At Okidex, we are committed to connecting founders with private investors and talent in a secure, transparent, and respectful manner. This Privacy Policy ("Policy") describes how Okidex, Inc. ("Okidex," "we," "us," or "our") collects, uses, shares, and protects your personal information when you use our mobile application, website (okidex.com), and related services (collectively, the "Services"). We respect your privacy and are dedicated to protecting your data in accordance with applicable laws, including Singapore’s Personal Data Protection Act 2012 (PDPA), as amended by the Personal Data Protection (Amendment) Act 2020, the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other relevant privacy regulations. In Singapore, we comply with the guidelines issued by the Personal Data Protection Commission (PDPC).</p>
                              <p>By using our Services, you consent to the practices described in this Policy. If you do not agree, please do not access or use the Services. We may update this Policy from time to time, and we will notify you of material changes via email, in-app notification, or by posting the updated Policy on our website with the new effective date. Your continued use of the Services after such changes constitutes your acceptance of the revised Policy.</p>
                              <h4 className="font-semibold text-foreground">1. Information We Collect</h4>
                              <p>We collect information to provide, improve, and personalize our Services, facilitate matchmaking between founders, investors, and talent, and ensure a safe environment. Under the PDPA, personal data is defined as data about an individual who can be identified from that data or in combination with other information we have or are likely to have access to. We act as the data controller for your personal data under applicable laws like the PDPA and GDPR.</p>
                              <strong>Information You Provide to Us</strong>
                              <ul className="list-disc pl-5 space-y-2">
                              <li><strong>Registration and Profile Data:</strong> When you create an account, we collect your name, email address, phone number, professional title, location, and other details you provide, such as your role (e.g., founder, investor, or talent). For verification purposes, we may collect government-issued ID, selfies, or other identity documents through third-party providers to confirm your identity and prevent fraud. You are responsible for the accuracy and appropriateness of the data you choose to share or publish on your profile, including any personal or sensitive information you make publicly visible. Under the PDPA, we ensure you are notified of the purposes for collecting this data and obtain your consent where required.</li>
                              <li><strong>Professional and Business Information:</strong> Founders may upload business plans, pitch decks, financial projections, resumes, or other business-related documents. Investors and talent may provide investment criteria, professional experience, skills, endorsements, or financial preferences. You can choose to include sensitive information, but we advise against posting unnecessary personal details publicly. You are responsible for any data, including business plans or financial details, that you choose to share or publish on your profile or with other users. We obtain explicit consent for processing sensitive personal data, such as financial details, as required by the PDPA.</li>
                              <li><strong>Financial Information:</strong> If you link payment methods for premium features or transactions (e.g., subscription fees), we collect payment details such as credit/debit card numbers, bank account information, billing address, and transaction history. For matchmaking involving investments, we may collect or infer financial data with your explicit consent, such as investment history or funding requirements, in compliance with the PDPA’s Consent Obligation.</li>
                              <li><strong>Communications and Content:</strong> Messages, connection requests, feedback, and any content you post or share through the Services, including in matches, chats, or forums. You are responsible for the content you share or publish in these interactions.</li>
                              <li><strong>Linked Accounts:</strong> If you connect third-party accounts (e.g., LinkedIn, Google, or financial apps), we collect data like profile information, contacts, or professional networks, subject to your authorization and PDPA’s Notification Obligation.</li>
                              </ul>
                              <strong>Information We Collect Automatically</strong>
                              <ul className="list-disc pl-5 space-y-2">
                              <li><strong>Usage Data:</strong> Device information (e.g., IP address, browser type, operating system), log data (e.g., pages viewed, time spent), and interaction data (e.g., matches made, searches performed).</li>
                              <li><strong>Location Data:</strong> Approximate or precise location (via GPS, IP, or device settings) to facilitate local matchmaking, with options to control this in your device settings. Under the PDPA, we notify you of location data collection purposes and obtain consent where required.</li>
                              <li><strong>Cookies and Similar Technologies:</strong> We use cookies, pixels, web beacons, and other tracking technologies to recognize you across devices, analyze usage, and personalize content. For details, see our Cookie Policy below, which complies with the PDPA’s transparency requirements.</li>
                              </ul>
                              <strong>Information from Others</strong>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li>Data from matches or connections (e.g., endorsements, referrals, or shared business plans).</li>
                                  <li>Aggregated or anonymized data from partners for analytics, ensuring compliance with the PDPA’s Protection Obligation.</li>
                              </ul>
                              <p>We do not collect information from children under 18, and our Services are not intended for them (see Section 8). The PDPA does not apply to business contact information (e.g., name, business title, business email) or data of deceased individuals (for over 10 years), and we align our practices accordingly.</p>

                              <h4 className="font-semibold text-foreground">2. How We Use Your Information</h4>
                              <p>We use your information to operate and enhance our Services, based on legal grounds such as your consent, contractual necessity, legitimate interests (e.g., fraud prevention), or legal obligations, as permitted under the PDPA, GDPR, and other laws.</p>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li><strong>Providing and Personalizing Services:</strong> To create profiles, suggest matches (e.g., connecting founders with compatible investors or talent based on profiles, location, and algorithms), facilitate communications, and enable features like virtual meetings or document sharing, in line with the PDPA’s Purpose Limitation Obligation.</li>
                                  <li><strong>Matchmaking and Networking:</strong> Analyze professional data, business plans, and financial preferences to predict compatibility and recommend opportunities, with your explicit consent for sharing sensitive details like financial information or business plans during matches, as required by the PDPA’s Consent Obligation.</li>
                                  <li><strong>Safety and Security:</strong> Verify identities, monitor for violations of our terms, detect fraud (e.g., using transaction patterns or automated systems), and prevent unauthorized access, fulfilling the PDPA’s Protection Obligation.</li>
                                  <li><strong>Payments and Financial Services:</strong> Process transactions, manage subscriptions, and, with explicit consent, facilitate investment-related disclosures (e.g., sharing funding needs with investors).</li>
                                  <li><strong>Communications:</strong> Send service updates, security alerts, and promotional messages (e.g., about new features or events), with opt-out options for marketing in compliance with the PDPA’s Do Not Call (DNC) Registry provisions.</li>
                                  <li><strong>Analytics and Improvement:</strong> Conduct research, develop insights (e.g., workforce trends in startups), and improve algorithms, using aggregated data where possible, as permitted under the PDPA’s Accountability Obligation.</li>
                                  <li><strong>Advertising and Marketing:</strong> Target ads based on your interests and usage, without sharing personal data with advertisers except in hashed form or with consent, ensuring compliance with the PDPA’s Notification Obligation.</li>
                                  <li><strong>Compliance and Legal Purposes:</strong> Fulfill legal requirements, such as anti-money laundering (AML) checks, tax reporting, or responding to authorities, as required by the PDPA and other laws.</li>
                              </ul>
                              <p>For sensitive data like financial information or business plans, we require your explicit consent before processing or sharing, which you can withdraw at any time via account settings, as supported by the PDPA’s consent withdrawal provisions.</p>
                              
                              <h4 className="font-semibold text-foreground">3. Sharing Your Information</h4>
                              <p>We share your information only as necessary and with safeguards in place, such as contracts requiring data protection, in compliance with the PDPA’s Transfer Limitation Obligation.</p>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li><strong>With Other Users:</strong> In matches, we share profile details, business plans, or financial information you consent to disclose (e.g., a founder sharing a pitch deck with an investor). You control visibility through privacy settings. You are responsible for the data you choose to share with other users, including in profiles, messages, or matchmaking interactions. We ensure compliance with the PDPA’s Consent and Notification Obligations before sharing.</li>
                                  <li><strong>Service Providers:</strong> With third-party vendors (data intermediaries under the PDPA) for functions like payment processing (e.g., Stripe), identity verification, cloud storage, analytics, or customer support. These providers are bound by strict confidentiality and data protection agreements, meeting the PDPA’s requirements for data intermediaries.</li>
                                  <li><strong>Affiliates and Partners:</strong> Within our corporate group or with financial partners for fraud prevention or service enhancement, ensuring equivalent privacy protections as required by the PDPA.</li>
                                  <li><strong>For Legal Reasons:</strong> To comply with laws, prevent harm, enforce terms, or in response to subpoenas, with discretion to disclose if we believe it’s necessary, as permitted under the PDPA.</li>
                                  <li><strong>Business Transfers:</strong> In mergers, acquisitions, or asset sales, your data may be transferred, with notice provided, in line with PDPA guidelines.</li>
                                  <li><strong>Aggregated Data:</strong> Non-identifiable insights shared for research or marketing, ensuring no personal data is disclosed.</li>
                              </ul>
                              <p>We do not sell your personal data. For financial information, sharing requires your explicit consent, and we use mechanisms like standard contractual clauses for international transfers to ensure a comparable level of protection as required by the PDPA’s Transfer Limitation Obligation.</p>

                              <h4 className="font-semibold text-foreground">4. Cookie Policy</h4>
                              <p>We use cookies and similar technologies (e.g., web beacons, pixels, and device identifiers) to enhance your experience, analyze usage, and deliver personalized content. This Cookie Policy, aligned with PDPA guidelines, explains how we use these technologies and your choices.</p>
                              <strong>Types of Cookies We Use</strong>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li><strong>Essential Cookies:</strong> Necessary for the Services to function, such as maintaining your login session, securing your account, and enabling core features like matchmaking. These cannot be disabled, as they are critical to service delivery.</li>
                                  <li><strong>Performance Cookies:</strong> Collect anonymized data on how you use our Services (e.g., pages visited, time spent) to improve performance and user experience. Examples include Google Analytics cookies.</li>
                                  <li><strong>Functionality Cookies:</strong> Enable enhanced features, like remembering your preferences (e.g., language or location settings) or customizing your interface.</li>
                                  <li><strong>Advertising Cookies:</strong> Used to deliver relevant ads and track ad performance. We may share hashed, non-identifiable data with ad partners to personalize ads across devices, with your consent.</li>
                                  <li><strong>Social Media Cookies:</strong> Allow integration with platforms like LinkedIn for account linking or sharing, subject to your consent and the third party’s privacy policy.</li>
                              </ul>
                              <strong>How We Use Cookies</strong>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li><strong>Authentication:</strong> Recognize you when you log in and ensure secure access.</li>
                                  <li><strong>Personalization:</strong> Tailor match suggestions and content based on your interactions and profile.</li>
                                  <li><strong>Analytics:</strong> Measure traffic, identify popular features, and optimize Services.</li>
                                  <li><strong>Advertising:</strong> Show targeted ads on and off our Services, ensuring relevance without sharing personal data directly with advertisers.</li>
                              </ul>
                              <strong>Managing Cookies</strong>
                              <p>Under the PDPA, we notify you of cookie usage purposes and obtain consent for non-essential cookies. You can control cookies through:</p>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li><strong>Cookie Consent Banner:</strong> On your first visit, choose which non-essential cookies to allow. Update preferences anytime via the "Manage Cookies" link at okidex.com/cookies.</li>
                                  <li><strong>Browser Settings:</strong> Block or delete cookies, though this may affect functionality (e.g., logging you out). Instructions are available for browsers like Chrome, Firefox, or Safari.</li>
                                  <li><strong>Device Settings:</strong> Adjust tracking settings (e.g., “Limit Ad Tracking” on iOS or “Opt Out of Ads Personalization” on Android).</li>
                                  <li><strong>Third-Party Opt-Outs:</strong> Visit sites like youronlinechoices.eu (EU) or optout.networkadvertising.org (US) for ad network opt-outs.</li>
                              </ul>
                              <strong>Third-Party Cookies</strong>
                              <p>Some cookies are set by partners (e.g., analytics or ad providers). These are governed by their privacy policies, and we ensure they meet PDPA standards. For example, Google Analytics uses anonymized data, and we do not share identifiable information with ad partners without consent.</p>
                              <p>We retain cookie data for up to 13 months, unless required for legal purposes or deleted earlier at your request, in line with the PDPA’s Retention Limitation Obligation. For more details, contact us at wilfred@okidex.com.</p>
                              
                              <h4 className="font-semibold text-foreground">5. Data Security and Retention</h4>
                              <p>We implement reasonable security measures, including encryption, firewalls, and access controls, to protect against unauthorized access, loss, or misuse, fulfilling the PDPA’s Protection Obligation. However, no system is completely secure, so we cannot guarantee absolute security.</p>
                              <p>We retain data as needed for the purposes described, in compliance with the PDPA’s Retention Limitation Obligation:</p>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li>Profile data: Until account deletion, plus up to 28 days for restoration.</li>
                                  <li>Financial and transaction data: For audit, tax, or legal purposes (e.g., 7 years).</li>
                                  <li>Verification data: Up to 3 years for fraud prevention.</li>
                                  <li>Cookie data: Up to 13 months, as noted above.</li>
                              </ul>
                              <p>Upon account deletion, we anonymize or delete data, though shared content may remain visible to others. You can request deletion via settings, as supported by the PDPA’s Access and Correction Obligation.</p>
                              <p>In the event of a data breach likely to result in significant harm or affecting a significant number of individuals, we will notify the PDPC and affected individuals within 3 calendar days of assessment, as required by the PDPA’s Data Breach Notification Obligation.</p>

                              <h4 className="font-semibold text-foreground">6. Your Rights and Choices</h4>
                              <p>We empower you to control your data, in line with the PDPA, GDPR, and CCPA:</p>
                              <ul className="list-disc pl-5 space-y-2">
                                  <li><strong>Access and Correction:</strong> View, edit, or export your information via account settings. Under the PDPA, you can request access to your personal data and information about its use or disclosure within the past year, and request corrections to errors or omissions.</li>
                                  <li><strong>Deletion:</strong> Request data deletion, subject to legal retention requirements, as supported by the PDPA.</li>
                                  <li><strong>Opt-Outs:</strong> Withdraw consent for marketing, location sharing, cookies, or data processing (e.g., for matching algorithms) at any time, with notification of consequences as required by the PDPA.</li>
                                  <li><strong>Do Not Sell/Share:</strong> Under CCPA, opt out of data sales (though we do not sell data).</li>
                                  <li><strong>GDPR and PDPA Rights:</strong> If in the EU/EEA/UK or Singapore, exercise rights to access, rectify, erase, restrict, or object to processing, or data portability. For Singapore residents, contact the PDPC for complaints about data misuse.</li>
                                  <li><strong>Cookie Controls:</strong> Manage via the Cookie Consent Banner, browser settings, or our Cookie Policy page.</li>
                                  <li><strong>Financial Consent:</strong> Specifically revoke consent for sharing financial info or business plans.</li>
                                  <li><strong>DNC Registry:</strong> Opt out of telemarketing by registering your Singapore telephone number with the PDPA’s Do Not Call Registry.</li>
                              </ul>
                              <p>To exercise rights, contact our Data Protection Officer (DPO), as required by the PDPA’s Accountability Obligation, at wilfred@okidex.com. We respond within applicable timeframes (e.g., 30 days under CCPA and PDPA). For complaints, Singapore residents can contact the PDPC at 10 Pasir Panjang Road, #03-01, Mapletree Business City, Singapore 117438.</p>
                              
                              <h4 className="font-semibold text-foreground">7. International Data Transfers</h4>
                              <p>We operate globally and may transfer data to countries outside your residence, including the US. For transfers outside Singapore, we ensure the recipient provides a comparable level of protection as required by the PDPA’s Transfer Limitation Obligation, using mechanisms like standard contractual clauses or binding corporate rules, which also align with GDPR requirements.</p>
                              
                              <h4 className="font-semibold text-foreground">8. Children's Privacy</h4>
                              <p>Our Services are for users 18 and older. We do not knowingly collect data from children under 18. If we learn of such collection, we will delete it promptly, in line with the PDPA. Parents can contact us for assistance.</p>

                              <h4 className="font-semibold text-foreground">9. Changes to This Policy</h4>
                              <p>We may update this Policy to reflect changes in our practices or laws. We will notify you of significant changes via email, in-app notification, or by posting the updated Policy, as required by the PDPA’s Accountability Obligation.</p>

                              <h4 className="font-semibold text-foreground">10. Contact Us</h4>
                              <p>For questions or concerns, contact our Data Protection Officer, as mandated by the PDPA, at:</p>
                              <p>Email: wilfred@okidex.com</p>
                              <p>For Singapore residents, you may also contact the Personal Data Protection Commission at:</p>
                              <p>Address: 10 Pasir Panjang Road, #03-01, Mapletree Business City, Singapore 117438</p>
                              <p>Website: www.pdpc.gov.sg</p>
                              <p>Thank you for trusting Okidex with your information. We are committed to your privacy as we build meaningful connections in the startup ecosystem, in full compliance with the PDPA and other applicable laws.</p>
                          </div>
                      </ScrollArea>
                  </DialogContent>
              </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action is irreversible.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isDeleting}>
                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete My Account
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDeleteAccount} 
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                        {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
