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

  const tabs = [
    { name: 'fire', path: '/company', Icon: FireIcon, label: '동행' },
    { name: 'chat', path: '/group', Icon: ChatIcon, label: '채팅' },
    {
      name: 'community',
      path: '/community',
      Icon: CommunityIcon,
      label: '커뮤니티',
    },
    {
      name: 'profile',
      path: '/profile',
      Icon: ProfileIcon,
      label: '내 프로필',
    },
  ]

  return (
    <div className='fixed bottom-0 w-full bg-white shadow-md flex justify-around items-center p-2'>
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className='flex flex-col items-center cursor-pointer'
          onClick={() => handleTabClick(tab.name, tab.path)}
        >
          <tab.Icon
            color={activeTab === tab.name ? 'text-main' : 'text-secondary'}
          />
          <span
            className={`text-sm ${activeTab === tab.name ? 'text-main' : 'text-secondary'}`}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default BottomNav
