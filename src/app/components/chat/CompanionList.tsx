import React, { useState } from 'react'
import { Button, Tag } from 'antd'
import ProfileIcon from '../common/ProfileIcon'
import { CompanionUsers } from '@/interfaces'
import { RecruitmentStatus } from '@/types'
import useAuthStore from '@/app/store/useAuthStore'
import ReviewModal from '@/app/components/common/ReviewModal'

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

  // 모달 열기 함수, targetId를 받아서 설정
  const showModal = (id: number, nickname: string) => {
    setTargetId(id)
    setTargetNickname(nickname)
    setOpen(true)
  }

  const handleOk = () => {
    if (targetId !== null && content) {
      // 콘솔에 targetId와 content 출력
      console.log('Submitted Data:', {
        targetId: targetId,
        content: content,
      })

      // 서버로 데이터 전송 로직 추가 가능
      setOpen(false)
      setContent('') // TextArea 초기화
    } else {
      console.error('Target ID or content is missing!')
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setContent('') // TextArea 초기화
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <div className='flex flex-col'>
      {companionUsers.map((user) => (
        <div key={user.memberId} className='mb-4'>
          <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
              <ProfileIcon
                src={user.memberProfileImage || ''}
                size={33}
                nickname={user.memberNickname}
              />

              <div className='text-m font-semibold'>{user.memberNickname}</div>
              {user.memberId === leaderId && <Tag color='#b3bbee'>방장</Tag>}
            </div>
            {accompanyStatus === 'FINISHED' &&
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
