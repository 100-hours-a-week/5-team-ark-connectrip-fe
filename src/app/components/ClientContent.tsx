'use client'

import React from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import { theme } from 'antd'

export default function ClientContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { token } = theme.useToken()
  const contentStyle: React.CSSProperties = {
    color: token.colorPrimary,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <main
        style={{ flex: 1 }}
        className='flex justify-center items-center bg-gray-100'
      >
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
