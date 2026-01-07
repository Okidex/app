
'use client';

import CapTableForm from "@/components/profile/cap-table-form";
import { FounderProfile, Startup } from "@/lib/types";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { getStartupById } from "@/lib/actions";
import { useUser } from '@/firebase';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function CapTablePage() {
  const { user, isUserLoading } = useUser();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isUserLoading) return;
    if (!user || user.role !== 'founder') {
      notFound();
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const founderProfile = user.profile as FounderProfile;
      if (founderProfile.companyId) {
        const startupData = await getStartupById(founderProfile.companyId);
        setStartup(startupData);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, isUserLoading]);


  if (isUserLoading || loading) {
     return (
        <div className="space-y-6">
            <Skeleton className="h-[300px] w-full rounded-lg"/>
        </div>
    )
  }

  if (!startup) {
      return <div>Startup not found</div>;
  }
  
  const isIncorporated = startup?.incorporationDetails.isIncorporated ?? false;

  if (!isIncorporated) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle>Capitalization Table Unavailable</CardTitle>
                  <CardDescription>You must mark your company as incorporated before managing your cap table.</CardDescription>
              </CardHeader>
               <CardContent>
                  <Button asChild>
                    <Link href="/profile/edit/legal">Update Legal Details</Link>
                  </Button>
              </CardContent>
          </Card>
      )
  }

  return (
    <div className="space-y-6">
        <CapTableForm startupId={startup.id} initialData={startup.capTable} />
    </div>
  );
}
