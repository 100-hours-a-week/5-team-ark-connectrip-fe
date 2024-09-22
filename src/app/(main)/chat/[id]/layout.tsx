'use client'

import React, { Suspense } from 'react'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import Script from 'next/script'

export default function AccompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOJSKEY}&libraries=services,clusterer&autoload=false`

  return (
    <div className='w-full h-full flex justify-center items-center z-10 relative'>
      <div className='w-full max-w-[500px] h-full bg-white'>
        <Suspense fallback={<LoadingSpinner />}>
          <Script src={API} strategy='beforeInteractive' />
          {children}
        </Suspense>
      </div>
    </div>
  )
}
