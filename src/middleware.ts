import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth-storage')
  const pathname = request.nextUrl.pathname
  const isAuthPage = pathname.startsWith('/login')
  const isEnrollmentPage = pathname.startsWith('/enrollment')
  const isRoot = pathname === '/' || pathname === ''

  // Si está en la raíz, redirigir según autenticación
  if (isRoot) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/enrollment', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Si no está autenticado y no está en login, redirigir a login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si está autenticado y va a login, redirigir a enrollment
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/enrollment', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/enrollment/:path*'
  ]
}
