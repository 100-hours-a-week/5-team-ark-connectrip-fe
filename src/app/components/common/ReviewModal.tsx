import React from 'react'
import { Modal, Button } from 'antd'
import { ReviewModalProps } from '@/interfaces'
import { useTimeStamp } from '@/app/hooks/useTimeStamp'

interface ShowReviewModalProps extends ReviewModalProps {
  mode: 'write' | 'view'
  createdAt?: string
}

const ShowReviewModal: React.FC<ShowReviewModalProps> = ({
  open,
  targetNickname,
  content,
  createdAt,
  onOk,
  onCancel,
  mode,
}) => {
  const title =
    mode === 'write'
      ? `${targetNickname} 님에게 후기 작성하기`
      : `${targetNickname} 님에게 작성한 후기`

  // 작성일을 포맷하기 위해 useTimeStamp 훅 사용
  const timeAgo = useTimeStamp(createdAt || '')

  return (
    <Modal
      open={open}
      title={title}
      centered
      onCancel={onCancel}
      footer={
        mode === 'write' && (
          <>
            <Button onClick={onCancel}>닫기</Button>
            <Button type='primary' onClick={onOk}>
              작성
            </Button>
          </>
        )
      }
    >
      <div>
        <div className='border rounded-md p-3 py-4'>
          {/* 이미 작성한 후기를 표시하는 영역 */}

          <p>{content || '작성한 후기가 없습니다.'}</p>
        </div>

        {createdAt && (
          <div className='flex justify-end'>
            <div className='mt-2 text-s text-gray-600'>{timeAgo}</div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ShowReviewModal
