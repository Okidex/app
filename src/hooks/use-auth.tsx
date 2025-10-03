"use client";

import { useUser } from '@/firebase';

export default function useAuth() {
  const { user, isUserLoading: loading } = useUser();
  return { user, loading };
}
