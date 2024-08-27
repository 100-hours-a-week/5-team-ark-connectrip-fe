// chat/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import SuspenseWrapper from '@/app/components/common/SuspenseWrapper'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
// import GroupCard from '@/app/components/chat/GroupCard'
// import { api } from '@/app/utils/api'
// import { Chat } from '@/interfaces'
import ServicePreparation from '@/app/components/common/ServicePreparation'

export default function Home() {
  // const router = useRouter()
  // 로딩 상태를 관리하는 상태 변수
  const [loading, setLoading] = useState(true)
  // const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // 채팅 목록을 가져오는 API 호출
        // const data: Chat[] = await api.get('/api/v1/chatRoom/list')
        // setChats(data)
        setLoading(false)
      } catch (error) {
        console.error('채팅 목록을 가져오는 중 오류 발생:', error)
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  // 게시글 카드를 클릭했을 때 해당 게시글의 상세 페이지로 이동
  // const handleCardClick = (id: number) => {
  //   router.push(`/chat/${id}`)
  // }

  // 로딩 중일 때 로딩 스피너를 표시
  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <ServicePreparation />
    // SuspenseWrapper를 사용하여 비동기 처리 시 로딩 스피너를 자동으로 보여줌
    // <SuspenseWrapper>
    //   <div className='w-full p-6'>
    //     {/* 페이지 헤더 */}
    //     <div className='flex items-center justify-between mb-4'>
    //       <h1 className='text-lg font-bold text-black'>내 채팅 목록</h1>
    //     </div>

    //     {!chats.length && (
    //       <div className='flex justify-center items-center h-[200px] text-center text-gray-600'>
    //         <p>
    //           동행 게시판에서 동행을 구해보세요! <br /> 채팅이 시작됩니다.
    //         </p>
    //       </div>
    //     )}

    //     {/* 게시글 리스트 */}
    //     <section className='container mx-auto mt-4 mb-10'>
    //       {chats.map((chat, index) => (
    //         <div
    //           key={`${chat.chatRoomId}-${chat.memberNumber || 'default'}-${index}`} // memberNumber가 없을 경우 기본값 사용
    //           onClick={() => handleCardClick(chat.chatRoomId)}
    //         >
    //           {/* memberNumber가 없는 경우 기본값을 표시 */}
    //           <GroupCard {...chat} memberNumber={chat.memberNumber || 0} />
    //         </div>
    //       ))}
    //     </section>
    //   </div>
    // </SuspenseWrapper>
  )
}
