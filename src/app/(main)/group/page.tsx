'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockData } from '@/app/data/mockDataGroup'
import SuspenseWrapper from '@/app/components/common/SuspenseWrapper'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import GroupCard from '@/app/components/group/GroupCard'

export default function Home() {
  const router = useRouter()
  // 로딩 상태를 관리하는 상태 변수
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

  // 게시글 카드를 클릭했을 때 해당 게시글의 상세 페이지로 이동
  const handleCardClick = (id: number) => {
    router.push(`/group/${id}`)
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
          <h1 className='text-lg font-bold text-black'>내 채팅 목록</h1>
        </div>

        {/* 게시글 리스트 */}
        <div className='container mx-auto mt-4 mb-10'>
          {mockData.map((post) => (
            <div key={post.id} onClick={() => handleCardClick(post.id)}>
              <GroupCard
                content={post.content}
                startDate={post.startDate}
                endDate={post.endDate}
                accompanyArea={post.accompanyArea}
                lastChatMessage={post.lastChatMessage}
                lastChatMessageTime={post.lastChatMessageTime}
                memberNumber={post.memberNumber}
              />
            </div>
          ))}
        </div>
      </div>
    </SuspenseWrapper>
  )
}
