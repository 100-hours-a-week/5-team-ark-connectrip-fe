// components/GroupCard.tsx
'use client'

import React, { useState, useEffect } from 'react'
import CalendarIcon from '../Icon/CalendarIcon'
import PinIcon from '../Icon/PinIcon'
import InfoRow from '../accompany/InfoRow'
import { formatShortDateFromUtc } from '../../utils/dateUtils'
import { truncateText } from '../../utils/textUtils'
import { MoreOutlined } from '@ant-design/icons'
import { useTimeStamp } from '../../hooks/useTimeStamp'
import DropdownMenu from '../common/DropdownMenu'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import { leaveChatRoom } from '@/app/utils/fetchUtils'
import { Chat } from '@/interfaces'
import { useWebSocketClient } from '@/app/hooks/useWebSocketClient'
import { sendLeaveMessage } from '@/app/utils/sendLeaveMessage'
import { useCustomMessage } from '@/app/utils/alertUtils'
import useAuthStore from '@/app/store/useAuthStore'
import useNotificationStore from '@/app/store/useNotificationStore'

export default function GroupCard({
  chatRoomId,
  accompanyPostTitle,
  accompanyArea,
  startDate,
  endDate,
  lastChatMessage,
  lastChatMessageTime,
  memberNumber,
  hasUnreadMessages,
}: Chat) {
  const [formattedStartDate, setFormattedStartDate] = useState('')
  const [formattedEndDate, setFormattedEndDate] = useState('')
  const { contextHolder, showSuccess } = useCustomMessage()
  const handleDeleteClick = useHandleDeleteClick() // 모달 호출 유틸리티 사용
  const notifications = useNotificationStore((state) => state.notifications)
  const { nickname, userId } = useAuthStore() // zustand 스토어에서 유저 닉네임 가져오기
  const [newMessageFlag, setNewMessageFlag] = useState(hasUnreadMessages)
  const [newMessage, setNewMessage] = useState(lastChatMessage)
  const [newMessageTime, setNewMessageTime] = useState(lastChatMessageTime)

  useEffect(() => {
    // 새로운 메시지가 있을 때 목록 중 변경사항 Update
    notifications.forEach((notif) => {
      if (notif.chatRoomId === chatRoomId) {
        if (!newMessageFlag) setNewMessageFlag(true)
        setNewMessage(notif.content)
        setNewMessageTime(notif.createdAt)
      }
    })
  }, [notifications])

  useEffect(() => {
    if (startDate && endDate) {
      setFormattedStartDate(formatShortDateFromUtc(startDate))
      setFormattedEndDate(formatShortDateFromUtc(endDate))
    }
  }, [startDate, endDate])

  // WebSocket client 사용
  const clientRef = useWebSocketClient(chatRoomId)

  const handleLeaveGroup = async () => {
    try {
      sendLeaveMessage({ clientRef, chatRoomId, userId, nickname })
      await leaveChatRoom(chatRoomId)
      showSuccess('채팅방에서 나가셨습니다.')
    } catch (error) {
      console.error('채팅방에서나가기 중 오류 발생:', error)
    }
  }

  const menuItems = [
    {
      label: '채팅방 나가기',
      onClick: () => handleDeleteClick('채팅방', '', handleLeaveGroup), // 모달 호출 후 삭제 처리
    },
  ]

  return (
    <div className='bg-white p-4 rounded-lg border-solid border border-[#e7e4e4] hover:border-main flex flex-col mb-4 cursor-pointer'>
      {contextHolder}
      <div className='flex justify-between mb-1'>
        <h2 className='text-lg font-semibold'>{accompanyPostTitle}</h2>
        <div
          onClick={(e) => {
            e.stopPropagation() // 이벤트 전파를 막음
          }}
        >
          <DropdownMenu
            triggerComponent={<MoreOutlined />}
            menuItems={menuItems}
          />
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <InfoRow
          icon={<CalendarIcon />}
          text={
            formattedStartDate && formattedEndDate
              ? `${formattedStartDate}~${formattedEndDate}`
              : '미정'
          }
        />
        <InfoRow icon={<PinIcon />} text={accompanyArea} />
        <div className='text-sm text-secondary'>{memberNumber}</div>
        {newMessageFlag && (
          <div className='text-sm bg-[#ffb1be] px-2 rounded-xl'>
            <span className='text-white text-s'>New</span>
          </div>
        )}
      </div>
      <div className='flex justify-between items-end gap-2 text-sm text-gray-500 mt-1'>
        {lastChatMessage ? (
          <p className='text-sm text-gray-500 break-all'>
            {truncateText(newMessage, 40)}
          </p>
        ) : (
          <p className='text-sm text-gray-500'>
            채팅방이 생성되었습니다. 채팅을 시작해보세요!
          </p>
        )}

        <p className='text-s text-gray-500 whitespace-nowrap'>
          {useTimeStamp(newMessageTime)}
        </p>
      </div>
    </div>
  )
}
