'use client'

import React from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import '@/app/globals.css'

export default function ClientContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col min-h-screen h-full shadow-lg'>
        <Header />
        <main className='flex flex-1 mt-[70px] justify-center items-start bg-white relative'>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
