'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchIcon from '../../components/Icon/SearchIcon'
import PostCard from '../../components/PostCard'
import { mockData } from '../../data/mockData'

export default function Home() {
  const [query, setQuery] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const handleSearch = () => {
    router.push(`/?query=${query}&page=${currentPage}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='w-full p-6  '>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-lg font-bold text-black'>동행 게시판</h1>
      </div>

      <div className='flex items-center mb-2 gap-2 h-[40px]'>
        <div className='flex items-center w-full h-[40px] border-2 border-main p-2 rounded-full flex-grow 	box-sizing: border-box;'>
          <SearchIcon />
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // Enter 키를 감지하기 위한 이벤트 핸들러 추가
            onKeyDown={handleKeyDown}
            placeholder='게시글 검색'
            className='w-full pl-2 border-none outline-none text-sm '
          />
        </div>
        <button
          onClick={() => router.push('/create-post')}
          className='bg-main text-white px-3 py-2 rounded-full flex-shrink-0 text-s h-[40px]'
          style={{ height: '100%' }}
        >
          게시글 등록 +
        </button>
      </div>

      {/* 페이지 콘텐츠 */}
      <div className='container mx-auto mt-4 mb-10'>
        {mockData.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            startDate={post.start_date}
            endDate={post.end_date}
            accompanyArea={post.accompany_area}
            createdAt={post.created_at}
            nickname={post.nickname}
            profileImagePath={post.profile_image_path}
          />
        ))}
      </div>
    </div>
  )
}
