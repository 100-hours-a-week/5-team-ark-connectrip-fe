// utils/messageUtils.ts
import { message } from 'antd'

export const useCustomMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const showSuccess = (content: string) => {
    messageApi.open({
      type: 'success',
      content,
    })
  }

  const showError = (content: string) => {
    messageApi.open({
      type: 'error',
      content,
    })
  }

  const showWarning = (content: string) => {
    messageApi.open({
      type: 'warning',
      content,
    })
  }

  return { contextHolder, showSuccess, showError, showWarning }
}
