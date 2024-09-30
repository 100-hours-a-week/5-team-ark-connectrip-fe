'use client'
import React, { useEffect, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Client, IMessage } from '@stomp/stompjs'
import useAuthStore from '@/app/store/useAuthStore'
import useNotificationStore from '@/app/store/useNotificationStore'

const WebSocketProvider: React.FC = () => {
  const userId = useAuthStore((state) => state.userId)
  const addNotification = useNotificationStore((state) => state.addNotification)
  const clientRef = useRef<Client | null>(null)
  // const subscriptionRef = useRef<StompSubscription | null>(null) // 구독 참조 추가
  console.log(userId)

  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/ws/init`)
    const client = new Client({
      // SockJS를 사용하여 WebSocket 연결 생성
      webSocketFactory: () => socket as WebSocket,
      // 연결 성공 시 호출되는 콜백
      onConnect: (frame) => {
        if (!client || !userId) return
        console.log('Connected: ' + frame)
        console.log(userId)
        client.subscribe(
          `/sub/member/notification/${userId}`,
          (message: IMessage) => {
            const body = JSON.parse(message.body)
            if (body) {
              addNotification(body)
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

    // 클린업 함수: 컴포넌트 언마운트 시 구독 해제 및 연결 해제
    return () => {
      if (clientRef.current) {
        // 컴포넌트가 언마운트되면 클라이언트 연결 해제
        clientRef.current.deactivate()
      }
    }
  }, [userId, addNotification])

  return null
}

export default WebSocketProvider
