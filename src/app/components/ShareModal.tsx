// components/ShareModal.tsx
import { Modal, Input, Button } from 'antd'
import React from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  customUrl?: string // 백엔드에서 전달된 커스텀 URL
  customUrlQrPath: string
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  customUrl,
  customUrlQrPath,
}) => {
  const { contextHolder, showSuccess, showError } = useCustomMessage()
  const pathname = usePathname() // 현재 페이지의 경로를 가져옴
  const defaultUrl = `https://example.com${pathname}` // 현재 페이지의 URL

  // 복사 기능
  const handleCopy = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showSuccess('URL이 복사되었습니다.')
      })
      .catch((err) => {
        showError('복사에 실패했습니다.')
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <>
      {contextHolder}
      <Modal
        title='URL 공유'
        centered
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={[
          <Button key='submit' type='primary' onClick={onClose}>
            닫기
          </Button>,
        ]}
      >
        <div className='text-center mb-5'>
          <div className='w-52 h-52 bg-gray-200 mx-auto flex items-center justify-center'>
            {/* QR 코드 이미지 자리 */}
            <img src={customUrlQrPath} alt='QR Code' />
          </div>
        </div>

        {/* 현재 페이지의 URL */}
        <div className='mb-3'>
          <Input
            addonBefore='URL'
            value={defaultUrl}
            readOnly
            suffix={
              <CopyOutlined
                onClick={() => handleCopy(defaultUrl)}
                className='cursor-pointer'
              />
            }
          />
        </div>

        {/* 커스텀 URL이 있는 경우에만 렌더링 */}
        {customUrl && (
          <div className='mb-3'>
            <Input
              addonBefore='커스텀 URL'
              value={customUrl}
              readOnly
              suffix={
                <CopyOutlined
                  onClick={() => handleCopy(customUrl)}
                  className='cursor-pointer'
                />
              }
            />
          </div>
        )}
      </Modal>
    </>
  )
}

export default ShareModal
