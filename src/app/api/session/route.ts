
import { NextResponse } from 'next/server';
// import { auth } from '@/lib/firebase-server-init';
// import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

/**
 * [DEBUGGER] Session Management Route
 */
export async function POST(req: Request) {
  console.log('[DEBUGGER-API] POST /api/session - Request received (Standard Response Test)');
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/*
export async function DELETE() {
  console.log('[DEBUGGER-API] DELETE /api/session - Clearing session');
  const cookieStore = await cookies();
  cookieStore.set('__session', '', { maxAge: 0, sameSite: 'none', secure: true });
  return NextResponse.json({ success: true });
}
*/
