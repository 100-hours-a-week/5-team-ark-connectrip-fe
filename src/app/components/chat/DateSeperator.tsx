// components/chat/DateSeparator.tsx
import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import CalendarIcon from '../Icon/CalendarIcon'

dayjs.locale('ko') // 한국어 로케일 설정
dayjs.extend(localizedFormat)

interface DateSeparatorProps {
  date: string
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  // '2024년 8월 16일 금요일' 형식으로 변환
  const formattedDate = dayjs(date).format('YYYY년 M월 D일 dddd')
  return (
    // <div className='flex items-center justify-center gap-2 text-xs text-gray-600 my-2 mt-3'>
    //   <div className='w-8 h-[1px] bg-gray-300'></div>
    //   {formattedDate}
    //   <div className='w-8 h-[1px] bg-gray-300'></div>
    // </div>
    <div className='flex items-center justify-center gap-1 text-xs text-white bg-[rgba(0,0,0,0.2)] p-1 px-2 rounded-full my-2 mt-3'>
      <CalendarIcon width={10} height={11} fill='#fff' /> {formattedDate}
    </div>
  )
}

export default DateSeparator
