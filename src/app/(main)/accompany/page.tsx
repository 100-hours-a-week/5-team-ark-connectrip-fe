'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import SearchIcon from '@/app/components/Icon/SearchIcon'
import PostCard from '@/app/components/accompany/PostCard'
import { mockData } from '@/app/data/mockData'
import { UpCircleFilled } from '@ant-design/icons'
import SuspenseWrapper from '@/app/components/common/SuspenseWrapper'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'

export default function Home() {
  // Next.js의 라우터 및 경로 관련 훅들
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  // URL에서 디코딩된 query 값을 가져옴
  const query = decodeURIComponent(searchParams.get('query') || '')

  // 검색어 및 로딩 상태를 관리하는 상태 변수
  const [searchQuery, setSearchQuery] = useState(query)
  const [loading, setLoading] = useState(true)

  // 컴포넌트가 마운트되었을 때 2초 동안 로딩 스피너를 보여줌
  useEffect(() => {
    // 2초의 지연 시간 설정
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearTimeout(timer)
  }, [])

  // 사용자가 검색어를 입력하면 URL 쿼리 파라미터를 업데이트하는 함수
  const handleSearch = useDebouncedCallback((term) => {
    const encodedTerm = encodeURIComponent(term)
    const params = new URLSearchParams(searchParams)
    if (encodedTerm) {
      params.set('query', encodedTerm)
    } else {
      params.delete('query')
    }
    // URL을 업데이트
    router.replace(`${pathname}?${params.toString()}`)
  }, 300) // 300ms의 디바운스 적용

  // 게시글 카드를 클릭했을 때 해당 게시글의 상세 페이지로 이동
  const handleCardClick = (id: number) => {
    router.push(`/accompany/${id}`)
  }

  // 페이지 상단으로 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 로딩 중일 때 로딩 스피너를 표시
  if (loading) {
    return <LoadingSpinner />
  }

  return (
    // SuspenseWrapper를 사용하여 비동기 처리 시 로딩 스피너를 자동으로 보여줌
    <SuspenseWrapper>
      <div className='w-full p-6'>
        {/* 페이지 헤더 */}
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-lg font-bold text-black'>동행 게시판</h1>
        </div>

        {/* 검색 바와 게시글 등록 버튼 */}
        <div className='flex items-center mb-2 gap-2 h-[40px]'>
          <div className='flex items-center w-full h-[40px] border-2 border-main p-2 rounded-full flex-grow'>
            <SearchIcon />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleSearch(e.target.value)
              }}
              placeholder='게시글 검색'
              className='w-full pl-2 border-none outline-none text-sm'
            />
          </div>
          <button
            onClick={() => router.push('/accompany/create')}
            className='bg-main text-white px-3 py-2 rounded-full flex-shrink-0 text-s h-[40px]'
          >
            게시글 등록 +
          </button>
        </div>

        {/* 페이지 상단으로 이동 버튼 */}
        <button
          className='fixed right-[10%] bottom-[10%] bg-white rounded-full cursor-pointer'
          onClick={scrollToTop}
        >
          <UpCircleFilled style={{ color: 'var(--main)', fontSize: '30px' }} />
        </button>

        {/* 게시글 리스트 */}
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
    </SuspenseWrapper>
  )
}
