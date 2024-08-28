'use client'
import React, { useState, useEffect } from 'react'
import SearchBar from '@/app/components/accompany/SearchBar'
import PostList from '@/app/components/accompany/PostList'
import ScrollToTopButton from '@/app/components/accompany/ScrollToTopButton'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import CarouselComponent from '@/app/components/accompany/CarouselComponent'
import PostCard from '@/app/components/accompany/PostCard'
import { api } from '@/app/utils/api'
import { PrevPost } from '@/interfaces'
import { useRouter } from 'next/navigation'

export default function AccompanyHome() {
  const [searchQuery, setSearchQuery] = useState('')
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
    <div className='w-full p-6 mb-6'>
      <CarouselComponent />
      <div className='flex items-center justify-between my-4'>
        <h1 className='text-lg font-bold text-black mx-1'>동행 게시판</h1>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PostList
        posts={posts}
        onPostClick={handleCardClick}
        PostComponent={PostCard}
      />
      <ScrollToTopButton />
    </div>
  )
}
