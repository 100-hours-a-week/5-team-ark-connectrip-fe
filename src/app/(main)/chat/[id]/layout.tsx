'use client'

import React, { Suspense } from 'react'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import MenuDrawer from '@/app/components/chat/MenuDrawer'
export default function AccompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-full'>
      <div className='fixed top-[74px] left-0 w-full h-8 bg-white shadow-md z-10'>
        <div className='w-full h-full max-w-screen-lg mx-auto flex items-center justify-between p-4'>
          <h1 className='text-base font-medium text-secondary hover:text-black cursor-pointer'>
            모집 게시글로 이동
          </h1>
          {/* Menu Drawer Component */}
          <MenuDrawer />
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  )
}
