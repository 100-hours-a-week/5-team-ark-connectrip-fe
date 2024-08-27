import { Modal, Button } from 'antd'
import React from 'react'
import UrlInput from '@/app/components/accompany/UrlInput' // UrlInput 컴포넌트 임포트
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  customUrl?: string
  customUrlQrPath: string
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  customUrl,
  customUrlQrPath,
}) => {
  const { contextHolder } = useCustomMessage()
  const pathname = usePathname()
  const defaultUrl = `${process.env.NEXT_PUBLIC_SELF_URL}${pathname}`

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
            {/* <img src={customUrlQrPath} alt='QR Code' /> */}
            QR 코드 서비스 준비중입니다.
          </div>
        </div>

        <UrlInput label='URL' url={defaultUrl} />

        {customUrl && <UrlInput label='커스텀 URL' url={customUrl} />}
      </Modal>
    </>
  )
}

export default ShareModal
