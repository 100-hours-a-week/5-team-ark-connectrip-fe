// components/chat/LinkPreview.tsx
import React, { useState, useEffect } from 'react'

interface LinkPreviewProps {
  url: string
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>> // 로딩 상태 설정 함수
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, setImageLoading }) => {
  const [metaData, setMetaData] = useState<{
    title?: string
    description?: string
    image?: string
  }>({})

  useEffect(() => {
    console.log(true)
    const fetchMetaData = async () => {
      try {
        const response = await fetch(
          `/api/scrape?url=${encodeURIComponent(url)}`
        )
        const data = await response.json()
        setMetaData(data)

        // 이미지가 없을 경우 바로 로딩 종료
        if (!data.image) {
          setImageLoading(false)
        }
      } catch (error) {
        console.error('Error fetching link metadata:', error)
        setImageLoading(false) // 에러 발생 시 로딩 종료
      }
    }

    fetchMetaData()
  }, [url, setImageLoading])

  return (
    <div className='link-preview bg-white border-gray-200 border rounded-md w-4/5'>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        {metaData.image && (
          <img
            src={metaData.image}
            alt={metaData.title}
            className='thumbnail w-full h-auto rounded-t-md object-cover'
            onLoad={() => setImageLoading(false)} // 이미지 로드 완료 후 로딩 종료
            onError={() => setImageLoading(false)} // 이미지 로드 실패 시에도 로딩 종료
          />
        )}
        <div className='flex flex-col p-3'>
          <h4 className='text-black break-all'>{metaData.title || ''}</h4>
          <p className='text-sm text-gray-500 break-all '>
            {metaData.description || ''}
          </p>
        </div>
      </a>
    </div>
  )
}

export default LinkPreview
