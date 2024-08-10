import type { Metadata } from 'next'
import './globals.css'

// 메타데이터 설정
export const metadata: Metadata = {
  title: 'ConnecTrip',
  description: '국내 여행 동행 모집 커뮤니티',
  openGraph: {
    title: 'ConnecTrip',
    description: '국내 여행 동행 모집 커뮤니티',
    url: 'https://yourwebsite.com',
    siteName: 'ConnecTrip',
    images: [
      {
        url: '',
        width: 800,
        height: 600,
        alt: 'ConnecTrip',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConnecTrip',
    description: '국내 여행 동행 모집 커뮤니티',
    images: [''],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ko'>
      <head>
        {/* Pretendard 폰트 미리 로드 */}
        <link
          rel='preload'
          as='style'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css'
          // 웹 페이지에서 외부 리소스(예: 폰트, 이미지, 스크립트 등)를 로드할 때, 브라우저가 해당 리소스에 대해 CORS(Cross-Origin Resource Sharing) 요청을 수행하도록 지시
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          as='style'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
