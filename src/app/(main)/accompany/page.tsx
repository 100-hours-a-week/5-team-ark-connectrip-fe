'use client'
import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import SearchIcon from '../../components/Icon/SearchIcon'
import PostCard from '../../components/PostCard'
import { mockData } from '../../data/mockData'
import { UpCircleFilled } from '@ant-design/icons'

export default function Home() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  // URL에서 디코딩된 query 값을 가져옴
  const query = decodeURIComponent(searchParams.get('query') || '')

  // 실시간으로 입력된 검색어를 상태로 관리
  const [searchQuery, setSearchQuery] = useState(query)

  // 검색어가 변경될 때마다 URL 쿼리를 업데이트
  const handleSearch = useDebouncedCallback((term) => {
    const encodedTerm = encodeURIComponent(term)
    const params = new URLSearchParams(searchParams)
    if (encodedTerm) {
      params.set('query', encodedTerm)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300) // 300ms의 지연 시간

  // 게시글 클릭 시 상세 페이지로 이동
  const handleCardClick = (id: number) => {
    router.push(`/accompany/${id}`)
  }

  // 페이지 상단으로 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='w-full p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-lg font-bold text-black'>동행 게시판</h1>
      </div>

      <div className='flex items-center mb-2 gap-2 h-[40px]'>
        <div className='flex items-center w-full h-[40px] border-2 border-main p-2 rounded-full flex-grow box-sizing: border-box;'>
          <SearchIcon />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleSearch(e.target.value)
            }}
            placeholder='게시글 검색'
            className='w-full pl-2 border-none outline-none text-sm '
          />
        </div>
        <button
          onClick={() => router.push('/accompany/create')}
          className='bg-main text-white px-3 py-2 rounded-full flex-shrink-0 text-s h-[40px]'
          style={{ height: '100%' }}
        >
          게시글 등록 +
        </button>
      </div>
      <button
        className='fixed right-[10%] bottom-[10%] bg-white rounded-full cursor-pointer'
        onClick={scrollToTop}
      >
        <UpCircleFilled style={{ color: 'var(--main)', fontSize: '30px' }} />
      </button>

      {/* 페이지 콘텐츠 */}
      <div className='container mx-auto mt-4 mb-10'>
        {mockData.map((post) => (
          <div key={post.id} onClick={() => handleCardClick(post.id)}>
            <PostCard
              title={post.title}
              content={post.content}
              startDate={post.start_date}
              endDate={post.end_date}
              accompanyArea={post.accompany_area}
              createdAt={post.created_at}
              nickname={post.nickname}
              profileImagePath={post.profile_image_path}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
