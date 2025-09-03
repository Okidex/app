
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
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function EditProfilePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { toast } = useToast();

  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  
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
                } else {
                    toast({ variant: 'destructive', title: 'Error', description: 'Could not find your profile to edit.' });
                    router.push('/dashboard?view=profile');
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
        
        // Explicitly separate special fields from the rest of the profile data
        const { avatarUrl, businessLogoUrl, ...profileData } = data;

        // Process arrays from comma-separated strings if they exist
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
        if (typeof profileData.pastInvestments === 'string') {
            profileData.pastInvestments = profileData.pastInvestments.split(',').map((i: string) => i.trim()).filter(Boolean);
        } else if (profileData.pastInvestments === undefined) {
             profileData.pastInvestments = [];
        }
        
        // Construct the final user data object for Firestore
        const finalUserData: Partial<UserData> = {
          ...userData,
          profile: {
            ...userData.profile,
            ...profileData,
          },
          avatarUrl: avatarUrl || userData.avatarUrl || '',
        };
        
        // Only include businessLogoUrl on the top-level document for Founders
        if (userData.role === 'Founder') {
            finalUserData.businessLogoUrl = businessLogoUrl || '';
        }

        await setDoc(userDocRef, finalUserData, { merge: true });

        // Update Firebase Auth profile if avatar has changed
        if (avatarUrl && user.photoURL !== avatarUrl) {
            await updateProfile(user, { photoURL: avatarUrl });
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
    <div className="flex min-h-screen flex-col bg-background p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-4">
                <Button variant="ghost" onClick={() => router.push('/dashboard?view=profile')}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Profile
                </Button>
            </div>
            <Card>
            <CardHeader>
                <CardTitle>Edit Your Profile</CardTitle>
                <CardDescription>Update your profile details below. Your changes will be saved upon submission.</CardDescription>
            </CardHeader>
            <CardContent>
                {renderFormForRole()}
            </CardContent>
            </Card>
        </div>
    </div>
  );
}
