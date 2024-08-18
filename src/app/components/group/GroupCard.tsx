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

interface GroupCardProps {
  title: string
  content: string
  startDate: string
  endDate: string
  accompanyArea: string
  createdAt: string
}

export default function GroupCard({
  title,
  startDate,
  endDate,
  accompanyArea,
  createdAt,
}: GroupCardProps) {
  const [formattedStartDate, setFormattedStartDate] = useState('')
  const [formattedEndDate, setFormattedEndDate] = useState('')
  const handleDeleteClick = useHandleDeleteClick() // 모달 호출 유틸리티 사용

  // useTimeStamp 커스텀 훅 사용
  const timeAgo = useTimeStamp(createdAt)

  useEffect(() => {
    setFormattedStartDate(formatShortDate(startDate))
    setFormattedEndDate(formatShortDate(endDate))
  }, [startDate, endDate])

  const menuItems = [
    {
      label: '그룹방 나가기',
      onClick: () => handleDeleteClick('그룹방', ''), // 모달 호출
    },
  ]

  return (
    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col mb-4 cursor-pointer'>
      <div className='flex justify-between mb-1'>
        <h2 className='text-lg font-semibold'>{truncateText(title, 20)}</h2>
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
      <div className='flex justify-between gap-2 text-sm text-gray-500'>
        <div className='flex gap-2'>
          <InfoRow
            icon={<CalendarIcon />}
            text={`${formattedStartDate}~${formattedEndDate}`}
          />
          <InfoRow icon={<PinIcon />} text={accompanyArea} />
        </div>
        <p className='text-sm text-gray-500'>{timeAgo}</p>
      </div>
    </div>
  )
}
