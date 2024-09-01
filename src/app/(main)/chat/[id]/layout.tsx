'use client'

import React, { Suspense } from 'react'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
export const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOJSKEY}&libraries=services,clusterer&autoload=false`

export default function AccompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-full max-w-[500px] h-full'>
        <Suspense fallback={<LoadingSpinner />}>
          <Script src={API} strategy='beforeInteractive' />
          {children}
        </Suspense>
      </div>
    </div>
  )
}
