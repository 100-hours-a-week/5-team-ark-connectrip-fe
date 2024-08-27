// app/chat/layout.tsx
'use client'

import React, { Suspense } from 'react'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import { MenuOutlined } from '@ant-design/icons'

// 이 레이아웃은 /chat 경로의 모든 페이지에 적용됩니다.
export default function AccompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-full'>
      <div className='fixed top-[74px] left-0 w-full h-8 bg-white shadow-md z-10 '>
        <div className='w-full h-full max-w-screen-lg mx-auto flex items-center justify-between p-4'>
          <h1 className='text-base font-medium text-black'>
            모집 게시글로 이동
          </h1>
          <div className='pl-5'>
            <MenuOutlined />
          </div>
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  )
}
