'use client'

import React from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import { usePathname } from 'next/navigation'
import '@/app/globals.css'

export default function ClientContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // path가 '/'인 경우 'mt-0' 적용, 그 외에는 'mt-[70px]'
  const marginTopClass = pathname === '/' ? 'mt-0' : 'mt-[70px]'

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col min-h-screen h-full shadow-lg'>
        <Header />
        <main
          className={`flex flex-1 ${marginTopClass} justify-center items-start bg-white relative`}
        >
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
