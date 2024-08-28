import { Modal, Button } from 'antd'
import React, { useRef, useState } from 'react'
import UrlInput from '@/app/components/accompany/UrlInput'
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
}) => {
  const { contextHolder, showSuccess, showWarning } = useCustomMessage()
  const pathname = usePathname()
  const defaultUrl = `${process.env.NEXT_PUBLIC_SELF_URL}${pathname}`
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const [qrCodeBlob, setQrCodeBlob] = useState<Blob | null>(null)

  // 미리 QR 코드 이미지를 생성해놓습니다.
  const generateQRCodeBlob = async () => {
    if (qrCodeRef.current) {
      try {
        const canvas = await html2canvas(qrCodeRef.current)
        canvas.toBlob((blob) => {
          if (blob) {
            setQrCodeBlob(blob)
          }
        })
      } catch (error) {
        console.log('QR 코드 생성 중 오류 발생:', error)
        showWarning('QR 코드를 생성하는 중 오류가 발생했습니다.')
      }
    }
  }

  // 클릭 이벤트에서 직접 복사하도록 합니다.
  const handleCopyQRCode = async () => {
    if (qrCodeBlob) {
      try {
        const item = new ClipboardItem({ 'image/png': qrCodeBlob })
        await navigator.clipboard.write([item])
        showSuccess('QR 코드가 클립보드에 복사되었습니다!')
      } catch (error) {
        console.error('클립보드 복사 중 오류 발생:', error)
        showWarning(
          'Safari 브라우저가 클립보드 복사를 지원하지 않습니다. Chrome 브라우저를 사용해주세요.'
        )
      }
    } else {
      showWarning('QR 코드 이미지가 아직 준비되지 않았습니다.')
    }
  }

  React.useEffect(() => {
    generateQRCodeBlob()
  }, [isOpen])

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
