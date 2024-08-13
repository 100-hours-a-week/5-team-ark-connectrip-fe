'use client'

import React from 'react'
import Image from 'next/image'

interface PostCardProps {
  title: string
  content: string
  startDate: string
  accompanyArea: string
  createdAt: string
}

export default function PostCard({
  title,
  content,
  startDate,
  accompanyArea,
  createdAt,
}: PostCardProps) {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3 mb-4'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-sm text-gray-600'>{content}</p>
      <div className='flex items-center space-x-2'>
        <Image
          src='/profile.jpg'
          alt='Profile'
          width={40}
          height={40}
          className='rounded-full'
        />
        <div className='text-sm font-semibold'>사용자 이름</div>
      </div>
      <div className='flex justify-between text-sm text-gray-500'>
        <div className='flex items-center space-x-1'>
          <span>📅</span>
          <span>{createdAt}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <span>📍</span>
          <span>{accompanyArea}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <span>📅</span>
          <span>{startDate}</span>
        </div>
      </div>
    </div>
  )
}
