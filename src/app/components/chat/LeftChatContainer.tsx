// components/chat/LeftChatContainer.tsx
import React from 'react'
import ProfileIcon from '@/app/components/common/ProfileIcon'
import { linkify } from '@/app/utils/linkify'
import LinkPreview from '@/app/components/chat/LinkPrieview'

interface LeftChatContainerProps {
  message: string
  time: string
  senderNickname: string
  profileSrc: string
}

const LeftChatContainer: React.FC<LeftChatContainerProps> = ({
  message,
  time,
  senderNickname,
  profileSrc,
}) => {
  const link = linkify(message) // 메시지에서 링크를 추출
  return (
    <div className='flex w-full items-start justify-start gap-1 mt-2 pr-4'>
      <div className='items-center justify-center w-[33px]'>
        <ProfileIcon src={profileSrc} size={33} nickname={senderNickname} />
      </div>
      {/* 채팅 메시지와 썸네일을 분리 */}
      <div className='flex flex-col items-start gap-2'>
        {/* 닉네임 표시 */}
        <div className='text-xs text-gray-700'>{senderNickname}</div>

        {/* 메시지에 링크가 있는 경우 */}
        <div className='px-4 py-2 bg-gray-100 text-black break-all rounded-3xl text-sm'>
          {link ? (
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              {link}
            </a>
          ) : (
            <span>{message}</span> // 링크가 없는 경우 일반 메시지 출력
          )}
        </div>

        {/* 링크 썸네일 표시 */}
        {link && (
          <div className='flex items-start justify-start gap-2'>
            <LinkPreview url={link} />
            <div className='text-xs text-gray-500 whitespace-nowrap'>
              {time}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeftChatContainer
