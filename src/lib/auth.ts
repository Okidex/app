
"use server";

import { initializeFirebase } from '@/firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeAdminApp } from './firebase-admin';

export async function login(email: string, password: string):Promise<{success: boolean, error?: string}> {
  const { auth } = initializeFirebase();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await initializeAdminApp().auth.createSessionCookie(idToken, { expiresIn });
    
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    // This is a simplified way to set cookie, in a real app use a library like 'cookies-next'
    const { cookies } = await import('next/headers');
    cookies().set('__session', sessionCookie, options);

    return { success: true };
  } catch(error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
  const { auth: clientAuth } = initializeFirebase();
  try {
    await signOut(clientAuth);
    const { cookies } = await import('next/headers');
    cookies().delete('__session');
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

