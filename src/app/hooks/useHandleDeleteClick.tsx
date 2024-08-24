import { useRouter } from 'next/navigation'
import { showDeleteModal } from '@/app/utils/modalUtils'
import { useCustomMessage } from '@/app/utils/alertUtils'

export const useHandleDeleteClick = () => {
  const router = useRouter()
  const { showSuccess, showError } = useCustomMessage()

  const handleDeleteClick = (
    text: string,
    redirectPath: string,
    deleteFunction: () => Promise<void> // 삭제를 처리하는 함수
  ) => {
    showDeleteModal(
      `${text} 삭제`,
      `정말 삭제하시겠습니까? 삭제된 ${text}은 복구할 수 없습니다.`,
      async () => {
        try {
          await deleteFunction() // 실제 삭제 요청 수행
          // TODO : 삭제 성공시 메시지 안뜸 고쳐야함
          showSuccess(`${text}이(가) 삭제되었습니다.`)
          const successMessage = `${text}이(가) 삭제되었습니다.`
          // 메시지가 표시된 후, 일정 시간 지연을 줘서 메시지가 보이도록 함
          if (redirectPath) {
            router.push(
              `${redirectPath}?message=${encodeURIComponent(successMessage)}`
            )
          } else {
            window.location.reload()
          }
        } catch (error) {
          showError(`${text} 삭제에 실패했습니다.`)
        }
      }
    )
  }

  return handleDeleteClick
}
