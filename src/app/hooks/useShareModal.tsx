import { useState } from 'react'
import ShareModal from '@/app/components/ShareModal'

interface ShareModalComponentProps {
  customUrl?: string | null
  customUrlQrPath: string
}

const useShareModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const ShareModalComponent = ({
    customUrl,
    customUrlQrPath,
  }: ShareModalComponentProps): JSX.Element => {
    return (
      <ShareModal
        isOpen={isModalOpen}
        onClose={closeModal}
        customUrl={customUrl ?? undefined} // null일 경우 undefined로 변환
        customUrlQrPath={customUrlQrPath ?? undefined} // Allow undefined as a valid value
      />
    )
  }

  return { openModal, closeModal, ShareModalComponent }
}

export default useShareModal
