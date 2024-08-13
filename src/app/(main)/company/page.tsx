'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchIcon from '../../components/Icon/SearchIcon'
import PostCard from '../../components/PostCard'

const mockData = [
  {
    id: 1,
    member_id: 123,
    title: 'Trip to Jeju Island',
    start_date: '2024-08-15',
    end_date: '2024-08-20',
    accompany_area: 'Jeju Island',
    content:
      'Looking for someone to join me on a trip to Jeju Island. Planning to explore the beaches and try local food.',
    created_at: '2024-07-01T10:00:00',
  },
  {
    id: 2,
    member_id: 456,
    title: 'Hiking in Seoraksan',
    start_date: '2024-09-10',
    end_date: '2024-09-12',
    accompany_area: 'Seoraksan',
    content:
      'Looking for an experienced hiker to join me on a hike in Seoraksan.',
    created_at: '2024-07-05T09:00:00',
  },
]

export default function Home() {
  const [query, setQuery] = useState('')
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
    <div className='w-full p-4  '>
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
      <div className='container mx-auto p-4'>
        {mockData.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            startDate={post.start_date}
            accompanyArea={post.accompany_area}
            createdAt={new Date(post.created_at).toLocaleString()}
          />
        ))}
      </div>
    </div>
  )
}
