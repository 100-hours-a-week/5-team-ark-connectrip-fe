'use client'
import ProfileIcon from '@/app/components/common/ProfileIcon'
import { ProfileCardProps } from '@/interfaces'

export default function ProfileCard({
  profileImage,
  nickname,
  createdAt,
  reviewCount,
}: ProfileCardProps) {
  return (
    <div
      className='flex w-full h-[200px] rounded-xl bg-white p-2'
      style={{
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='flex flex-col flex-1 justify-center items-center gap-2'>
        <ProfileIcon
          src={profileImage || ''}
          size={80}
          nickname={nickname || ''}
        />
        <div className='text-l font-bold'>{nickname}</div>
      </div>
      <div className='flex flex-col flex-1 justify-center items-center gap-3'>
        <div className='flex flex-col w-[80%] justify-center items-start'>
          <h3 className='text-s'>후기</h3>
          <p className='text-s'>
            <span className='text-l'>{reviewCount}</span> 개
          </p>
        </div>
        <div className='flex flex-col w-[80%] justify-center items-start border-t border-gray-300 pt-4'>
          <h3 className='text-s'>가입일자</h3>
          <p className='text-s'>
            <span className='text-base'>{createdAt.slice(0, 10)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
