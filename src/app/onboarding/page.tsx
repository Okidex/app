
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User as UserData, FounderProfile, InvestorProfile, TalentProfile } from '@/lib/types';
import { updateProfile as updateAuthProfile } from 'firebase/auth';
import * as z from 'zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import FounderForm from '@/components/forms/founder-form';
import TalentForm from '@/components/forms/talent-form';
import InvestorForm from '@/components/forms/investor-form';
import Logo from '@/components/logo';

// --- Zod Schemas ---
const founderEntrySchema = z.object({
  founderName: z.string().min(1, 'Founder name is required.'),
  founderTitle: z.string().min(1, 'Founder title is required.'),
});

const capTableEntrySchema = z.object({
    investorName: z.string().min(1, "Investor name is required."),
    holdingPercentage: z.coerce.number().min(0).max(100),
    shareCount: z.coerce.number().min(0),
});

const founderSchema = z.object({
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  businessLogoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  businessName: z.string().min(1, 'Startup name is required.'),
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  bio: z.string().optional(),
  businessDescription: z.string().min(50, 'Business description must be at least 50 characters.'),
  isIncorporated: z.boolean().default(false),
  taxNumber: z.string().optional(),
  uniqueEntityNumber: z.string().optional(),
  entityStructure: z.string().optional(),
  countryOfIncorporation: z.string().optional(),
  fundingStage: z.enum(['pre-seed', 'seed', 'series-a', 'series-b']),
  industry: z.string().min(1, 'Please enter at least one industry.'),
  founders: z.array(founderEntrySchema).optional(),
  grossMargins: z.coerce.number().optional(),
  burnRate: z.coerce.number().optional(),
  customerAcquisitionCost: z.coerce.number().optional(),
  customerLifetimeValue: z.coerce.number().optional(),
  mrr: z.coerce.number().optional(),
  netProfitMargins: z.coerce.number().optional(),
  cashBurnRunway: z.coerce.number().optional(),
  roi: z.coerce.number().optional(),
  cacPayback: z.coerce.number().optional(),
  valuation: z.coerce.number().optional(),
  capTable: z.array(capTableEntrySchema).optional(),
}).refine(data => {
    if (data.isIncorporated) {
        return !!data.taxNumber && !!data.uniqueEntityNumber && !!data.entityStructure && !!data.countryOfIncorporation;
    }
    return true;
}, {
    message: 'All incorporation details are required if the business is incorporated.',
    path: ['countryOfIncorporation'],
});

const investorSchema = z.object({
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  headline: z.string().min(10, 'Headline must be at least 10 characters.'),
  summary: z.string().min(50, 'Summary must be at least 50 characters.'),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  companyUrl: z.string().url().optional().or(z.literal('')),
  investmentThesis: z.string().min(50, 'Investment thesis must be at least 50 characters.'),
  interests: z.string().min(1, 'Please enter at least one industry.'),
  pastInvestments: z.string().optional(),
});

const talentSchema = z.object({
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  headline: z.string().min(10, 'Headline must be at least 10 characters.'),
  summary: z.string().min(50, 'Summary must be at least 50 characters.'),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  skills: z.string().min(1, 'Please enter at least one skill.'),
  interests: z.string().min(1, 'Please enter at least one industry.'),
  openToCoFounding: z.boolean().default(false),
});
// --- End of Zod Schemas ---

function sanitizeForFirestore<T extends object>(data: T): T {
    const sanitizedData = { ...data };
    for (const key in sanitizedData) {
        if (sanitizedData[key] === undefined) {
            (sanitizedData as any)[key] = null;
        } else if (typeof sanitizedData[key] === 'object' && sanitizedData[key] !== null) {
            // Recursively sanitize nested objects
            (sanitizedData as any)[key] = sanitizeForFirestore(sanitizedData[key] as object);
        }
    }
    return sanitizedData;
}


