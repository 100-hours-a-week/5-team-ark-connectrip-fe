'use client'
import React, { useState, useEffect } from 'react'
import { api } from '@/app/utils/api'
import { PrevPost } from '@/interfaces'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import PostList from '@/app/components/accompany/PostList'
import PostCard from '@/app/components/accompany/PostCard'
import { useRouter } from 'next/navigation'
import SearchBar from '@/app/components/accompany/SearchBar' // SearchBar 컴포넌트 임포트

export default function AccompanyPostClient() {
  const [searchQuery, setSearchQuery] = useState('') // 검색어 상태 관리
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PrevPost[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = searchQuery
          ? await api.get(
              `/api/v1/accompany/posts/search?query=${encodeURIComponent(searchQuery)}`
            )
          : await api.get('/api/v1/accompany/posts')
        setPosts(data)
        setLoading(false)
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery])

  const handleCardClick = (id: number) => {
    router.push(`/accompany/${id}`)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />{' '}
      {/* 검색 바 추가 */}
      <PostList
        posts={posts}
        onPostClick={handleCardClick}
        PostComponent={PostCard}
      />
    </div>
  )
}
