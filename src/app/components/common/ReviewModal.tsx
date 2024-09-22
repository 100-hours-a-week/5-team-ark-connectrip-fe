// @/app/components/common/ReviewModal.tsx

import React from 'react'
import { Modal, Button, Input } from 'antd'
import { ReviewModalProps } from '@/interfaces'

const { TextArea } = Input

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  targetNickname,
  content,
  onOk,
  onCancel,
  onChange,
}) => {
  return (
    <Modal
      open={open}
      title={`${targetNickname} 님에게 후기 작성하기`}
      onOk={onOk} // 이 부분이 중요합니다. Modal의 onOk에 핸들러가 연결되어야 합니다.
      centered
      onCancel={onCancel}
      footer={
        <>
          <Button onClick={onCancel}>취소</Button>
          <Button type='primary' onClick={onOk}>
            {/* 작성 버튼 클릭 시 onOk 호출 */}
            작성
          </Button>
        </>
      }
    >
      <TextArea
        showCount
        maxLength={100}
        onChange={onChange}
        value={content}
        placeholder='다음 동행자들을 위해 후기를 남겨주세요!'
        style={{ height: 150, resize: 'none', marginBottom: 15 }}
      />
    </Modal>
  )
}

export default ReviewModal
