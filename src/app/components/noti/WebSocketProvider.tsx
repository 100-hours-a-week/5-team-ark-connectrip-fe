// components/WebSocketProvider.tsx
'use client'
import React, { useEffect } from 'react'
import SockJS from 'sockjs-client'
import { Client, IMessage, StompSubscription } from '@stomp/stompjs'
import useAuthStore from '@/app/store/useAuthStore'
import useNotificationStore from '@/app/store/useNotificationStore'

const WEBSOCKET_ENDPOINT =
  process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT ||
  'https://connectrip.travel/ws/init'

const WebSocketProvider: React.FC = () => {
  const userId = useAuthStore((state) => state.userId)
  const addNotification = useNotificationStore((state) => state.addNotification)
  const clientRef = React.useRef<Client | null>(null)

  useEffect(() => {
    if (userId) {
      const client = new Client({
        // SockJS를 사용하여 WebSocket 연결 생성
        webSocketFactory: () => new SockJS(WEBSOCKET_ENDPOINT) as WebSocket,

        // 연결 성공 시 호출되는 콜백
        onConnect: (frame) => {
          console.log('Connected: ' + frame)

          // 구독할 경로 설정
          const subscription: StompSubscription = client.subscribe(
            `/sub/member/notification/${userId}`,
            (message: IMessage) => {
              if (message.body) {
                try {
                  const data = JSON.parse(message.body)
                  console.log('Received message:', data)

                  addNotification({
                    id: data.id,
                    type: data.type,
                    chatRoomId: data.chatRoomId,
                    senderId: data.senderId,
                    chatRoomTitle: data.chatRoomTitle,
                    senderNickname: data.senderNickname,
                    senderProfileImage: data.senderProfileImage,
                    content: data.content,
                    infoFlag: data.infoFlag,
                    createdAt: data.createdAt,
                  })
                } catch (error) {
                  console.error('메시지 파싱 오류:', error)
                }
              }
            }
          )
        },

        // STOMP 오류 시 호출되는 콜백
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message'])
          console.error('Additional details: ' + frame.body)
        },

        // 재연결 설정 (옵션)
        reconnectDelay: 5000, // 5초 후 재연결 시도
      })

      client.activate()
      clientRef.current = client

      // 클린업 함수: 컴포넌트 언마운트 시 연결 해제
      return () => {
        if (clientRef.current) {
          clientRef.current.deactivate()
          console.log('Disconnected')
        }
      }
    }
  }, [userId, addNotification])

  return null
}

export default WebSocketProvider
