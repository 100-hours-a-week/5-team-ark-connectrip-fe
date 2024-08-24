'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import FireIcon from '../Icon/FireIcon'
import CommunityIcon from '../Icon/CommunityIcon'
import ProfileIcon from '../Icon/ProfileIcon'
import ChatIcon from '../Icon/ChatIcon'

const BottomNav: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()

  const determineActiveTab = () => {
    if (pathname.startsWith('/accompany')) {
      return 'fire'
    } else if (pathname.startsWith('/chat')) {
      return 'chat'
    } else if (pathname.startsWith('/community')) {
      return 'community'
    } else if (pathname.startsWith('/profile')) {
      return 'profile'
    } else {
      return ''
    }
  }

  const activeTab = determineActiveTab()

  const tabs = [
    { name: 'fire', path: '/accompany', Icon: FireIcon, label: '동행' },
    { name: 'chat', path: '/chat', Icon: ChatIcon, label: '채팅' },
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

  const handleTabClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className='fixed bottom-0 w-full bg-white shadow-md flex justify-around items-center p-2 z-10'>
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className='flex flex-col items-center cursor-pointer'
          onClick={() => handleTabClick(tab.path)}
        >
          <tab.Icon
            color={activeTab === tab.name ? 'text-main' : 'text-secondary'}
          />
          <span
            className={`text-sm ${
              activeTab === tab.name ? 'text-main' : 'text-secondary'
            }`}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default BottomNav
