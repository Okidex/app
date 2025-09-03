
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User as UserData, FounderProfile, InvestorProfile, TalentProfile } from '@/lib/types';
import { updateProfile } from 'firebase/auth';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import FounderForm from '@/components/forms/founder-form';
import TalentForm from '@/components/forms/talent-form';
import InvestorForm from '@/components/forms/investor-form';
import Logo from '@/components/logo';

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
        const finalDoc: Partial<UserData> = {
            avatarUrl: data.avatarUrl || userData.avatarUrl || '',
            name: userData.name || data.name,
        };

        // Explicitly construct the payload based on the user's role
        // This prevents leaking fields like `businessLogoUrl` into other roles
        switch (userData.role) {
            case 'Founder':
                finalDoc.businessLogoUrl = data.businessLogoUrl || '';
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

        finalDoc.profile = profilePayload;

        // Ensure no undefined keys are in the final document
        if (finalDoc.businessLogoUrl === undefined) {
          delete finalDoc.businessLogoUrl;
        }

        await setDoc(userDocRef, finalDoc, { merge: true });

        if ((finalDoc.avatarUrl && user.photoURL !== finalDoc.avatarUrl) || (finalDoc.name && user.displayName !== finalDoc.name)) {
            await updateProfile(user, { photoURL: finalDoc.avatarUrl, displayName: finalDoc.name });
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
        return <FounderForm onSubmit={handleFormSubmit} isSaving={isSaving} currentUserData={userData} />;
      case 'Talent':
        return <TalentForm onSubmit={handleFormSubmit} isSaving={isSaving} currentUserData={userData} />;
      case 'Investor':
        return <InvestorForm onSubmit={handleFormSubmit} isSaving={isSaving} currentUserData={userData} />;
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
