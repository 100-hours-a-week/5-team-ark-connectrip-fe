import React, { useEffect, useState } from 'react'
import { Button, Tag } from 'antd'
import ProfileIcon from '../common/ProfileIcon'
import { CompanionUsers } from '@/interfaces'
import { RecruitmentStatus } from '@/types'
import useAuthStore from '@/app/store/useAuthStore'
import ReviewModal from '@/app/components/common/ReviewModal'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { fetchReviewsByReviewee, postReview } from '@/app/utils/fetchUtils'
import { navigateToProfile } from '@/app/utils/naviateToProfile'
import { useRouter } from 'next/navigation'

// 응답 데이터 인터페이스 정의

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
  const [createdAt, setCreatedAt] = useState<string>('')
  const [reviewPermissions, setReviewPermissions] = useState<{
    [key: number]: boolean
  }>({})
  const { contextHolder, showSuccess, showError } = useCustomMessage()
  const router = useRouter()

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

  const showModal = (
    id: number,
    nickname: string,
    content: string = '',
    createdAt: string = ''
  ) => {
    setTargetId(id)
    setTargetNickname(nickname)
    setContent(content)
    setCreatedAt(createdAt)
    setOpen(true)
  }

  const handleOk = async () => {
    if (!content) {
      showError('후기란에 내용을 입력해주세요.')
      return
    }
    if (targetId !== null) {
      try {
        await postReview(companionUsers[0].chatRoomId, {
          targetId: targetId,
          content: content,
        })
        showSuccess('후기가 성공적으로 제출되었습니다.')
        setReviewPermissions((prev) => ({ ...prev, [targetId]: false }))
        setOpen(false)
        setContent('')
      } catch (error) {
        showError('후기 제출 중 오류가 발생했습니다.')
        console.error('Error:', error)
      }
    } else {
      console.error('Target ID가 누락되었습니다!')
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setContent('')
    setCreatedAt('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 100) {
      setContent(e.target.value)
    }
  }

  const handleReviewButtonClick = async (user: CompanionUsers) => {
    if (reviewPermissions[user.memberId]) {
      showModal(user.memberId, user.memberNickname)
    } else {
      try {
        const response = await fetchReviewsByReviewee(
          user.chatRoomId,
          user.memberId
        )
        if (response) {
          showModal(
            response.revieweeNickname,
            response.revieweeNickname,
            response.content,
            response.createdAt
          )
        } else {
          showError('후기를 찾을 수 없습니다.')
        }
      } catch (error) {
        showError('후기 조회 중 오류가 발생했습니다.')
        console.error('Error:', error)
      }
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
              userId &&
              user.memberId !== parseInt(userId) && (
                <Button
                  type='text'
                  onClick={() => handleReviewButtonClick(user)}
                >
                  후기
                </Button>
              )}
          </div>
        </div>
      ))}
      {/* 후기 작성 모달 */}
      <ReviewModal
        open={open}
        targetNickname={targetNickname}
        content={content}
        createdAt={createdAt} // createdAt도 넘겨줌
        onOk={handleOk}
        onCancel={handleCancel}
        onChange={handleChange}
        mode={reviewPermissions[targetId!] ? 'write' : 'view'}
      />
    </div>
  )
}

export default CompanionList
