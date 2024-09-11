//components/chat/LinkPreview.tsx
import { truncateText } from '@/app/utils/textUtils'
import React, { useState, useEffect } from 'react'

interface LinkPreviewProps {
  url: string
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [metaData, setMetaData] = useState<{
    title?: string
    description?: string
    image?: string
  }>({})

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await fetch(
          `/api/scrape?url=${encodeURIComponent(url)}`
        )
        const data = await response.json()
        setMetaData(data)
      } catch (error) {
        console.error('Error fetching link metadata:', error)
      }
    }

    fetchMetaData()
  }, [url])

  return (
    <div className='link-preview bg-white border-gray-200 border rounded-md w-[270px]'>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <div
          className='thumbnail w-full h-[135px] bg-gray-100 flex items-center justify-center rounded-t-md overflow-hidden'
          style={{ minHeight: '135px' }} // 이미지 로드 전에도 고정 크기
        >
          <img
            src={metaData.image}
            alt={metaData.title}
            className='w-full h-auto object-cover'
          />
        </div>
        <div className='flex flex-col p-3 h-[58px]'>
          {metaData.title ? (
            <h4 className='text-base text-black break-all'>
              {truncateText(metaData.title, 25)} {/* 설명 글자수 제한 */}
            </h4>
          ) : (
            // 스켈레톤 로더 (제목 영역)
            <div className='animate-pulse h-3 bg-gray-200 rounded w-3/4 mb-2'></div>
          )}
          {metaData.description ? (
            <p className='text-s text-gray-500 break-all '>
              {truncateText(metaData.description, 30)} {/* 설명 글자수 제한 */}
            </p>
          ) : (
            // 스켈레톤 로더 (설명 영역)
            <div className='animate-pulse h-3 bg-gray-200 rounded w-full'></div>
          )}
        </div>
      </a>
    </div>
  )
}

export default LinkPreview
