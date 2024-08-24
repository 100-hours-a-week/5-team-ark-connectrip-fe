// components/chat/DateSeparator.tsx
import React from 'react'
import dayjs from 'dayjs'

interface DateSeparatorProps {
  date: string
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  const formattedDate = dayjs(date).format('M월 D일') // '8월 16일' 형식으로 변환
  return (
    <div className='flex items-center justify-center gap-2 text-xs text-gray-600 my-2 mt-3'>
      <div className='w-8 h-[1px] bg-gray-300'></div>
      {formattedDate}
      <div className='w-8 h-[1px] bg-gray-300'></div>
    </div>
  )
}

export default DateSeparator
