import { Client } from '@stomp/stompjs'

interface SendLeaveMessageParams {
  clientRef: React.MutableRefObject<Client | null>
  chatRoomId: number
  userId: string | null
  nickname: string | null
}

export const sendLeaveMessage = ({
  clientRef,
  chatRoomId,
  userId,
  nickname,
}: SendLeaveMessageParams) => {
  if (clientRef.current?.connected) {
    clientRef.current.publish({
      destination: `/pub/chat/room/${chatRoomId}`,
      body: JSON.stringify({
        chatRoomId: chatRoomId,
        senderId: userId,
        content: `${nickname}님이 나가셨습니다.`,
        infoFlag: true,
      }),
    })
    console.log('Leave message sent')
  }
}
