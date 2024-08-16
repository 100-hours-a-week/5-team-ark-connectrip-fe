// hooks/useShareModal.tsx
import { useState } from 'react'
import ShareModal from '@/app/components/ShareModal'

export default function useShareModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const ShareModalComponent = () => (
    <ShareModal isOpen={isModalOpen} onClose={closeModal} />
  )

  return { openModal, closeModal, ShareModalComponent }
}
