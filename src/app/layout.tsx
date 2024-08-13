import type { Metadata } from 'next'
import './globals.css'
import 'antd/dist/reset.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, ThemeConfig } from 'antd'
import ClientContent from './components/ClientContent' // 클라이언트 전용 컴포넌트 가져오기

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

const config: ThemeConfig = {
  token: {
    colorPrimary: '#FF9068',
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
      <body>
        <AntdRegistry>
          <ConfigProvider theme={config}>
            {/* 클라이언트 전용 컴포넌트를 여기에서 사용 */}
            <ClientContent>{children}</ClientContent>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
