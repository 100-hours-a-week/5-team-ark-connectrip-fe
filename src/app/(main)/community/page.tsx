'use client'
import React, { useState, useEffect } from 'react'
import SearchBar from '@/app/components/accompany/SearchBar'
import PostList from '@/app/components/accompany/PostList'
import ScrollToTopButton from '@/app/components/accompany/ScrollToTopButton'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import CommunityCard from '@/app/components/community/CommunityCard'
import { api } from '@/app/utils/api'
import { PrevPost } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { Pagination } from 'antd'

export default function CommunityHome() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PrevPost[]>([])
  const [current, setCurrent] = useState(1)
  const [totalLength, setTotalLength] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = searchQuery
          ? await api.get(
              `/api/v1/community/posts/search?query=${encodeURIComponent(searchQuery)}`
            )
          : await api.get(`/api/v1/community/posts?page=${current}`)
        const { totalCommunityPosts, communityPosts } = data
        setPosts(communityPosts)
        setTotalLength(totalCommunityPosts) // 총 게시글 수 저장
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery, current])

  const handleCardClick = (id: number) => {
    router.push(`/community/${id}`)
  }

  const onChange = (page: number) => {
    setCurrent(page)
    window.scrollTo({ top: 0, behavior: 'auto' }) // 페이지네이션 변경 시 상단으로 스크롤
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className='w-full p-6 mb-6'>
      <div className='flex items-center justify-between mt-1 mb-4'>
        <h1 className='text-lg font-bold text-black mx-1'>커뮤니티 게시판</h1>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PostList
        posts={posts}
        onPostClick={handleCardClick}
        PostComponent={CommunityCard}
      />
      <div className='flex justify-center items-center mb-6'>
        <Pagination
          current={current}
          onChange={onChange}
          pageSize={10}
          total={totalLength}
          showSizeChanger={false}
        />
      </div>
      <ScrollToTopButton />
    </div>
  )
}
