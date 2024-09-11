// components/chat/MyChatContainer.tsx
import { linkify } from '@/app/utils/linkify'
import React from 'react'
import LinkPreview from '@/app/components/chat/LinkPrieview'

interface MyChatContainerProps {
  message: string
  time: string
}

const MyChatContainer: React.FC<MyChatContainerProps> = ({ message, time }) => {
  const link = linkify(message) // 메시지에서 링크를 추출

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
        {/* 메시지에 링크가 있는 경우 */}
        <div className='px-4 py-2 bg-main text-white break-all rounded-3xl text-sm'>
          {link ? (
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-white underline'
            >
              {link}
            </a>
          ) : (
            <span>{message}</span> // 링크가 없는 경우 일반 메시지 출력
          )}
        </div>

        {/* 링크 썸네일 표시 */}
        {link && (
          <div className='flex items-end justify-end gap-2'>
            <div className='text-xs text-gray-700 whitespace-nowrap'>
              {time}
            </div>
            <LinkPreview url={link} />
            {/* 링크가 있을 때 시간 표시 */}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyChatContainer
