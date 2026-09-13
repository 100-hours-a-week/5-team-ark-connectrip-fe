'use client'

import React, { useState, useEffect } from 'react'
import CalendarIcon from '../Icon/CalendarIcon'
import PinIcon from '../Icon/PinIcon'
import ProfileIcon from '../common/ProfileIcon'
import InfoRow from './InfoRow'
import { truncateText } from '../../utils/textUtils'
import { useTimeStamp } from '../../hooks/useTimeStamp'
import { formatShortDateFromUtc } from '../../utils/dateUtils'
import { PostCardProps } from '@/interfaces'

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
    if (startDate) {
      setFormattedStartDate(formatShortDateFromUtc(startDate))
    }
    if (endDate) {
      setFormattedEndDate(formatShortDateFromUtc(endDate))
    }
  }, [createdAt, startDate, endDate])

  return (
    // <div className='bg-white p-4 rounded-lg shadow-md flex flex-col  mb-4 cursor-pointer '>
    <div className='box-border bg-white border-solid border border-[#e7e4e4] hover:border-main  p-4 rounded-lg  flex flex-col  mb-4 cursor-pointer '>
      <div className='flex items-center space-x-2 mb-1'>
        <ProfileIcon
          src={profileImagePath || ''}
          size={30}
          nickname={nickname}
        />

        <div className='text-sm font-semibold'>{nickname}</div>
      </div>
      <h2 className='text-lg font-semibold'>{truncateText(title, 20)}</h2>
      <div className='text-sm text-gray-600 mb-1'>
        {truncateText(content, 20)}
      </div>

      <div className='flex justify-between gap-2 text-sm text-gray-50 mt-1'>
        <div className='flex gap-2 text-secondary'>
          {/* 조건부 렌더링: startDate와 endDate가 존재하지 않을때만 출력 */}
          {!startDate && !endDate && (
            <InfoRow icon={<CalendarIcon />} text='미정' />
          )}
          {startDate && endDate && (
            <InfoRow
              icon={<CalendarIcon />}
              text={`${formattedStartDate}~${formattedEndDate}`}
            />
          )}
          <InfoRow icon={<PinIcon />} text={accompanyArea} />
        </div>
        <p className='text-s text-gray-500'>{timeAgo}</p>
      </div>
    </div>
  )
}
