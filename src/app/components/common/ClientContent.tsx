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
    <div className='container'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Header />
        <main
          style={{ flex: 1 }}
          className='flex mt-[70px] justify-center items-start bg-white relative'
        >
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
