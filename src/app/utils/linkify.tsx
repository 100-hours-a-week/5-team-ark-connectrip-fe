// utils/linkify.ts
export const linkify = (
  text: string
): (string | { type: 'link'; url: string })[] => {
  const urlPattern = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlPattern).map((part) => {
    if (urlPattern.test(part)) {
      return { type: 'link', url: part } // 링크인 경우
    }
    return part // 일반 텍스트인 경우
  })

  return parts as (string | { type: 'link'; url: string })[]
}
