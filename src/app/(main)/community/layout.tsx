// app/accompany/layout.tsx
'use client'

import React, { Suspense } from 'react'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'

// 이 레이아웃은 /community 경로의 모든 페이지에 적용됩니다.
export default function AccompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-full'>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  )
}
