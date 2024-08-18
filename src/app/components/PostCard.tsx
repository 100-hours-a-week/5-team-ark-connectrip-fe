'use client'

import React, { useState, useEffect } from 'react'
import { StaticImageData } from 'next/image'
import CalendarIcon from './Icon/CalendarIcon'
import PinIcon from './Icon/PinIcon'
import ProfileIcon from './ProfileIcon'
import InfoRow from './InfoRow' // 새로 만든 컴포넌트 임포트
import { formatShortDate, formatCreatedAt } from '../utils/dateUtils'
import { truncateText } from '../utils/textUtils'

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

  useEffect(() => {
    setFormattedStartDate(formatShortDate(startDate))
    setFormattedEndDate(formatShortDate(endDate))
  }, [createdAt, startDate, endDate])

  return (
    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3 mb-4 cursor-pointer '>
      <h2 className='text-lg font-semibold'>{truncateText(title, 20)}</h2>
      <p className='text-sm text-gray-600'>{truncateText(content, 35)}</p>
      <div className='flex items-center space-x-2'>
        <ProfileIcon src={profileImagePath} size={30} />
        <div className='text-sm font-semibold'>{nickname}</div>
      </div>

      <div className='flex justify-start gap-2 text-sm text-gray-500'>
        <p className='text-sm text-gray-500'>{formatCreatedAt(createdAt)}</p>
        <InfoRow
          icon={<CalendarIcon />}
          text={`${formattedStartDate}~${formattedEndDate}`}
        />
        <InfoRow icon={<PinIcon />} text={accompanyArea} />
      </div>
    </div>
  )
}
