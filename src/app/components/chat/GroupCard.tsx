// components/GroupCard.tsx
'use client'

import React, { useState, useEffect } from 'react'
import CalendarIcon from '../Icon/CalendarIcon'
import PinIcon from '../Icon/PinIcon'
import InfoRow from '../accompany/InfoRow'
import { formatShortDate } from '../../utils/dateUtils'
import { truncateText } from '../../utils/textUtils'
import { MoreOutlined } from '@ant-design/icons'
import { useTimeStamp } from '../../hooks/useTimeStamp'
import DropdownMenu from '../common/DropdownMenu'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import { GroupCardProps } from '@/interfaces'

export default function GroupCard({
  accompanyPostTitle,
  accompanyArea,
  startDate,
  endDate,
  lastChatMessage,
  lastChatMessageTime,
  memberNumber,
}: GroupCardProps) {
  const [formattedStartDate, setFormattedStartDate] = useState('')
  const [formattedEndDate, setFormattedEndDate] = useState('')
  const handleDeleteClick = useHandleDeleteClick() // 모달 호출 유틸리티 사용

  // useTimeStamp 커스텀 훅 사용
  const timeAgo = useTimeStamp(lastChatMessageTime)

  useEffect(() => {
    setFormattedStartDate(formatShortDate(startDate))
    setFormattedEndDate(formatShortDate(endDate))
  }, [startDate, endDate])

  // 그룹방 나가기 기능을 수행하는 함수
  const handleLeaveGroup = async () => {
    try {
      // TODO : 그룹방 삭제 API 호출
      // await deleteGroup(accompanyPostTitle) // 여기서 accompanyPostTitle을 그룹 식별자(또는 ID)로 사용한다고 가정
    } catch (error) {
      console.error('그룹방 나가기 중 오류 발생:', error)
    }
  }

  const menuItems = [
    {
      label: '그룹방 나가기',
      onClick: () => handleDeleteClick('그룹방', '', handleLeaveGroup), // 모달 호출 후 삭제 처리
    },
  ]

  return (
    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col mb-4 cursor-pointer'>
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
          text={`${formattedStartDate}~${formattedEndDate}`}
        />
        <InfoRow icon={<PinIcon />} text={accompanyArea} />
        <div className='text-sm text-secondary'>{memberNumber}</div>
      </div>
      <div className='flex justify-between gap-2 text-sm text-gray-500 mt-1'>
        {lastChatMessage ? (
          <p className='text-sm text-gray-500'>
            {truncateText(lastChatMessage, 40)}
          </p>
        ) : (
          <p className='text-sm text-gray-500'>
            채팅방이 생성되었습니다. 채팅을 시작해보세요!
          </p>
        )}

        <p className='text-s text-gray-500'>{timeAgo}</p>
      </div>
    </div>
  )
}
