
'use server';

import 'server-only';
import { getCurrentUser } from '@/lib/auth-actions';
import { getStartupById, getUsersByIds } from '@/lib/actions';
import { FounderProfile } from '@/lib/types';
import ProfileEditClient from './client';
import { notFound } from 'next/navigation';
import { toSerializable } from '@/lib/serialize';

export default async function ProfileEditPage() {
  const user = await getCurrentUser();
  if (!user) {
    notFound();
  }

  let startup = null;
  let founders: any[] = [];

  if (user.role === 'founder') {
    const founderProfile = user.profile as FounderProfile;
    if (founderProfile.companyId) {
      startup = await getStartupById(founderProfile.companyId);
      if (startup?.founderIds) {
        founders = await getUsersByIds(startup.founderIds);
      }
    }
  }

  return <ProfileEditClient serverUser={user} serverStartup={startup} serverFounders={founders} />;
}
