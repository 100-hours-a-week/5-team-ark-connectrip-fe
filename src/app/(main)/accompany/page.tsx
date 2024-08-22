'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import SearchIcon from '@/app/components/Icon/SearchIcon'
import PostCard from '@/app/components/accompany/PostCard'
import { UpCircleFilled } from '@ant-design/icons'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import { api } from '@/app/utils/api'

// 게시글 타입 정의
interface Post {
  id: number
  title: string
  content: string
  startDate: string
  endDate: string
  accompanyArea: string
  createdAt: string
  nickname: string
  profileImagePath: string | null
}

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
  const [posts, setPosts] = useState<Post[]>([]) // Post 타입의 배열로 상태 정의

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (searchQuery) {
          // 검색어가 있는 경우, 검색 API 호출
          const data: Post[] = await api.get(
            `/api/v1/accompany/posts/search?query=${encodeURIComponent(searchQuery)}`
          )
          setPosts(data)
        } else {
          // 검색어가 없을 때는 전체 게시글을 불러옴
          const data: Post[] = await api.get('/api/v1/accompany/posts')
          setPosts(data)
        }
        setLoading(false)
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery])

  // 사용자가 검색어를 입력하면 URL 쿼리 파라미터를 업데이트하는 함수
  const handleSearch = useDebouncedCallback((term: string) => {
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
        {posts.map((post) => (
          <div key={post.id} onClick={() => handleCardClick(post.id)}>
            <PostCard
              title={post.title}
              content={post.content}
              startDate={post.startDate}
              endDate={post.endDate}
              accompanyArea={post.accompanyArea}
              createdAt={post.createdAt}
              nickname={post.nickname}
              profileImagePath={post.profileImagePath}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
