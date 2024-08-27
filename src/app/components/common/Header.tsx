// components/Header.tsx
'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import DropdownMenu from './DropdownMenu'
import useAuthStore from '@/app/store/useAuthStore'
import ProfileIcon from './ProfileIcon'
import { api } from '@/app/utils/api'
import { useCustomMessage } from '@/app/utils/alertUtils'

export default function Header() {
  const router = useRouter()
  const { nickname, profileImage, fetchUser } = useAuthStore()
  const { showWarning, contextHolder } = useCustomMessage()
  const pathname = usePathname()

  useEffect(() => {
    const fetchUserData = async () => {
      const status = await fetchUser()

      if (status === 'FIRST_LOGIN') {
        router.push('/signup')
      }
      // TODO: 백엔드 reissue api 구현 후 동작확인 필요 (at 만료시 어케되는지)
    }

    if (!nickname) {
      fetchUserData()
    }
  }, [fetchUser, router, nickname])

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await api.post('/api/v1/auth/logout', {})
      if (response.message === 'SUCCESS') {
        // 상태 초기화
        useAuthStore.getState().clearUser()

        // 홈 페이지로 이동
        router.push('/')
      } else {
        console.error('로그아웃 실패:', response.message)
        // 로그아웃 실패 시 추가 처리 (예: 에러 메시지 표시)
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error)
    }
  }

  const handleProfileEdit = () => {
    // 내 정보 수정 페이지로 이동
    router.push('/profile/edit')
  }

  const handleLogoClick = () => {
    if (pathname === '/signup') {
      showWarning('추가 입력폼을 제출해주세요.')
    } else {
      router.push('/accompany')
    }
  }

  const menuItems = [
    { label: '로그아웃', onClick: handleLogout },
    { label: '내 정보 수정', onClick: handleProfileEdit },
  ]

  return (
    <header className='fixed top-0 w-full md:w-[500px] bg-white shadow-lg p-4 flex justify-between items-center border-b border-gray-100 z-10'>
      {contextHolder}
      <div
        className='flex items-center cursor-pointer'
        onClick={handleLogoClick} // 클릭 시 처리
      >
        <Image src='/logo.png' alt='Logo' width={30} height={30} />
        <h1 className='ml-2 text-2xl font-semibold'>ConnecTrip</h1>
      </div>
      {nickname ? (
        <div className='flex gap-2'>
          {/* <div className='flex items-center justify-center'>
            <p className='font-medium text-sm'>{nickname} 님</p>
          </div> */}
          <DropdownMenu
            triggerComponent={
              <ProfileIcon
                src={profileImage || ''}
                size={40}
                nickname={nickname}
              />
            }
            menuItems={menuItems}
          />
        </div>
      ) : (
        <></>
      )}
    </header>
  )
}
