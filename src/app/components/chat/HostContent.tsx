import React from 'react'
import ProfileIcon from '../common/ProfileIcon'
import { Button } from 'antd'
import { ApplyUsers } from '@/interfaces'

interface HostContentProps {
  applyUsers: ApplyUsers[] // users 데이터를 프롭스로 받음
}

const HostContent: React.FC<HostContentProps> = ({ applyUsers }) => {
  return (
    <div>
      {/* 동행 신청 목록 컴포넌트 */}
      {applyUsers.length > 0 ? (
        applyUsers.map((user) => (
          <div key={user.memberId} className='mb-4'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2 justify-center items-center'>
                <ProfileIcon
                  src={user.profileImagePath}
                  size={33}
                  nickname={user.memberNickname}
                />
                <div className='text-m font-semibold'>
                  {user.memberNickname}
                </div>
              </div>
              <div className='flex gap-2'>
                <Button type='primary' className='rounded-full'>
                  수락
                </Button>
                <Button type='default' className='rounded-full'>
                  거절
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='flex h-[100px] justify-center items-center text-center text-gray-500'>
          동행을 신청한 유저가 없습니다.
        </div>
      )}
      <p className='p-3 text-center text-sm'>
        모집이 완료되었다면 모집 종료를 클릭해주세요!
        <br />더 이상 신청 내역이 보이지 않습니다.
      </p>
      <Button type='primary' className='w-full rounded-full'>
        모집 종료
      </Button>
      <br />
    </div>
  )
}

export default HostContent
