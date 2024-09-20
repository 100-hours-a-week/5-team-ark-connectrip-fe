'use client'
import ProfileIcon from '@/app/components/common/ProfileIcon'

interface ProfileCardProps {
  profileImage: string | null
  nickname: string
  accompanyCount: number
  reviewCount: number
}

export default function ProfileCard({
  profileImage,
  nickname,
  accompanyCount,
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
          size={100}
          nickname={nickname || ''}
        />
        <div className='text-l font-bold'>{nickname}</div>
      </div>
      <div className='flex flex-col flex-1 justify-center items-center gap-3'>
        <div className='flex flex-col w-[80%] justify-center items-start'>
          <h3 className='text-xs'>후기</h3>
          <p className='text-s'>
            <span className='text-l'>{reviewCount}</span> 개
          </p>
        </div>
        <div className='flex flex-col w-[80%] justify-center items-start border-t border-gray-300 pt-4'>
          <h3 className='text-xs'>커넥트립 내 동행횟수</h3>
          <p className='text-s'>
            <span className='text-l'>{accompanyCount}</span> 회
          </p>
        </div>
      </div>
    </div>
  )
}
