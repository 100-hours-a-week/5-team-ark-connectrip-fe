import React from 'react'
import MyChatContainer from '@/app/components/chat/MyChatContainer'
import LeftChatContainer from '@/app/components/chat/LeftChatContainer'
import DateSeparator from '@/app/components/chat/DateSeperator'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Message } from '@/interfaces/index'

interface MessageListProps {
  messages: Message[]
  userId: string
}

function formatWithMeridiem(date: Date) {
  const hours = date.getHours()
  const meridiem = hours < 12 ? '오전' : '오후'
  return `${meridiem} ${format(date, 'h:mm', { locale: ko })}`
}

// 재렌더링 최적화를 위해 React.memo로 감싸기
const MessageList: React.FC<MessageListProps> = React.memo(
  ({ messages, userId }) => {
    let lastDate = ''
    return (
      <>
        {messages.map((msg) => {
          const currentDate = format(new Date(msg.createdAt), 'yyyy-MM-dd')
          const showDateSeparator = currentDate !== lastDate
          lastDate = currentDate

          return (
            <div
              key={msg.id}
              className='flex flex-col w-full px-4 py-1 items-center justify-center '
            >
              {/* 날짜 구분선을 표시 */}
              {showDateSeparator && <DateSeparator date={msg.createdAt} />}
              {/* 채팅 메시지 표시 */}
              {msg.infoFlag ? (
                <div className='flex items-center justify-center gap-1 text-xs text-white bg-[rgba(0,0,0,0.2)] p-1 px-2 rounded-full my-2 mt-3'>
                  {msg.content}
                </div>
              ) : msg.senderId == userId ? (
                <MyChatContainer
                  message={msg.content}
                  time={formatWithMeridiem(new Date(msg.createdAt))}
                />
              ) : (
                <LeftChatContainer
                  message={msg.content}
                  time={formatWithMeridiem(new Date(msg.createdAt))}
                  senderNickname={msg.senderNickname}
                  senderId={msg.senderId}
                  profileSrc={msg.senderProfileImage}
                />
              )}
            </div>
          )
        })}
      </>
    )
  }
)

export default MessageList
