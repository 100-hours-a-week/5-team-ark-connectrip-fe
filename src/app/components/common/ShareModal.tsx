import { Modal, Button } from 'antd'
import React, { useRef } from 'react'
import UrlInput from '@/app/components/accompany/UrlInput' // UrlInput 컴포넌트 임포트
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'
import { QRCode } from 'antd'
import html2canvas from 'html2canvas'

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
  // customUrlQrPath,
}) => {
  const { contextHolder, showSuccess } = useCustomMessage()
  const pathname = usePathname()
  const defaultUrl = `${process.env.NEXT_PUBLIC_SELF_URL}${pathname}`
  const qrCodeRef = useRef<HTMLDivElement>(null)

  const handleCopyQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        const canvas = await html2canvas(qrCodeRef.current)
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const item = new ClipboardItem({ 'image/png': blob })
              await navigator.clipboard.write([item])
              showSuccess('QR 코드가 클립보드에 복사되었습니다!')
            } catch (error) {
              showSuccess('클립보드에 복사할 수 없습니다: ' + error)
            }
          }
        })
      } catch (error) {
        showSuccess(`${error}, QR 코드를 복사하는 중 오류가 발생했습니다.`)
      }
    }
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
          <Button key='copy' type='primary' onClick={handleCopyQRCode}>
            QR 코드 복사
          </Button>,
          <Button key='submit' onClick={onClose}>
            닫기
          </Button>,
        ]}
      >
        <div className='text-center mb-5'>
          <div
            className='w-52 h-52 mx-auto flex items-center justify-center'
            ref={qrCodeRef} // QR 코드 영역을 참조
          >
            {/* TODO : QR 내부에 우리 아이콘 넣기 */}
            <QRCode errorLevel='H' value={defaultUrl} icon='' size={200} />
          </div>
        </div>

        <UrlInput label='URL' url={defaultUrl} />

        {customUrl && <UrlInput label='커스텀 URL' url={customUrl} />}
      </Modal>
    </>
  )
}

export default ShareModal
