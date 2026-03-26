'use client';

import { useFirebase } from '@/firebase/provider';
import type { UserHookResult } from '@/firebase/provider';

// This hook is now a simple wrapper around the context.
// The actual logic is in the provider itself.
export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError, refreshUser } = useFirebase();
  return { user, isUserLoading, userError, refreshUser };
};
