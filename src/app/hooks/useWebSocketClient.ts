import { useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

export const useWebSocketClient = (chatRoomId: number) => {
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/ws/init`)
    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        clientRef.current = client
      },
      onStompError: (error) => {
        console.error('STOMP error:', error)
      },
    })
    client.activate()

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate()
      }
    }
  }, [chatRoomId])

  return clientRef
}
