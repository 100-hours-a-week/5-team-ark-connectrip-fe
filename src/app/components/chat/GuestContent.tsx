import React from 'react'
import ProfileIcon from '../common/ProfileIcon'
import { Switch } from 'antd'

interface ApplyUsers {
  accompanyPostId: number
  memberId: number
  memberNickname: string
  profileImagePath: string
}

interface CompanionUsers {
  chatRoomId: number
  memberId: number
  memberEmail: string
  memberNickname: string
  memberProfileImage: string | null
  memberChatRoomStatus: string
}

interface GuestContent {
  applyUsers: ApplyUsers[] // 동행 신청자 목록
  companionUsers: CompanionUsers[] // 동행 참여자 목록
}

const HostContent: React.FC<GuestContent> = ({
  applyUsers,
  companionUsers,
}) => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }
  return (
    <div className='flex flex-col gap-3'>
      {/* 동행 위치 조회 지도 컴포넌트 */}
      <div className='flex justify-center items-center h-[300px] bg-gray-200'>
        지도 컴포넌트
      </div>
      <div className='flex justify-end items-center'>
        <div className='flex gap-2'>
          {' '}
          <p>내 위치공유</p>
          <Switch onChange={onChange} />
        </div>
      </div>
      {/* 동행 상대 목록 컴포넌트 */}
      <h3>대화 상대</h3>
      <div className='flex flex-col'>
        {companionUsers.map((user) => (
          <div key={user.memberId} className='mb-4'>
            <div className='flex gap-2 items-center'>
              <ProfileIcon
                src={user.memberProfileImage || ''}
                size={33}
                nickname={user.memberNickname}
              />
              <div className='text-m font-semibold'>{user.memberNickname}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HostContent
