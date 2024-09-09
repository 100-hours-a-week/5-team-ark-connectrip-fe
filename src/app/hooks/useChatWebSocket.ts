import { useEffect, useRef, useState } from 'react'
import { Client, IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { Message } from '@/interfaces'

export const useChatWebSocket = (chatRoomId: number, userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]) // 메시지 상태 관리
  const clientRef = useRef<Client | null>(null)

  const sendMessage = (content: string) => {
    if (content.trim() && clientRef.current?.connected) {
      clientRef.current.publish({
        destination: `/pub/chat/room/${chatRoomId}`,
        body: JSON.stringify({
          chatRoomId,
          senderId: userId,
          content: content,
        }),
      })
    }
  }

  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/ws/init`)
    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        if (!client || !chatRoomId) return
        client.subscribe(
          `/sub/chat/room/${chatRoomId}`,
          (message: IMessage) => {
            const body = JSON.parse(message.body)
            if (body) {
              setMessages((prevMessages) => [...prevMessages, body])
            }
          }
        )
      },
      onStompError: (error) => {
        console.error('STOMP error:', error)
      },
    })

    client.activate()
    clientRef.current = client

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate()
      }
    }
  }, [chatRoomId])

  return { messages, setMessages, sendMessage, clientRef }
}
