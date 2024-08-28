'use client'

import React, { useEffect, useRef } from 'react'
import MyChatContainer from '@/app/components/chat/MyChatContainer'
import LeftChatContainer from '@/app/components/chat/LeftChatContainer'
import DateSeparator from '@/app/components/chat/DateSeperator'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

// 예시 데이터
const messages = [
  {
    id: '66bf09f471faff02a7e52525',
    roomId: 1,
    senderId: 1,
    message: '안녕하세요!',
    createdAt: '2024-08-16T17:12:36',
    nickname: '세니',
    profileImagePath: 'https://example.com/profiles/user1.png',
  },
  {
    id: '66bf09fd71faff02a7e52526',
    roomId: 1,
    senderId: 2,
    message: '반가워요!',
    createdAt: '2024-08-16T17:14:22',
    nickname: '유리',
    profileImagePath: 'https://example.com/profiles/user2.png',
  },
  {
    id: '66bf0a0171faff02a7e52527',
    roomId: 1,
    senderId: 1,
    message:
      '오늘 날씨 정말 좋네요. 오늘 날씨 정말 좋네요. 오늘 날씨 정말 좋네요. 오늘 날씨 정말 좋네요. 오늘 날씨 정말 좋네요. 오늘 날씨 정말 좋네요. 오늘 날씨 정말 좋네요. 오늘 날씨 정말 좋네요.',
    createdAt: '2024-08-16T17:15:30',
    nickname: '세니',
    profileImagePath: 'https://example.com/profiles/user1.png',
  },
  {
    id: '66bf0a0571faff02a7e52528',
    roomId: 1,
    senderId: 2,
    message: '그러게요! 산책하기 딱 좋은 날씨예요.',
    createdAt: '2024-08-16T17:16:45',
    nickname: '유리',
    profileImagePath: 'https://example.com/profiles/user2.png',
  },
  {
    id: '66bf0a0b71faff02a7e52529',
    roomId: 1,
    senderId: 1,
    message: '산책 같이 가실래요?',
    createdAt: '2024-08-17T17:18:00',
    nickname: '세니',
    profileImagePath: 'https://example.com/profiles/user1.png',
  },
  {
    id: '66bf0a1271faff02a7e52530',
    roomId: 1,
    senderId: 2,
    message:
      '좋아요! 어디서 만날까요? 좋아요! 어디서 만날까요? 좋아요! 어디서 만날까요? 좋아요! 어디서 만날까요? 좋아요! 어디서 만날까요? 좋아요! 어디서 만날까요? 좋아요! 어디서 만날까요? 좋아요! 어디서 만날까요?',
    createdAt: '2024-08-18T17:19:10',
    nickname: '유리',
    profileImagePath: 'https://example.com/profiles/user2.png',
  },
  {
    id: '66bf0a1771faff02a7e52531',
    roomId: 1,
    senderId: 1,
    message:
      '저희 동네 근처 공원 어때요? 저희 동네 근처 공원에서 만나는 건 어떤가요? 공원이 넓고 예뻐서 산책하기 좋을 것 같아요. 평소에도 자주 산책하곤 하는데, 이번에는 같이 가면 좋을 것 같아요!',
    createdAt: '2024-08-18T17:20:45',
    nickname: '세니',
    profileImagePath: 'https://example.com/profiles/user1.png',
  },
  {
    id: '66bf0a1c71faff02a7e52532',
    roomId: 1,
    senderId: 2,
    message:
      '좋아요! 저도 공원 가는 거 좋아해요. 그럼 몇 시쯤 만날까요? 아침이나 저녁이 좋을 것 같은데, 세니님은 언제가 편하세요? 저는 오후에 시간이 조금 애매해서 아침이나 저녁이 더 좋을 것 같아요!',
    createdAt: '2024-08-18T17:21:55',
    nickname: '유리',
    profileImagePath: 'https://example.com/profiles/user2.png',
  },
  {
    id: '66bf0a2171faff02a7e52533',
    roomId: 1,
    senderId: 1,
    message:
      '저도 저녁이 좋을 것 같아요! 해질 무렵에 공원에서 만나서 산책하면서 얘기 나누면 좋을 것 같아요. 그때쯤 바람도 시원하게 불고 분위기도 좋을 것 같아요. 저녁 6시쯤 어떠세요?',
    createdAt: '2024-08-18T17:23:30',
    nickname: '세니',
    profileImagePath: 'https://example.com/profiles/user1.png',
  },
  {
    id: '66bf0a2171faff02a7e52537',
    roomId: 1,
    senderId: 1,
    message:
      ' 바람도 시원하게 불고 분위기도 좋을 것 같아요. 저녁 6시쯤 어떠세요?',
    createdAt: '2024-08-18T17:23:30',
    nickname: '세니',
    profileImagePath: 'https://example.com/profiles/user1.png',
  },
  {
    id: '66bf0a2671faff02a7e52534',
    roomId: 1,
    senderId: 2,
    message:
      '네! 6시 좋아요. 그럼 공원 입구에서 만날까요? 저는 집에서 가깝기도 하고, 거기서부터 산책로가 시작되니까 딱 좋을 것 같아요. 그리고 날씨만 좋으면 아주 기분 좋은 시간이 될 것 같네요!',
    createdAt: '2024-08-18T17:25:00',
    nickname: '유리',
    profileImagePath: 'https://example.com/profiles/user2.png',
  },
  {
    id: '66bf0a2b71faff02a7e52535',
    roomId: 1,
    senderId: 1,
    message:
      '좋아요! 그럼 내일 6시에 공원 입구에서 봬요. 즐거운 시간 보내요! 😊',
    createdAt: '2024-08-18T17:26:20',
    nickname: '세니',
    profileImagePath: 'https://example.com/profiles/user1.png',
  },
]

