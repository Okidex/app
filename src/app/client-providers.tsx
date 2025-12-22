'use client';

import React, { createContext, useContext } from 'react';
import { auth, firestore, storage } from '@/firebase'; // Path to your firebase.tsx

const FirebaseContext = createContext({ auth, firestore, storage });

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useAuth = () => useContext(FirebaseContext).auth;
export const useFirestore = () => useContext(FirebaseContext).firestore;
