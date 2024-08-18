// utils/handleDeleteClick.ts
import { useRouter } from 'next/navigation'
import { showDeleteModal } from '@/app/utils/modalUtils'
import { useCustomMessage } from '@/app/utils/alertUtils'

export const useHandleDeleteClick = () => {
  const router = useRouter()
  const { showSuccess } = useCustomMessage()

  const handleDeleteClick = (text: string, redirectPath: string) => {
    showDeleteModal(
      `${text} 삭제`,
      `정말 삭제하시겠습니까? 삭제된 ${text}은 복구할 수 없습니다.`,
      () => {
        showSuccess(`${text}이(가) 삭제되었습니다.`)
        if (redirectPath) {
          router.push(redirectPath)
        } else {
          window.location.reload()
        }
      }
    )
  }

  return handleDeleteClick
}
