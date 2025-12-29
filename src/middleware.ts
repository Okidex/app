import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ASSETS & NEXT INTERNALS (Never redirect these)
  // This avoids the "blank page with only a logo" issue.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') || // matches .js, .css, .png, etc.
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. PUBLIC PAGES (Home and Auth pages)
  const isPublicPage = pathname === '/' || pathname === '/login' || pathname.startsWith('/register');
  
  // 3. REDIRECT LOGIC
  // Redirect unauthenticated users to login for protected pages
  if (!session && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users away from auth pages to dashboard
  if (session && (pathname === '/login' || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 4. CRITICAL MATCHER FIX
export const config = {
  matcher: [
    /*
     * Match all paths except internal ones.
     * The regex below is the safest for Next.js 14/15.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