export default function OnboardingPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { toast } = useToast();

  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);
  
  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/');
      return;
    }
  
    const fetchUserData = async () => {
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data() as UserData;
                    setUserData(data);
                    const isProfileEmpty = !data.profile || Object.keys(data.profile).length === 0;
                    setIsNewUser(isProfileEmpty);
                } else {
                    // This case is unlikely if sign-up works, but good to have
                    const dataFromAuth: UserData = {
                        id: user.uid,
                        name: user.displayName || '',
                        email: user.email || '',
                        role: 'Talent', // Default role
                        avatarUrl: user.photoURL || '',
                        profile: {}
                    };
                    setUserData(dataFromAuth);
                    setIsNewUser(true);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Could not load your profile.' });
            }
        }
    };

    fetchUserData();

  }, [user, loading, router, toast]);

  const handleFormSubmit = async (data: any) => {
    if (!user || !userData) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
        return;
    }
    
    setIsSaving(true);
    try {
        const userDocRef = doc(db, 'users', user.uid);
        
        let profilePayload: Partial<FounderProfile | InvestorProfile | TalentProfile> = {};
        const updateData: Partial<UserData> = {
            avatarUrl: data.avatarUrl || userData.avatarUrl || null,
            name: userData.name || data.name,
        };

        switch (userData.role) {
            case 'Founder':
                updateData.businessLogoUrl = data.businessLogoUrl || null;
                profilePayload = {
                    headline: data.bio?.substring(0, 100) || `Founder of ${data.businessName}`,
                    summary: data.businessDescription,
                    interests: data.industry?.split(',').map((i: string) => i.trim()).filter(Boolean) || [],
                    bio: data.bio,
                    businessName: data.businessName,
                    websiteUrl: data.websiteUrl,
                    businessDescription: data.businessDescription,
                    fundingStage: data.fundingStage,
                    founders: data.founders,
                    isIncorporated: data.isIncorporated,
                    taxNumber: data.taxNumber,
                    uniqueEntityNumber: data.uniqueEntityNumber,
                    entityStructure: data.entityStructure,
                    countryOfIncorporation: data.countryOfIncorporation,
                    grossMargins: data.grossMargins,
                    burnRate: data.burnRate,
                    customerAcquisitionCost: data.customerAcquisitionCost,
                    customerLifetimeValue: data.customerLifetimeValue,
                    mrr: data.mrr,
                    netProfitMargins: data.netProfitMargins,
                    cashBurnRunway: data.cashBurnRunway,
                    roi: data.roi,
                    cacPayback: data.cacPayback,
                    valuation: data.valuation,
                    capTable: data.capTable,
                    linkedinUrl: data.linkedinUrl,
                };
                break;
            case 'Investor':
                profilePayload = {
                    headline: data.headline,
                    summary: data.summary,
                    interests: data.interests?.split(',').map((i: string) => i.trim()).filter(Boolean) || [],
                    linkedinUrl: data.linkedinUrl,
                    companyUrl: data.companyUrl,
                    investmentThesis: data.investmentThesis,
                    pastInvestments: data.pastInvestments?.split(',').map((i: string) => i.trim()).filter(Boolean) || [],
                };
                break;
            case 'Talent':
                 profilePayload = {
                    headline: data.headline,
                    summary: data.summary,
                    interests: data.interests?.split(',').map((i: string) => i.trim()).filter(Boolean) || [],
                    linkedinUrl: data.linkedinUrl,
                    skills: data.skills?.split(',').map((i: string) => i.trim()).filter(Boolean) || [],
                    openToCoFounding: data.openToCoFounding,
                };
                break;
        }

        updateData.profile = profilePayload;
        
        const sanitizedData = sanitizeForFirestore(updateData);
        
        await setDoc(userDocRef, sanitizedData, { merge: true });

        // Update Firebase Auth profile if needed
        if ((sanitizedData.avatarUrl && user.photoURL !== sanitizedData.avatarUrl) || (sanitizedData.name && user.displayName !== sanitizedData.name)) {
            await updateAuthProfile(user, { photoURL: sanitizedData.avatarUrl, displayName: sanitizedData.name });
        }

        toast({ title: 'Profile Updated', description: 'Your changes have been saved.' });
        router.push('/dashboard?view=profile');
    } catch (error: any) {
        console.error("Failed to save profile:", error);
        toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    } finally {
        setIsSaving(false);
    }
  };
  
  const getTitle = () => {
    if (isNewUser) {
       return userData?.role === 'Founder' ? 'Tell us about your startup.' : 'Tell us more about yourself'
    }
    return 'Edit Your Profile';
  }

  const getDescription = () => {
      if (isNewUser) {
          return userData?.role === 'Founder' ? "Complete your startup's profile to start connecting." : `Complete your ${userData?.role} profile to start connecting.`
      }
      return 'Update your profile details below. Your changes will be saved upon submission.';
  }

  const renderFormForRole = () => {
    if (!userData) return null;
    
    switch (userData.role) {
      case 'Founder':
        return <FounderForm onSubmit={handleFormSubmit} isSaving={isSaving} currentUserData={userData} schema={founderSchema} />;
      case 'Talent':
        return <TalentForm onSubmit={handleFormSubmit} isSaving={isSaving} currentUserData={userData} schema={talentSchema} />;
      case 'Investor':
        return <InvestorForm onSubmit={handleFormSubmit} isSaving={isSaving} currentUserData={userData} schema={investorSchema} />;
      default:
        return <p className="text-center text-red-500">Invalid user role. Please contact support.</p>;
    }
  };
  
  if (loading || !userData) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin" />
        </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="text-center">
            <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{getTitle()}</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderFormForRole()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
