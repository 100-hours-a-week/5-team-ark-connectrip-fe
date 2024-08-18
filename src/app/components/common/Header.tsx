// components/Header.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import DropdownMenu from './DropdownMenu'

export default function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // 로그인 상태를 나타내는 상태 값

  const handleLogout = () => {
    // 로그아웃 로직
    console.log('로그아웃')
    setIsLoggedIn(false) // 로그아웃 시 로그인 상태 false로 변경
    router.push('/') // 로그아웃 후 로그인 페이지로 이동 (예시)
  }

  const handleProfileEdit = () => {
    // 내 정보 수정 페이지로 이동
    router.push('/profile/edit')
  }

  const menuItems = [
    { label: '로그아웃', onClick: handleLogout },
    { label: '내 정보 수정', onClick: handleProfileEdit },
  ]

  return (
    <header className='fixed top-0 w-full bg-white shadow-lg p-4 flex justify-between items-center border-b border-gray-100 z-10'>
      <div
        className='flex items-center cursor-pointer'
        onClick={() => router.push('/accompany')}
      >
        <Image src='/logo.png' alt='Logo' width={30} height={30} />
        <h1 className='ml-2 text-2xl font-semibold'>ConnecTrip</h1>
      </div>
      {isLoggedIn ? (
        <DropdownMenu
          triggerComponent={
            <Image
              src='/mockimage.jpg'
              alt='Profile'
              width={40}
              height={40}
              className='rounded-full'
            />
          }
          menuItems={menuItems}
        />
      ) : (
        <button
          className='text-black px-3 py-2 rounded-full'
          onClick={() => router.push('/')}
        >
          로그인
        </button>
      )}
    </header>
  )
}
