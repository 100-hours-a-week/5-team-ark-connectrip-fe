import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parse } from 'cookie'
import { protectedRoutes, guestRoutes } from './app/constants/protectedRoutes'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|images).*)'],
}

export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get('cookie') || '')
  const accessToken = cookies.accessToken
  const refreshToken = cookies.refreshToken

  const currentPath = request.nextUrl.pathname

  // 로그인이 필요한 페이지인지 확인 (protectedRoutes와 하위 도메인 포함)
  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  )

  // 비로그인 사용자가 접근할 수 있는 페이지인지 확인
  const isGuestRoute = guestRoutes.includes(currentPath)

  // 보호된 경로에 접근하려면 accessToken 또는 refreshToken이 있어야 함
  if (isProtectedRoute && !accessToken && !refreshToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('message', '로그인이 필요한 페이지입니다.')
    return NextResponse.redirect(url)
  }

  // 이미 로그인된 사용자가 guestRoutes에 접근하려고 할 때 리디렉션
  if ((accessToken || refreshToken) && isGuestRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/accompany' // 기본 리디렉션 경로를 설정
    return NextResponse.redirect(url)
  }

  // 닉네임이 없는 상태에서 보호된 페이지로 접근 시 리다이렉트
  if (currentPath !== '/signup') {
    const url = request.nextUrl.clone()
    url.pathname = '/signup'
    url.searchParams.set(
      'message',
      '추가 입력폼을 작성하지 않으면 회원가입이 완료되지 않습니다.'
    )
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
