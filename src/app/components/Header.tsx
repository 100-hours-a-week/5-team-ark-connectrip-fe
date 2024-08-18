'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true) // 로그인 상태를 나타내는 상태 값
  const [dropdownOpen, setDropdownOpen] = useState(false) // 드롭다운 메뉴 상태
  const dropdownRef = useRef(null)
  const router = useRouter()

  const handleClick = () => {
    router.push('/accompany')
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className='fixed top-0 w-full bg-white shadow-lg p-4 flex justify-between items-center border-b border-gray-100 z-10'>
      <div className='flex items-center cursor-pointer' onClick={handleClick}>
        <Image src='/logo.png' alt='Logo' width={30} height={30} />
        <h1 className='ml-2 text-2xl font-semibold'>ConnecTrip</h1>
      </div>
      <div className='relative' ref={dropdownRef}>
        {isLoggedIn ? (
          <div className='flex items-center'>
            <Image
              src='/mockimage.jpg'
              alt='Profile'
              width={40}
              height={40}
              className='rounded-full cursor-pointer'
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className='absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg'>
                <div className='py-2'>
                  <a
                    href='#'
                    className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    로그아웃
                  </a>
                  <a
                    href='#'
                    className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    내 정보 수정
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  )
}
