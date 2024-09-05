import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  const queryString = request.nextUrl.search;
  if (request.nextUrl.pathname.startsWith('/api/auth') && queryString.startsWith('?error') ) {
    return NextResponse.rewrite(new URL('/error' + queryString, request.url))
  }

}