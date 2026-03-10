
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-server-init';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

/**
 * [DEBUGGER] Session Management Route
 */
export async function POST(req: Request) {
  console.log('[DEBUGGER-API] POST /api/session - Request received');
  
  if (!auth) {
    console.error('[DEBUGGER-API] Auth not initialized. Cannot create session.');
    return NextResponse.json({ success: false, error: 'Service Unavailable' }, { status: 503 });
  }

  try {
    const { idToken } = await req.json();
    console.log('[DEBUGGER-API] Creating session cookie...');
    
    // session length: 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    const cookieStore = await cookies();
    cookieStore.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });

    console.log('[DEBUGGER-API] Session successfully established.');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[DEBUGGER-API] Session creation failed:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  console.log('[DEBUGGER-API] DELETE /api/session - Clearing session');
  const cookieStore = await cookies();
  cookieStore.set('__session', '', { maxAge: 0, sameSite: 'none', secure: true });
  return NextResponse.json({ success: true });
}
