import React, { useEffect, useState } from 'react'
import { Button, Tag } from 'antd'
import ProfileIcon from '../common/ProfileIcon'
import { CompanionUsers } from '@/interfaces'
import { RecruitmentStatus } from '@/types'
import useAuthStore from '@/app/store/useAuthStore'
import ReviewModal from '@/app/components/common/ReviewModal'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { postReview } from '@/app/utils/fetchUtils'
import { navigateToProfile } from '@/app/utils/naviateToProfile'
import { useRouter } from 'next/navigation'

interface CompanionListProps {
  companionUsers: CompanionUsers[]
  leaderId: number
  accompanyStatus: RecruitmentStatus
}

const CompanionList: React.FC<CompanionListProps> = ({
  companionUsers,
  leaderId,
  accompanyStatus,
}) => {
  const { userId } = useAuthStore()

  const [open, setOpen] = useState(false)
  const [targetId, setTargetId] = useState<number | null>(null)
  const [targetNickname, setTargetNickname] = useState<string>('')
  const [content, setContent] = useState<string>('')
  // canWriteReview 상태 관리
  const [reviewPermissions, setReviewPermissions] = useState<{
    [key: number]: boolean
  }>({})

  const { contextHolder, showSuccess, showError } = useCustomMessage() // 커스텀 메시지 훅 사용
  const router = useRouter()

  // 초기 reviewPermissions 설정
  useEffect(() => {
    const initialPermissions = companionUsers.reduce(
      (acc, user) => {
        acc[user.memberId] = user.canWriteReview || false
        return acc
      },
      {} as { [key: number]: boolean }
    )

    setReviewPermissions(initialPermissions)
  }, [companionUsers])

  // 모달 열기 함수, targetId를 받아서 설정
  const showModal = (id: number, nickname: string) => {
    setTargetId(id)
    setTargetNickname(nickname)
    setOpen(true)
  }

  const handleOk = async () => {
    if (!content) {
      showError('후기란에 내용을 입력해주세요.')
      return
    }
    if (targetId !== null && content) {
      try {
        // 서버로 POST 요청을 보내기
        await postReview(companionUsers[0].chatRoomId, {
          targetId: targetId,
          content: content,
        })
        showSuccess('후기가 성공적으로 제출되었습니다.')

        // 후기 작성 후 canWriteReview 업데이트
        setReviewPermissions((prev) => ({
          ...prev,
          [targetId]: false,
        }))

        setOpen(false)
        setContent('') // TextArea 초기화
      } catch (error) {
        showError('후기 제출 중 오류가 발생했습니다.')
      }
    } else {
      console.error('Target ID 또는 내용이 누락되었습니다!')
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setContent('') // TextArea 초기화
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 100) {
      setContent(e.target.value)
    }
  }

  return (
    <div className='flex flex-col'>
      {contextHolder}
      {companionUsers.map((user) => (
        <div key={user.memberId} className='mb-4'>
          <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
              <ProfileIcon
                src={user.memberProfileImage || ''}
                size={33}
                nickname={user.memberNickname}
                onClick={() =>
                  navigateToProfile(router, user.memberId, userId ? userId : '')
                }
              />

              <div className='text-m font-semibold'>{user.memberNickname}</div>
              {user.memberId === leaderId && <Tag color='#b3bbee'>방장</Tag>}
            </div>
            {accompanyStatus === 'FINISHED' &&
              reviewPermissions[user.memberId] &&
              userId &&
              user.memberId !== parseInt(userId) && (
                <Button
                  type='text'
                  onClick={() => showModal(user.memberId, user.memberNickname)}
                >
                  후기
                </Button>
              )}
          </div>
        </div>
      ))}
      {/* 모달 컴포넌트 */}
      <ReviewModal
        open={open}
        targetNickname={targetNickname}
        content={content}
        onOk={handleOk}
        onCancel={handleCancel}
        onChange={handleChange}
      />
    </div>
  )
}

export default CompanionList
