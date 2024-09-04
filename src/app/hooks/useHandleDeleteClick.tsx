import { useRouter } from 'next/navigation'
import { showCancelModal, showDeleteModal } from '@/app/utils/modalUtils'
import { useCustomMessage } from '@/app/utils/alertUtils'

export const useHandleDeleteClick = () => {
  const router = useRouter()
  const { showSuccess, showError } = useCustomMessage()

  const handleDeleteClick = (
    text: string,
    redirectPath: string,
    deleteFunction: () => Promise<void> // 삭제를 처리하는 함수
  ) => {
    if (text === '동행 신청') {
      showCancelModal(
        `${text} 취소`,
        `동행 신청 승인을 대기 중입니다. 신청을 취소하시겠습니까?`,
        async () => {
          try {
            await deleteFunction() // 실제 삭제 요청 수행
            showSuccess(`${text}이 취소되었습니다.`)
            if (redirectPath) {
              router.push(redirectPath)
            } else {
              window.location.reload()
            }
          } catch {
            showError(`${text} 취소에 실패했습니다.`)
          }
        }
      )
    } else {
      showDeleteModal(
        `${text} 삭제`,
        `정말 삭제하시겠습니까? 삭제된 ${text}은 복구할 수 없습니다.`,
        async () => {
          try {
            await deleteFunction() // 실제 삭제 요청 수행
            // TODO : 삭제 성공시 메시지 안뜸 고쳐야함
            showSuccess(`${text}이(가) 삭제되었습니다.`)
            const successMessage = `${text}이(가) 삭제되었습니다.`
            if (redirectPath) {
              router.push(
                `${redirectPath}?message=${encodeURIComponent(successMessage)}`
              )
            } else {
              window.location.reload()
            }
          } catch {
            showError(`${text} 삭제에 실패했습니다.`)
          }
        }
      )
    }
  }

  return handleDeleteClick
}
