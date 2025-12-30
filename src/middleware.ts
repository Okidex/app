import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  // 1. EXIT EARLY for system/static files
  // This prevents DevTools and system probes from triggering auth logic
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/.well-known')
  ) {
    return NextResponse.next();
  }

  const publicPaths = ['/', '/login', '/register'];
  const isPublicPage = publicPaths.includes(pathname);

  // 2. Redirect Logic
  if (session) {
    // If logged in and on a public page (like /login), go to dashboard
    if (isPublicPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Otherwise, allow access
    return NextResponse.next();
  }

  // 3. Not Logged In Logic
  if (!isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Use a simplified matcher to let the internal logic handle exclusions
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
