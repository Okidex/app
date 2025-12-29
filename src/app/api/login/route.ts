import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-server-init';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    const { auth } = getFirebaseAdmin();
    
    // 1. Create a secure session cookie using the Admin SDK (standard for 2025)
    // This allows the session to last up to 5 days, vs 1 hour for the raw idToken
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in ms
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    // 2. Await cookies() - Mandatory in Next.js 15
    const cookieStore = await cookies();

    // 3. Set the cookie
    cookieStore.set('__session', sessionCookie, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: expiresIn / 1000, // maxAge is in seconds
    });

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('API Login Error:', error);
    return NextResponse.json(
      { error: 'Failed to establish session' },
      { status: 401 }
    );
  }
}
