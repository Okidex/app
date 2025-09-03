
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User as UserData } from '@/lib/types';
import { updateProfile } from 'firebase/auth';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import FounderForm from '@/components/forms/founder-form';
import TalentForm from '@/components/forms/talent-form';
import InvestorForm from '@/components/forms/investor-form';
import Logo from '@/components/logo';
import { removeUndefinedFields } from '@/lib/utils';

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
        
        const profileData = { ...data };

        const newAvatarUrl = profileData.avatarUrl;
        const newBusinessLogoUrl = profileData.businessLogoUrl;
        delete profileData.avatarUrl;
        delete profileData.businessLogoUrl;
        
        if (typeof profileData.industry === 'string') {
            profileData.interests = profileData.industry.split(',').map((i: string) => i.trim());
            delete profileData.industry;
        }
         if (typeof profileData.interests === 'string') {
             profileData.interests = profileData.interests.split(',').map((i: string) => i.trim());
        }
        if (typeof profileData.skills === 'string') {
            profileData.skills = profileData.skills.split(',').map((i: string) => i.trim());
        }
        if (typeof profileData.pastInvestments === 'string' && profileData.pastInvestments) {
            profileData.pastInvestments = profileData.pastInvestments.split(',').map((i: string) => i.trim()).filter(Boolean);
        } else if (!profileData.pastInvestments) {
            profileData.pastInvestments = [];
        }
        
        const finalUserData: Partial<UserData> = {
          name: userData.name,
          email: userData.email,
          role: userData.role,
          id: user.uid,
          profile: profileData,
          avatarUrl: newAvatarUrl || userData.avatarUrl || '',
          businessLogoUrl: newBusinessLogoUrl || userData.businessLogoUrl || '',
        };

        const cleanData = removeUndefinedFields(finalUserData);
        await setDoc(userDocRef, cleanData, { merge: true });

        if (newAvatarUrl && user.photoURL !== newAvatarUrl) {
            await updateProfile(user, { photoURL: newAvatarUrl });
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
