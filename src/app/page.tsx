
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase-server-init';

export default async function RootPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('__session');

  if (sessionCookie) {
    try {
      // Verify the cookie. If it's valid, redirect to dashboard.
      await auth.verifySessionCookie(sessionCookie.value, true);
      redirect('/dashboard');
    } catch (error) {
      // Cookie is invalid. Fall through to redirect to home.
    }
  }

  redirect('/home');
}
