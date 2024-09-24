'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  checkChatRoomEntry,
  getPreviousMessages,
  fetchLocations,
} from '@/app/utils/fetchUtils'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { useRouter, usePathname } from 'next/navigation'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import useAuthStore from '@/app/store/useAuthStore'
import ChatHeader from '@/app/components/chat/ChatHeader'
import MessageList from '@/app/components/chat/MessageList'
import ChatInput from '@/app/components/chat/ChatInput'
import {
  ChatRoomEntryData,
  ChatRoomMemberLocation,
  CompanionLocation,
} from '@/interfaces/index'
import { useChatWebSocket } from '@/app/hooks/useChatWebSocket'

export default function ChatDetailPage() {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomEntryData | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [isScroll, setIsScroll] = useState(false)
  const { contextHolder, showWarning } = useCustomMessage()
  const router = useRouter()
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)
  const [isMember, setIsMember] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [companionLocations, setCompanionLocations] = useState<
    CompanionLocation[]
  >([])
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] =
    useState(false)
  const [content, setContent] = useState('')
  // 메시지 하단 스크롤 제어를 위한 Ref
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // 무한 스크롤 상단 메시지 감지를 위한 Ref
  const observerRef = useRef<HTMLDivElement>(null)
  const { userId } = useAuthStore()
  // 채팅방 WebSocket 커스텀 훅 사용
  const { messages, setMessages, sendMessage } = useChatWebSocket(
    chatRoomId,
    userId || ''
  )
  // 무한 스크롤 위한 첫 메시지 ID 상태
  const [firstMessageId, setFirstMessageId] = useState<string>('first')
  // 메시지 로딩 시 스크롤 제어
  useEffect(() => {
    if (isScroll) {
      setIsScroll(false)
    } else if (!loading) scrollToBottom()
  }, [messages, loading])

  // 이전 메시지 로드
  const loadPreviousMessages = useCallback(async () => {
    try {
      if (!firstMessageId) return
      const previousMessages = await getPreviousMessages(
        chatRoomId,
        firstMessageId
      )
      if (previousMessages.length > 0) {
        setIsScroll(true)
        setMessages((prev) => [...previousMessages, ...prev]) // 이전 메시지 추가
        setFirstMessageId(previousMessages[0].messageId)
      }
    } catch (error) {
      console.error('이전 메시지를 불러오는 중 오류 발생:', error)
    }
  }, [chatRoomId, firstMessageId, setMessages])

  // IntersectionObserver로 상단 메시지 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('상단에 도달하여 이전 메시지를 로드합니다.')
          loadPreviousMessages()
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loadPreviousMessages])

  // 이전 메시지 및 동행 위치 정보 로드
  const fetchChatRoomDataAll = async (firstMessageId: string) => {
    try {
      const [previousMessages, locationData] = await Promise.all([
        getPreviousMessages(chatRoomId, firstMessageId),
        fetchLocations(chatRoomId),
      ])

      setMessages(previousMessages)
      setFirstMessageId(previousMessages[0].id)

      if (locationData && locationData.isLocationSharingEnabled) {
        setIsLocationSharingEnabled(true)
        const members: CompanionLocation[] =
          locationData.chatRoomMemberLocations.map(
            (member: ChatRoomMemberLocation) => ({
              lat: member.lastLocation.lat,
              lng: member.lastLocation.lng,
              nickname: member.nickname,
              profileImagePath: member.profileImagePath || '',
            })
          )
        setCompanionLocations(members)
      } else {
        setIsLocationSharingEnabled(false)
        setCompanionLocations([])
      }
    } catch (error) {
      console.error('데이터 로딩 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    const fetchChatRoomData = async () => {
      try {
        if (isNaN(chatRoomId) || chatRoomId === 0) {
          setErrorMessage('잘못된 채팅방 ID입니다.')
          return
        }

        const response = await checkChatRoomEntry(chatRoomId)
        if (response.message === 'SUCCESS') {
          setChatRoomData(response.data)
          setIsMember(true)
          await fetchChatRoomDataAll(firstMessageId)
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

  // 메시지 스크롤 제어
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }

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
          <ChatHeader
            chatRoomData={chatRoomData}
            setCompanionLocations={setCompanionLocations}
            companionLocations={companionLocations}
            isLocationSharingEnabled={isLocationSharingEnabled}
          />
          <div className='bg-white w-full h-full mb-[110px] mt-[-20px] overflow-y-auto'>
            <div ref={observerRef} /> {/* 상단 메시지 감지를 위한 Ref */}
            <MessageList messages={messages} userId={userId || ''} />
            <div ref={messagesEndRef}></div>
            <ChatInput
              content={content}
              setContent={setContent}
              onSendMessage={() => {
                sendMessage(content)
                setContent('')
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
