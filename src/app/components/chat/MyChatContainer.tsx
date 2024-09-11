// components/chat/MyChatContainer.tsx
import { linkify } from '@/app/utils/linkify'
import React from 'react'

interface MyChatContainerProps {
  message: string
  time: string
}

const MyChatContainer: React.FC<MyChatContainerProps> = ({ message, time }) => {
  return (
    <div className='flex w-full items-end justify-end mt-2 h-full gap-1 pl-4'>
      <div className='text-xs text-gray-700 w-[45px]  whitespace-nowrap '>
        {time}
      </div>
      <div className='flex items-center justify-between px-4 py-2 bg-main text-white rounded-3xl text-sm'>
        <span>{linkify(message)}</span>
      </div>
    </div>
  )
}

export default MyChatContainer
