import React from 'react'
import ProfileIcon from '../common/ProfileIcon'
import { Button } from 'antd'
import { ApplyUsers, CompanionUsers } from '@/interfaces'
import { acceptUser, rejectUser } from '@/app/utils/fetchUtils'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'

interface HostContentProps {
  applyUsers: ApplyUsers[]
  postId: number
  setCompanionUsers: React.Dispatch<React.SetStateAction<CompanionUsers[]>>
  setApplyUsers: React.Dispatch<React.SetStateAction<ApplyUsers[]>>
}

export const HostContent: React.FC<HostContentProps> = ({
  applyUsers,
  postId,
  setCompanionUsers,
  setApplyUsers,
}) => {
  const { contextHolder, showSuccess, showWarning } = useCustomMessage()
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)

  const handleAccept = async (memberId: number) => {
    try {
      await acceptUser(postId, memberId)
      // 새 companion user를 추가
      const acceptedUser = applyUsers.find((user) => user.memberId === memberId)
      if (acceptedUser) {
        setCompanionUsers((prevCompanions) => [
          ...prevCompanions,
          {
            chatRoomId: chatRoomId,
            memberId: acceptedUser.memberId,
            memberNickname: acceptedUser.memberNickname,
            memberProfileImage: acceptedUser.profileImagePath,
            memberChatRoomStatus: 'ACTIVE',
          },
        ])
      }
      showSuccess('수락이 완료되었습니다.')
      // 수락 후, setApplyUsers를 통해 유저 목록에서 삭제
      setApplyUsers((prevUsers) =>
        prevUsers.filter((user) => user.memberId !== memberId)
      )
    } catch (error) {
      console.error('Failed to accept user:', error)
      showWarning('수락에 실패했습니다.')
    }
  }

  const handleReject = async (memberId: number) => {
    try {
      await rejectUser(postId, memberId)
      showSuccess('거절이 완료되었습니다.')
      // 거절 후, setApplyUsers를 통해 유저 목록에서 삭제
      setApplyUsers((prevUsers) =>
        prevUsers.filter((user) => user.memberId !== memberId)
      )
    } catch (error) {
      console.error('Failed to reject user:', error)
      showWarning('거절에 실패했습니다.')
    }
  }
  return (
    <div>
      {contextHolder}
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
                <Button
                  type='primary'
                  className='rounded-full'
                  onClick={() => handleAccept(user.memberId)}
                >
                  수락
                </Button>
                <Button
                  type='default'
                  className='rounded-full'
                  onClick={() => handleReject(user.memberId)}
                >
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
