'use client'

import React, { useEffect, useRef, useState } from 'react'
import { checkChatRoomEntry, getPreviousMessages } from '@/app/utils/fetchUtils'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { useRouter, usePathname } from 'next/navigation'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import useAuthStore from '@/app/store/useAuthStore'
import ChatHeader from '@/app/components/chat/ChatHeader'
import MessageList from '@/app/components/chat/MessageList'
import ChatInput from '@/app/components/chat/ChatInput'
import { ChatRoomEntryData } from '@/interfaces/index'
import { useChatWebSocket } from '@/app/hooks/useChatWebSocket' // 새로운 훅 import

export default function ChatDetailPage() {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomEntryData | null>(
    null
  )
  const [loading, setLoading] = useState(true) // 로딩 상태 추가
  const { contextHolder, showWarning } = useCustomMessage()
  const router = useRouter()
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)
  const [isMember, setIsMember] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // 입력된 메시지 상태
  const [content, setContent] = useState<string>('')
  // 메시지 리스트의 끝을 참조
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { userId } = useAuthStore()

  // 새로운 훅 사용
  const { messages, setMessages, sendMessage } = useChatWebSocket(
    chatRoomId,
    userId || ''
  )

  // 메시지가 업데이트된 후 실행되는 스크롤 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(() => {
    if (!loading) {
      scrollToBottom()
    }
  }, [messages, loading])

  // 이전 메시지를 불러오는 함수
  const fetchMessages = async () => {
    try {
      const previousMessages = await getPreviousMessages(chatRoomId)
      setMessages(previousMessages) // 가져온 메시지를 상태에 저장
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  useEffect(() => {
    // 이전 메시지 로드
    fetchMessages()
  }, [chatRoomId])

  useEffect(() => {
    const fetchChatRoomData = async () => {
      try {
        if (isNaN(chatRoomId) || chatRoomId === 0) {
          setErrorMessage('잘못된 채팅방 ID입니다.')
          return
        }

        const response = await checkChatRoomEntry(chatRoomId)
        if (response.message === 'SUCCESS' && !response.data.isPostDeleted) {
          setChatRoomData(response.data)
          setIsMember(true)
        } else {
          setErrorMessage('입장 권한이 없습니다.')
        }
      } catch (error) {
        console.error('채팅방 정보를 불러오는 중 오류 발생:', error)
        setErrorMessage('참여 중인 동행 채팅에만 입장할 수 있습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchChatRoomData()
  }, [chatRoomId])

  useEffect(() => {
    if (errorMessage) {
      showWarning(errorMessage)
      router.push('/chat')
    }
  }, [errorMessage, showWarning, router])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      {contextHolder}
      {isMember && (
        <div>
          <ChatHeader chatRoomData={chatRoomData} />
          <div className='bg-white w-full h-full mb-[110px] mt-[-20px]'>
            <MessageList messages={messages} userId={userId || ''} />
            <div ref={messagesEndRef}></div>
            <ChatInput
              content={content}
              setContent={setContent}
              onSendMessage={() => {
                sendMessage(content)
                setContent('') // 메시지 전송 후 입력 필드를 초기화
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
