// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES: Define paths that never require login.
  // Include home page ('/') and login/register paths here.
  const isPublicPage = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/register');

  // 2. AUTHENTICATION GUARD:
  // Only redirect if it's NOT a public page and there is NO session.
  if (!session && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. LOGGED-IN GUARD:
  // If user is already logged in, redirect them away from login/register to dashboard.
  if (session && (pathname === '/login' || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 4. CRITICAL MATCHER UPDATE:
// This regex specifically EXCLUDES system files, static assets, and public images.
// If this is missing or wrong, your page will appear blank.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
