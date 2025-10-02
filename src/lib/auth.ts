
"use server";

import { auth } from "./firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function login(email: string, password: string):Promise<{success: boolean, error?: string}> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch(error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

