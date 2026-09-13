'use client'

import ProfileIcon from '../common/ProfileIcon'
import { truncateText } from '../../utils/textUtils'
import { useTimeStamp } from '../../hooks/useTimeStamp'
import { PostCardProps } from '@/interfaces'

export default function CommunityCard({
  title,
  content,
  createdAt,
  nickname,
  profileImagePath,
}: PostCardProps) {
  // useTimeStamp 커스텀 훅 사용
  const timeAgo = useTimeStamp(createdAt)

  return (
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
      <div className='flex justify-between items-end '>
        <div className='text-sm text-gray-600 '>
          {truncateText(content, 20)}
        </div>

        <div className='flex justify-between gap-2 text-s text-gray-50 mt-1 text-s text-gray-500 whitespace-nowrap'>
          {timeAgo}
        </div>
      </div>
    </div>
  )
}
