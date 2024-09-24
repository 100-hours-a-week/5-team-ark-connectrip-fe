'use client'
import React, { useState, useEffect } from 'react'
import { api } from '@/app/utils/api'
import { PrevPost } from '@/interfaces'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import PostList from '@/app/components/accompany/PostList'
import PostCard from '@/app/components/accompany/PostCard'
import { useRouter } from 'next/navigation'
import SearchBar from '@/app/components/accompany/SearchBar' // SearchBar 컴포넌트 임포트
import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'

export default function AccompanyPostClient() {
  const [searchQuery, setSearchQuery] = useState('') // 검색어 상태 관리
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
              `/api/v1/accompany/posts/search?query=${encodeURIComponent(searchQuery)}`
            )
          : await api.get(`/api/v1/accompany/posts?page=${current}`)
        const { totalAccompanyPosts, accompanyPosts } = data
        setPosts(accompanyPosts)
        setTotalLength(totalAccompanyPosts) // 총 게시글 수 저장
        setLoading(false)
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery, current])

  const handleCardClick = (id: number) => {
    router.push(`/accompany/${id}`)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page)
    setCurrent(page)
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* 검색 바 추가 */}
      <PostList
        posts={posts}
        onPostClick={handleCardClick}
        PostComponent={PostCard}
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
    </div>
  )
}
