
'use client';

import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User as UserType } from '@/lib/types';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Building, Edit, Linkedin, Loader2, Link as LinkIcon, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

function FinancialsCard({ profile, role }: { profile: UserType['profile'], role: UserType['role'] }) {
    if (role !== 'Founder' || !profile) return null;

    const metrics = [
        { label: "MRR", value: profile.mrr, format: 'currency' },
        { label: "Gross Margins", value: profile.grossMargins, format: 'percent' },
        { label: "Burn Rate/Month", value: profile.burnRate, format: 'currency' },
        { label: "Cash Runway", value: profile.cashBurnRunway, format: 'months' },
        { label: "Latest Valuation", value: profile.valuation, format: 'currency' },
        { label: "CAC", value: profile.customerAcquisitionCost, format: 'currency' },
        { label: "LTV", value: profile.customerLifetimeValue, format: 'currency' },
        { label: "CAC Payback", value: profile.cacPayback, format: 'months' },
        { label: "ROI", value: profile.roi, format: 'percent' },
        { label: "Net Profit Margins", value: profile.netProfitMargins, format: 'percent' },
    ];

    const formatValue = (value: number | undefined, format: string) => {
        if (value === undefined || value === null) return <span className="text-muted-foreground/50">N/A</span>;
        switch (format) {
            case 'currency':
                return `$${value.toLocaleString()}`;
            case 'percent':
                return `${value}%`;
            case 'months':
                return `${value} months`;
            default:
                return value.toLocaleString();
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Key financial metrics and capitalization table.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Key Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {metrics.map(metric => (
                            <div key={metric.label} className="rounded-lg border p-3">
                                <p className="text-sm text-muted-foreground">{metric.label}</p>
                                <p className="text-lg font-semibold">{formatValue(metric.value, metric.format)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {profile.capTable && profile.capTable.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-2">Cap Table</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Investor</TableHead>
                                    <TableHead className="text-right">Holding %</TableHead>
                                    <TableHead className="text-right">Shares</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {profile.capTable.map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{entry.investorName}</TableCell>
                                        <TableCell className="text-right">{entry.holdingPercentage}%</TableCell>
                                        <TableCell className="text-right">{entry.shareCount.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function ProfileLoadingSkeleton() {
    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <Card>
                <CardHeader className="flex flex-col items-center p-6 md:flex-row md:items-start md:gap-6">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                        <Skeleton className="h-5 w-64 mx-auto md:mx-0" />
                        <Skeleton className="h-6 w-20 mx-auto md:mx-0" />
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                         <Skeleton className="h-10 w-10 rounded-md" />
                         <Skeleton className="h-10 w-32 rounded-md" />
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                     <div>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6 mt-2" />
                    </div>
                    <Separator />
                     <div>
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                             <div className="flex-1 space-y-1">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StartupCard({ profile, businessLogoUrl }: { profile: UserType['profile'], businessLogoUrl?: string }) {
    if (!profile || !profile.businessName) return null;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                     {businessLogoUrl && (
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={businessLogoUrl} alt={profile.businessName} />
                            <AvatarFallback><Building className="h-8 w-8" /></AvatarFallback>
                        </Avatar>
                     )}
                     <div className="flex-1 space-y-1">
                        <CardTitle className="text-3xl">{profile.businessName}</CardTitle>
                         {profile.websiteUrl && (
                            <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:underline">
                                <LinkIcon className="h-3 w-3" />
                                {profile.websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
                            </a>
                         )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Separator className="mb-6"/>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg">About {profile.businessName}</h3>
                        <p className="text-muted-foreground mt-1">{profile.businessDescription}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Industry</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {profile.interests?.map(interest => (
                                <Badge key={interest} variant="secondary">{interest}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ProfileCard({ currentUser }: { currentUser: UserType }) {
  if (!currentUser.profile) return null;

  const getInterestsLabel = () => {
    switch (currentUser.role) {
      case 'Investor':
        return 'Investment Industries';
      case 'Talent':
        return 'Industries of Interest';
      case 'Founder':
        return 'Industry';
      default:
        return 'Interests';
    }
  };
    
    return (
        <Card>
        <CardHeader className="flex flex-col items-center text-center p-6 md:flex-row md:text-left md:items-start md:gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name?.charAt(0) || <UserIcon />}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-3xl">{currentUser.name}</CardTitle>
            <CardDescription className="text-base">{currentUser.profile.headline}</CardDescription>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
                <Badge variant="secondary" className="text-sm">{currentUser.role}</Badge>
                {currentUser.profile.companyUrl && (
                    <a href={currentUser.profile.companyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:underline">
                        <LinkIcon className="h-3 w-3" />
                        {currentUser.profile.companyUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
                    </a>
                 )}
            </div>
          </div>
          {currentUser.profile.linkedinUrl && (
              <Button variant="outline" size="icon" asChild>
                  <a href={currentUser.profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                  </a>
              </Button>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            
            {currentUser.role === 'Founder' && currentUser.profile.bio && (
                <div>
                    <h3 className="font-semibold text-lg">Founder Bio</h3>
                    <p className="text-muted-foreground mt-1 whitespace-pre-line">{currentUser.profile.bio}</p>
                </div>
            )}

            {currentUser.profile.summary && (
              <>
                {(currentUser.role === 'Founder' && currentUser.profile.bio) && <Separator />}
                <div>
                  <h3 className="font-semibold text-lg">Summary</h3>
                  <p className="text-muted-foreground mt-1">{currentUser.profile.summary}</p>
                </div>
              </>
            )}
            
            {currentUser.profile.experience && currentUser.profile.experience.length > 0 && (
                <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg">Experience</h3>
                  <ul className="mt-2 space-y-4">
                    {currentUser.profile.experience.map((exp, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Briefcase />
                        </div>
                        <div>
                          <p className="font-semibold">{exp.title}</p>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground">{exp.duration}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                </>
            )}
            
            {currentUser.role !== 'Founder' && currentUser.profile.interests && currentUser.profile.interests.length > 0 && (
                <>
                <Separator />
                <div>
                    <h3 className="font-semibold text-lg">{getInterestsLabel()}</h3>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {currentUser.profile.interests.map(interest => (
                            <Badge key={interest} variant="secondary">{interest}</Badge>
                        ))}
                    </div>
                </div>
                </>
            )}
          </div>
        </CardContent>
      </Card>
    );
}


export default function ProfileView() {
  const [user, authLoading] = useAuthState(auth);
  const [profileData, setProfileData] = React.useState<UserType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();
  const router = useRouter();
  
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
        setIsLoading(false);
        router.push('/');
        return;
    }
    
    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                setProfileData(userDoc.data() as UserType);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: 'Could not find your profile data.' });
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load your profile.' });
        } finally {
            setIsLoading(false);
        }
    };

    fetchUserData();
  }, [user, authLoading, toast, router]);


  if (isLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (!profileData) {
      return (
        <Card className="text-center p-8">
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>We couldn't load your profile. Please try logging out and back in.</CardDescription>
        </Card>
      )
  }
  
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex justify-end">
          <Button size="lg" onClick={() => router.push('/onboarding')}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
      </div>

      {profileData.role === 'Founder' && (
        <StartupCard profile={profileData.profile} businessLogoUrl={profileData.businessLogoUrl} />
      )}
      
      <ProfileCard currentUser={profileData} />
      
      {profileData.role === 'Founder' && <FinancialsCard profile={profileData.profile} role={profileData.role} />}

    </div>
  );
}
