'use client'

import React, { useState, useEffect } from 'react'
import { StaticImageData } from 'next/image'
import CalendarIcon from '../Icon/CalendarIcon'
import PinIcon from '../Icon/PinIcon'
import ProfileIcon from '../common/ProfileIcon'
import InfoRow from './InfoRow' // 새로 만든 컴포넌트 임포트
import { formatShortDate } from '../../utils/dateUtils'
import { truncateText } from '../../utils/textUtils'
import { useTimeStamp } from '../../hooks/useTimeStamp'

interface PostCardProps {
  title: string
  content: string
  startDate: string
  endDate: string
  accompanyArea: string
  createdAt: string
  nickname: string
  profileImagePath: StaticImageData
}

export default function PostCard({
  title,
  content,
  startDate,
  endDate,
  accompanyArea,
  createdAt,
  nickname,
  profileImagePath,
}: PostCardProps) {
  const [formattedStartDate, setFormattedStartDate] = useState('')
  const [formattedEndDate, setFormattedEndDate] = useState('')

  // useTimeStamp 커스텀 훅 사용
  const timeAgo = useTimeStamp(createdAt)

  useEffect(() => {
    setFormattedStartDate(formatShortDate(startDate))
    setFormattedEndDate(formatShortDate(endDate))
  }, [createdAt, startDate, endDate])

  return (
    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col  mb-4 cursor-pointer '>
      <div className='flex items-center space-x-2 mb-1'>
        <ProfileIcon src={profileImagePath} size={30} />
        <div className='text-sm font-semibold'>{nickname}</div>
      </div>
      <h2 className='text-lg font-semibold'>{truncateText(title, 20)}</h2>
      <div className='text-sm text-gray-600 mb-1'>
        {truncateText(content, 35)}
      </div>

      <div className='flex justify-between gap-2 text-sm text-gray-50 mt-1'>
        <div className='flex gap-2 text-secondary'>
          <InfoRow
            icon={<CalendarIcon />}
            text={`${formattedStartDate}~${formattedEndDate}`}
          />
          <InfoRow icon={<PinIcon />} text={accompanyArea} />
        </div>
        <p className='text-s text-gray-500'>{timeAgo}</p>
      </div>
    </div>
  )
}
