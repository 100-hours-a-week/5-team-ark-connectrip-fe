import type { Metadata } from 'next'
import './globals.css'
import 'antd/dist/reset.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, ThemeConfig } from 'antd'
import ClientContent from './components/common/ClientContent' // 클라이언트 전용 컴포넌트 가져오기
import React from 'react'
import Script from 'next/script'
import WebSocketProvider from './components/noti/WebSocketProvider'
import NotificationListener from './components/noti/NotificationListener'

// 메타데이터 설정
export const metadata: Metadata = {
  title: '커넥트립 | 국내 여행 동행 커뮤니티',
  description: '국내 여행 동행 모집 커뮤니티',
  openGraph: {
    title: 'ConnecTrip | 국내 여행 동행 커뮤니티',
    description:
      'ConnecTrip은 국내 여행 동행자를 모집하고, 실시간 채팅 및 위치 공유 기능을 통해 안전하고 즐거운 여행을 지원하는 커뮤니티입니다.',
    url: 'https://connectrip.travel/',
    siteName: 'ConnecTrip',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'ConnecTrip 로고',
        type: 'image/svg+xml',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConnecTrip | 국내 여행 동행 커뮤니티',
    description:
      'ConnecTrip은 국내 여행 동행자를 모집하고 커뮤니티를 형성할 수 있는 서비스입니다.',
    images: [
      {
        url: '/logo.svg',
        alt: 'ConnecTrip 로고',
      },
    ],
  },
}

const config: ThemeConfig = {
  token: {
    colorPrimary: '#74cccc',
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
        {/* <!-- Google Tag Manager --> */}
        <Script
          id='gtm-head'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
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
        <meta name='robots' content='index,follow' />
        <link rel='canonical' href='https://connectrip.travel/' />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_KEY}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AntdRegistry>
          <ConfigProvider theme={config}>
            <WebSocketProvider />
            <NotificationListener />
            <ClientContent>{children}</ClientContent>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
