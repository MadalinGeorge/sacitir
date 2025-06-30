import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/' || pathname === '') {
    const host = request.headers.get('host') || '';
    if (host.includes('sacitir.com')) {
      return NextResponse.redirect(new URL('/en', request.url));
    }
    if (host.includes('sacitir.es')) {
      return NextResponse.redirect(new URL('/es', request.url));
    }
    // fallback para desarrollo/local
    return NextResponse.redirect(new URL('/es', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
}; 