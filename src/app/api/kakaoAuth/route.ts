// src/app/api/kakaoAuth/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY!}&redirect_uri=${
    process.env.NEXT_PUBLIC_SELF_URL! + process.env.KAKAO_REDIRECT_URI!
  }&response_type=code`

  return NextResponse.json(kakaoURL)
}
