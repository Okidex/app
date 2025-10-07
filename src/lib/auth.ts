'use server';

import { getAuth as getClientAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeFirebase } from '@/firebase';
import { initializeAdminApp } from './firebase-admin';

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
  const { auth: adminAuth } = initializeAdminApp();
  // Note: Determining the current user on the server requires session management
  // or passing a verified ID token. The logic below is a placeholder.
  // In a real app, you'd get the UID from a verified session cookie or auth header.
  const uidToDelete = "some-verified-user-uid"; // This needs to be replaced with real logic
  if (uidToDelete) {
    await adminAuth().deleteUser(uidToDelete);
  } else {
    throw new Error("Could not determine user to delete.");
  }
}

