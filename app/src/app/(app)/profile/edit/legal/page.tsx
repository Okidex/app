
'use client';

import { Startup, FounderProfile } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import IncorporationDetailsForm from "@/components/profile/incorporation-details-form";
import { Skeleton } from "@/components/ui/skeleton";
import { getStartupById } from "@/lib/actions";
import { useUser } from '@/firebase';

export default function LegalPage() {
  const { user, isUserLoading } = useUser();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return;
    if (!user || user.role !== 'founder') {
      router.replace('/dashboard');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const founderProfile = user.profile as FounderProfile;
      if (founderProfile.companyId) {
        const startupData = await getStartupById(founderProfile.companyId);
        if (startupData) {
            setStartup(startupData);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user, isUserLoading, router]);


  if (isUserLoading || loading) {
     return (
        <div className="space-y-6">
            <Skeleton className="h-[300px] w-full rounded-lg"/>
        </div>
    )
  }

  if (!startup) {
      return <div>Startup not found.</div>
  }

  return (
    <div className="space-y-6">
        {/* FIXED: Added fallback object to satisfy TypeScript strict mode */}
        <IncorporationDetailsForm 
          startupId={startup.id} 
          initialData={startup.incorporationDetails ?? { isIncorporated: false }} 
        />
    </div>
  );
}