//오전/오후 형식으로 시간 변환
function formatWithMeridiem(date: Date) {
  const hours = date.getHours()
  const meridiem = hours < 12 ? '오전' : '오후'
  return `${meridiem} ${format(date, 'h:mm', { locale: ko })}`
}

export default function GroupDetailPage() {
  let lastDate = '' // 마지막으로 표시된 날짜를 저장
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 페이지 로드 시 맨 아래로 스크롤
    bottomRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [])

  return (
    <div className='bg-white w-full h-full mb-[110px] mt-[-20px]'>
      {messages.map((msg) => {
        const currentDate = format(new Date(msg.createdAt), 'yyyy-MM-dd')
        const showDateSeparator = currentDate !== lastDate
        lastDate = currentDate

        return (
          <div
            key={msg.id}
            className='flex flex-col w-full px-4 py-1 items-center justify-center'
          >
            {/* 날짜 구분선을 표시 */}
            {showDateSeparator && <DateSeparator date={msg.createdAt} />}
            {/* 채팅 메시지 표시 */}
            {msg.senderId === 1 ? (
              <MyChatContainer
                message={msg.message}
                time={formatWithMeridiem(new Date(msg.createdAt))}
              />
            ) : (
              <LeftChatContainer
                message={msg.message}
                time={formatWithMeridiem(new Date(msg.createdAt))}
                nickname='세니'
                profileSrc=''
              />
            )}
          </div>
        )
      })}
      {/* 스크롤이 이동할 위치 */}
      <div ref={bottomRef}></div>
      <div className='px-4 py-2 fixed w-full max-w-[500px] bg-white bottom-[60px] z-10'>
        <div className='flex items-center w-full'>
          <input
            type='text'
            // value={newComment}
            placeholder='메시지를 입력하세요.'
            // onChange={(e) => setNewComment(e.target.value)}
            className='flex-1 w-full h-[35px] p-2 px-4 border border-gray-300 rounded-full focus:border-sub focus:border-2 outline-none'
          />
          <button
            className='ml-3 h-[35px] bg-sub text-white py-0 px-5 rounded-full text-sm whitespace-nowrap'
            // onClick={handleCommentSubmit}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  )
}
