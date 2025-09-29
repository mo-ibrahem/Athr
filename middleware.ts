import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // If user is not logged in and is trying to access a protected route
  if (!session && pathname.startsWith('/admin')) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is logged in and tries to go to login page, redirect to admin
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}