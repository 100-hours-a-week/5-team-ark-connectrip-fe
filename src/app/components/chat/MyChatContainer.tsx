// components/chat/MyChatContainer.tsx
import { linkify } from '@/app/utils/linkify'
import React from 'react'
import LinkPreview from '@/app/components/chat/LinkPrieview'

interface MyChatContainerProps {
  message: string
  time: string
}

const MyChatContainer: React.FC<MyChatContainerProps> = ({ message, time }) => {
  const messageParts = linkify(message) // 메시지를 링크와 텍스트로 분리
  const link = messageParts.find(
    (part) => typeof part === 'object' && part.type === 'link'
  ) as { type: 'link'; url: string } | undefined

  return (
    <div className='flex w-full items-end justify-end mt-2 h-full gap-1 pl-4'>
      {/* 링크가 없을 때는 기존 시간 위치 */}
      {!link && (
        <div className='text-xs text-gray-700 w-[45px] whitespace-nowrap'>
          {time}
        </div>
      )}

      {/* 채팅 메시지와 썸네일을 분리 */}
      <div className='flex flex-col items-end gap-2'>
        {/* 메시지 출력 부분 */}
        <div className='px-4 py-2 bg-main text-white break-all rounded-3xl text-sm'>
          {messageParts.map((part, index) =>
            typeof part === 'string' ? (
              <span key={index}>{part}</span> // 일반 텍스트
            ) : (
              <a
                key={index}
                href={part.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white underline'
              >
                {part.url} {/* 링크 */}
              </a>
            )
          )}
        </div>

        {/* 링크 썸네일과 시간 표시 */}
        {link && (
          <div className='flex items-end justify-end gap-2'>
            <div className='text-xs text-gray-700 whitespace-nowrap'>
              {time}
            </div>
            <LinkPreview url={link.url} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MyChatContainer
