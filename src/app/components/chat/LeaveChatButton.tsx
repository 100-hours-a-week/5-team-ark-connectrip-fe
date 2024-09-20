// LeaveChatButton.tsx
import { Button } from 'antd'
import { handleLeaveGroup } from '@/app/utils/locationUtils'
import { LeaveChatButtonProps } from '@/interfaces'

const LeaveChatButton: React.FC<LeaveChatButtonProps> = ({
  handleDeleteClick,
  chatRoomId,
  userId,
  nickname,
  clientRef,
  showSuccess,
}) => {
  const onLeaveClick = () => {
    handleDeleteClick('채팅방', '/chat', () =>
      handleLeaveGroup({
        clientRef,
        chatRoomId,
        userId,
        nickname,
        showSuccess,
      })
    )
  }

  return (
    <Button type='primary' className='w-full' onClick={onLeaveClick}>
      채팅방 나가기
    </Button>
  )
}

export default LeaveChatButton
