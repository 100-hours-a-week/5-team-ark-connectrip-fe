import React from 'react'
import { Tag } from 'antd'
import ProfileIcon from '../common/ProfileIcon'
import { CompanionUsers } from '@/interfaces'

interface CompanionListProps {
  companionUsers: CompanionUsers[]
  leaderId: number
}

const CompanionList: React.FC<CompanionListProps> = ({
  companionUsers,
  leaderId,
}) => {
  return (
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
            {user.memberId === leaderId && <Tag color='#b3bbee'>방장</Tag>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompanionList
