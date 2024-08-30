'use client'

import React, { Suspense } from 'react'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import MenuDrawer from '@/app/components/chat/MenuDrawer'
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
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      </div>
    </div>
  )
}
