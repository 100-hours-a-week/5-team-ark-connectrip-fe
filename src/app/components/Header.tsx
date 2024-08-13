'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 상태를 나타내는 상태 값
  const [dropdownOpen, setDropdownOpen] = useState(false) // 드롭다운 메뉴 상태
  const dropdownRef = useRef(null)
  const router = useRouter()

  const handleClick = () => {
    router.push('/company')
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      (dropdownRef.current as HTMLElement).contains(event.target as Node)
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
    <header className='bg-white shadow-xl p-4 flex justify-between items-center'>
      <div className='flex items-center cursor-pointer' onClick={handleClick}>
        <Image src='/logo.png' alt='Logo' width={30} height={30} />
        <h1 className='ml-2 text-2xl font-semibold'>ConnecTrip</h1>
      </div>
      <div className='relative' ref={dropdownRef}>
        {isLoggedIn ? (
          <div className='flex items-center'>
            <Image
              src='/profile.jpg'
              alt='Profile'
              width={40}
              height={40}
              className='rounded-full cursor-pointer bg-black'
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
          // <button className='text-gray-700 text-m'>로그인ssssss</button>
        )}
      </div>
    </header>
  )
}
