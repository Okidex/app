
'use server';

import { getAuth as getClientAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeFirebase } from '@/firebase';
import { getAuth } from "firebase-admin/auth";
import admin from 'firebase-admin';

// This function is intended to be called from client components
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const { auth } = initializeFirebase();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// This function is intended to be called from client components
export async function logout() {
  const { auth } = initializeFirebase();
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// This function is intended to be called from client components
export async function sendPasswordReset(email: string) {
  const { auth } = initializeFirebase();
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// This is a server-side only function
export async function deleteCurrentUser() {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const adminAuth = getAuth();
  const { auth: clientAuth } = initializeFirebase();
  const user = clientAuth.currentUser;

  if (user) {
    await adminAuth.deleteUser(user.uid);
  } else {
    throw new Error("Could not determine user to delete.");
  }
}

