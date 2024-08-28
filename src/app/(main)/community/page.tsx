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

export default function CommunityHome() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PrevPost[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = searchQuery
          ? await api.get(
              `/api/v1/community/posts/search?query=${encodeURIComponent(searchQuery)}`
            )
          : await api.get('/api/v1/community/posts')
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
    router.push(`/community/${id}`)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className='w-full p-6 mb-6'>
      <div className='flex items-center justify-between my-4'>
        <h1 className='text-lg font-bold text-black mx-1'>커뮤니티 게시판</h1>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PostList
        posts={posts}
        onPostClick={handleCardClick}
        PostComponent={CommunityCard}
      />
      <ScrollToTopButton />
    </div>
  )
}
