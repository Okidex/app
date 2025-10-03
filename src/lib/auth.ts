
"use server";

import { initializeFirebase } from '@/firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";

export async function login(email: string, password: string):Promise<{success: boolean, error?: string}> {
  const { auth } = initializeFirebase();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch(error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
  const { auth } = initializeFirebase();
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


export async function sendPasswordReset(email: string) {
  const { auth } = initializeFirebase();
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCurrentUser() {
  const { auth } = initializeFirebase();
  const user = auth.currentUser;
  if (user) {
    await deleteUser(user);
  } else {
    throw new Error("No user is currently signed in.");
  }
}

