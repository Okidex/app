import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = ['/', '/login', '/register', '/legal/privacy-policy', '/legal/user-agreement'];
  const isPublicPage = publicPaths.includes(pathname) || pathname.startsWith('/register/');

  // Prevent redirect loops for static assets
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // If the user is logged in, redirect them away from public-only pages to the dashboard.
  if (session) {
    if (isPublicPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  // If the user is not logged in, protect non-public pages.
  else if (!isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except for API routes and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
