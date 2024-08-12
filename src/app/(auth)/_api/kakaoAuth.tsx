import { NextApiRequest, NextApiResponse } from 'next'

export default function kakaoUrlHandler(
  _: NextApiRequest,
  res: NextApiResponse
) {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY!}&redirect_uri=${
    process.env.NEXT_PUBLIC_SELF_URL! + process.env.KAKAO_REDIRECT_URI!
  }&response_type=code`

  res.status(200).json(kakaoURL)
}
