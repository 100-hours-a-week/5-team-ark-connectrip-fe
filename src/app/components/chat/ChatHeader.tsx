import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import MenuDrawer from '@/app/components/chat/MenuDrawer'
import { useRouter } from 'next/navigation'
import { ChatRoomEntryData } from '@/interfaces/index'

interface ChatHeaderProps {
  chatRoomData: ChatRoomEntryData | null
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatRoomData }) => {
  const router = useRouter()

  return (
    <div className='fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] h-12 bg-white shadow-md z-10'>
      <div className='w-full h-full flex items-center justify-between p-4'>
        <div
          onClick={() => router.back()}
          className='text-sm cursor-pointer text-secondary hover:text-black'
        >
          <LeftOutlined style={{ fontSize: 20 }} />
        </div>
        {chatRoomData && <MenuDrawer chatRoomData={chatRoomData} />}
      </div>
    </div>
  )
}

export default ChatHeader
