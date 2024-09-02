// utils/messageUtils.ts
import { message } from 'antd'

export const useCustomMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const showSuccess = (content: string, callback?: () => void) => {
    messageApi.open({
      type: 'success',
      content,
    })
    if (callback) {
      setTimeout(callback, 1500) // 1.5초 대기 후 콜백 실행
    }
  }

  const showError = (content: string, callback?: () => void) => {
    messageApi.open({
      type: 'error',
      content,
    })
    if (callback) {
      setTimeout(callback, 1500) // 1.5초 대기 후 콜백 실행
    }
  }

  const showWarning = (content: string, callback?: () => void) => {
    messageApi.open({
      type: 'warning',
      content,
    })
    if (callback) {
      setTimeout(callback, 1500) // 1.5초 대기 후 콜백 실행
    }
  }

  return { contextHolder, showSuccess, showError, showWarning }
}
