import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parse } from 'cookie'
import {
  protectedRoutes,
  guestRoutes,
  signupOnlyRoutes,
} from './app/constants/protectedRoutes'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|images).*)'],
}

export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get('cookie') || '')
  const accessToken = cookies.accessToken
  const refreshToken = cookies.refreshToken
  const tempToken = cookies.tempToken

  const currentPath = request.nextUrl.pathname

  // 로그인이 필요한 페이지인지 확인 (protectedRoutes와 하위 도메인 포함)
  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  )

  // 비로그인 사용자가 접근할 수 있는 페이지인지 확인
  const isGuestRoute = guestRoutes.includes(currentPath)

  // 소셜로그인 후 추가 회원가입이 필요한 페이지인지 확인
  const isSignupOnlyRoute = signupOnlyRoutes.includes(currentPath)

  // 1. 보호된 경로에 접근하려면 accessToken 또는 refreshToken이 있어야 함
  if (isProtectedRoute && !accessToken && !refreshToken) {
    if (tempToken) {
      // tempToken이 있는 경우 추가 회원가입으로 리디렉션
      const url = request.nextUrl.clone()
      url.pathname = '/signup'
      url.searchParams.set(
        'message',
        '추가 정보를 입력해야 회원가입이 완료됩니다.'
      )
      return NextResponse.redirect(url)
    } else {
      // 아무 토큰도 없는 경우 메인 페이지로 리디렉션
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.searchParams.set('message', '로그인이 필요한 페이지입니다.')
      return NextResponse.redirect(url)
    }
  }

  // 2. 이미 로그인된 사용자가 guestRoutes에 접근하려고 할 때 리디렉션
  if ((accessToken || refreshToken) && isGuestRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/accompany' // 기본 리디렉션 경로를 설정
    return NextResponse.redirect(url)
  }

  // 3. 소셜로그인을 했지만 첫 로그인이라서 tempToken만 있는 경우에는 /signup만 접근 가능
  if (tempToken && !accessToken && !refreshToken) {
    if (!isSignupOnlyRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/signup'
      url.searchParams.set(
        'message',
        '추가 정보를 입력해야 회원가입이 완료됩니다.'
      )
      return NextResponse.redirect(url)
    }
  }

  // 4. 비로그인 상태에서 signup 페이지에 접근하려고 할 때 리디렉션
  if (!accessToken && !refreshToken && !tempToken && isSignupOnlyRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('message', '로그인이 필요한 페이지입니다.')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
