import { message } from 'antd'

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    message.success('URL이 복사되었습니다.')
  } catch (err) {
    message.error('복사에 실패했습니다.')
    console.error('Failed to copy: ', err)
  }
}
