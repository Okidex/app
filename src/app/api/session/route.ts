import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-server-init';
import { cookies } from 'next/headers';

/**
 * Route Handler for managing Firebase Auth sessions via HTTP-only cookies.
 */

export async function POST(req: Request) {
  console.log('[DEBUG-API] POST /api/session - Starting session creation');
  try {
    const { idToken } = await req.json();
    console.log('[DEBUG-API] Received ID Token (length):', idToken?.length);
    
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    console.log('[DEBUG-API] Session cookie generated successfully');
    
    const cookieStore = await cookies();
    cookieStore.set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    console.log('[DEBUG-API] Cookie "__session" has been set in CookieStore');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[DEBUG-API] Session creation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  console.log('[DEBUG-API] DELETE /api/session - Clearing session');
  try {
    const cookieStore = await cookies();
    cookieStore.set('__session', '', { maxAge: 0 });
    console.log('[DEBUG-API] Cookie "__session" has been cleared');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[DEBUG-API] Session deletion error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
