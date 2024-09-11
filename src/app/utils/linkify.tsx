// utils/linkify.ts
export const linkify = (text: string): string | null => {
  const urlPattern = /(https?:\/\/[^\s]+)/g
  const match = text.match(urlPattern) // 첫 번째 링크만 감지

  if (match) {
    return match[0] // 첫 번째 링크 반환
  }
  return null // 링크가 없으면 null 반환
}
