'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import FireIcon from './Icon/FireIcon'
import CommunityIcon from './Icon/CommunityIcon'
import ProfileIcon from './Icon/ProfileIcon'
import ChatIcon from './Icon/ChatIcon'

const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fire')
  const router = useRouter()

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName)
    router.push(path)
  }

  return (
    <div className='fixed bottom-0 w-full bg-white shadow-md flex justify-around items-center p-2'>
      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => handleTabClick('fire', '/company')}
      >
        <FireIcon
          color={activeTab === 'fire' ? 'text-main' : 'text-secondary'}
        />
        <span
          className={`text-sm ${activeTab === 'fire' ? 'text-main' : 'text-secondary'}`}
        >
          동행
        </span>
      </div>

      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => handleTabClick('chat', '/group')}
      >
        <ChatIcon
          color={activeTab === 'chat' ? 'text-main' : 'text-secondary'}
        />
        <span
          className={`text-sm ${activeTab === 'chat' ? 'text-main' : 'text-secondary'}`}
        >
          채팅
        </span>
      </div>

      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => handleTabClick('community', '/community')}
      >
        <CommunityIcon
          color={activeTab === 'community' ? 'text-main' : 'text-secondary'}
        />
        <span
          className={`text-sm ${activeTab === 'community' ? 'text-main' : 'text-secondary'}`}
        >
          커뮤니티
        </span>
      </div>

      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => handleTabClick('profile', '/profile')}
      >
        <ProfileIcon
          color={activeTab === 'profile' ? 'text-main' : 'text-secondary'}
        />
        <span
          className={`text-sm ${activeTab === 'profile' ? 'text-main' : 'text-secondary'}`}
        >
          내 프로필
        </span>
      </div>
    </div>
  )
}

export default BottomNav
