// src/firebase/auth/use-user.ts
'use client';

import { useContext } from 'react';
import { FirebaseContext } from '../provider';

export function useUser() {
  const context = useContext(FirebaseContext);

  // If we are prerendering (Build time), context will be undefined.
  // We return a loading state instead of throwing an error.
  if (!context) {
    return { user: null, isUserLoading: true, userError: null };
  }

  return {
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError
  };
}
