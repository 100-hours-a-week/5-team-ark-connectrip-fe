export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

export const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt)
  let formattedDate = date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '.')
    .replace(/\s/g, '')

  // 마지막 문자가 '.'인지 확인하고, 만약 그렇다면 제거
  if (formattedDate.endsWith('.')) {
    formattedDate = formattedDate.slice(0, -1)
  }

  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return `${formattedDate} ${formattedTime}`
}
