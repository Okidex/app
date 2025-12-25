
'use client';

import { useFirebase } from '@/firebase/provider';
import { FullUserProfile } from '@/lib/types';

export interface UserHookResult {
  user: FullUserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// This hook is now a simple wrapper around the context.
// The actual logic is in the provider itself.
export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
};
