// components/chat/LeftChatContainer.tsx
import React from 'react'
import ProfileIcon from '@/app/components/common/ProfileIcon'

interface LeftChatContainerProps {
  message: string
  time: string
  nickname: string
  profileSrc: string
}

const LeftChatContainer: React.FC<LeftChatContainerProps> = ({
  message,
  time,
  nickname,
  profileSrc,
}) => {
  return (
    <div className='flex w-full items-start justify-start gap-1 mt-2 pr-4'>
      <div className='items-center justify-center'>
        <ProfileIcon src={profileSrc} size={33} nickname={nickname} />
      </div>
      <div className='flex gap-2'>
        <div className=''>
          <div className='text-s font-medium text-gray-700'>{nickname}</div>
          <div className='flex items-center justify-between px-4 py-2 bg-gray-100 rounded-3xl text-sm'>
            {message}
          </div>
        </div>
        <div className=' flex items-end '>
          <div className='text-xs text-gray-700 whitespace-nowrap'>{time}</div>
        </div>
      </div>
    </div>
  )
}

export default LeftChatContainer
