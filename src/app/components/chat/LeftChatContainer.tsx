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
  const messageParts = linkify(message) // 메시지를 링크와 텍스트로 분리
  const link = messageParts.find(
    (part) => typeof part === 'object' && part.type === 'link'
  ) as { type: 'link'; url: string } | undefined

  return (
    <div className='flex w-full items-start justify-start gap-1 mt-2 pr-4'>
      {/* 링크가 없을 때는 기존 시간 위치 */}
      <div className='items-center justify-center w-[33px]'>
        <ProfileIcon src={profileSrc} size={33} nickname={senderNickname} />
      </div>

      {/* 채팅 메시지와 썸네일을 분리 */}
      <div className='flex flex-col items-start gap-2'>
        {/* 닉네임 표시 */}
        <div className='text-xs text-gray-700'>{senderNickname}</div>

        {/* 메시지와 시간을 가로로 정렬 */}
        <div className='flex items-end gap-2'>
          {/* 메시지 출력 부분 */}
          <div className='px-4 py-2 bg-gray-100 text-black break-all rounded-3xl text-sm'>
            {messageParts.map((part, index) =>
              typeof part === 'string' ? (
                <span key={index}>{part}</span> // 일반 텍스트
              ) : (
                <a
                  key={index}
                  href={part.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 underline'
                >
                  {part.url} {/* 링크 */}
                </a>
              )
            )}
          </div>

          {/* 링크가 없을 때 일반 메시지 우측에 시간 표시 */}
          {!link && (
            <div className='text-xs text-gray-700 whitespace-nowrap'>
              {time}
            </div>
          )}
        </div>

        {/* 링크 썸네일 표시 */}
        {link && (
          <div className='flex items-end justify-end gap-2'>
            <LinkPreview url={link.url} />
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
