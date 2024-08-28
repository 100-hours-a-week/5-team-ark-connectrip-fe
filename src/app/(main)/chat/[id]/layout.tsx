'use client'

import React, { Suspense } from 'react'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import MenuDrawer from '@/app/components/chat/MenuDrawer'
import Link from 'next/link'
import { LeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

export default function AccompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-full max-w-[500px] h-full'>
        <div className='fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] h-12 bg-white shadow-md z-10'>
          <div className='w-full h-full flex items-center justify-between p-4'>
            <div
              onClick={() => router.back()}
              className='text-sm cursor-pointer text-secondary hover:text-black'
            >
              <LeftOutlined style={{ fontSize: 20 }} />
            </div>
            {/* Menu Drawer Component */}
            <MenuDrawer />
          </div>
        </div>
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      </div>
    </div>
  )
}
