'use client'

import React, { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import CalendarIcon from './Icon/CalendarIcon'
import PinIcon from './Icon/PinIcon'

interface PostCardProps {
  title: string
  content: string
  startDate: string
  endDate: string
  accompanyArea: string
  createdAt: string
  nickname: string
  profileImagePath: StaticImageData // 변경된 부분
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
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('')

  useEffect(() => {
    const date = new Date(createdAt)
    let formattedDate = date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.')
      .replace(/\s/g, '')
    // 마지막 문자가 '.'인지 확인하고, 만약 그렇다면 제거
    if (formattedDate.endsWith('.')) {
      formattedDate = formattedDate.slice(0, -1)
    }

    const formattedTime = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    setFormattedCreatedAt(`${formattedDate} ${formattedTime}`)
  }, [createdAt])

  return (
    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3 mb-4 cursor-pointer '>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-sm text-gray-600'>{content}</p>
      <div className='flex items-center space-x-2'>
        <Image
          // 문자열 경로를 사용
          src={profileImagePath}
          alt='Profile'
          width={30}
          height={30}
          className='rounded-full'
        />
        <div className='text-sm font-semibold'>{nickname}</div>
      </div>
      <div className='flex justify-start gap-2 text-sm text-gray-500'>
        <div className='flex items-center space-x-1'>
          <span>{formattedCreatedAt}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <PinIcon />
          <span>{accompanyArea}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <CalendarIcon />
          <span>
            {startDate.substring(3)}~{endDate.substring(3)}
          </span>
        </div>
      </div>
    </div>
  )
}
