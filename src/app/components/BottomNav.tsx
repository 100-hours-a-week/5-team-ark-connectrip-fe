'use client'

import React, { useState } from 'react'
import FireIcon from './Icon/fireIcon'
import CommunityIcon from './Icon/CommunityIcon'
import ProfileIcon from './Icon/ProfileIcon'

const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fire')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className='fixed bottom-0 w-full bg-white shadow-md flex justify-around items-center p-2'>
      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => handleTabClick('fire')}
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
        onClick={() => handleTabClick('community')}
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
        onClick={() => handleTabClick('profile')}
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
