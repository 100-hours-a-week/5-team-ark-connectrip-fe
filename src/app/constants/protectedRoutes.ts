// 로그인이 필요한 페이지 목록
export const protectedRoutes = ['/accompany', '/chat', '/community', '/profile']

// 추가 회원가입이 필요한 페이지 목록
export const signupOnlyRoutes = ['/signup', '/privacy', '/policy']

// 로그인이 되면 접근할 수 없는 페이지 목록
export const guestRoutes = ['/', 'signup']
