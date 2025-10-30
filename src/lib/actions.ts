// src/lib/actions.ts
"use server"; // Important! Actions must also be server-only

import { auth, firestore } from './firebase-admin';

export async function createUserAndProfile(formData: FormData) {
  // ... your action logic
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Use the imported `auth` service
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Use the imported `firestore` service
    await firestore.collection('users').doc(userRecord.uid).set({
      // ... user profile data
    });

    return { success: true };
  } catch (error) {
    // ... error handling
  }
}
