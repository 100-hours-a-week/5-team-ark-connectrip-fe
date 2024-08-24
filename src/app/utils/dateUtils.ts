import { lightFormat, format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

// 짧은 날짜 형식 (M/d)
export const formatShortDate = (dateString: string): string => {
  return lightFormat(new Date(dateString), 'M/d')
}

// 생성일시 포맷 (yyyy.MM.dd HH:mm)
export const formatCreatedAt = (createdAt: string): string => {
  return format(new Date(createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })
}

// 입력된 날짜를 "yyyy-MM-dd'T'00:00:00" 형태로 변환
export const formatBirthDate = (birthDate: string): string => {
  return format(new Date(birthDate), "yyyy-MM-dd'T'00:00:00")
}

// UTC 날짜를 "yyyy.MM.dd HH:mm" 형식으로 변환
export const formatToUtcDate = (utcString: string): string => {
  if (!utcString) {
    throw new Error('Invalid date string provided')
  }

  try {
    const date = parseISO(utcString) // ISO 형식의 날짜 문자열을 파싱
    return format(date, 'yyyy.MM.dd HH:mm', { locale: ko }) // 원하는 형식으로 변환
  } catch (error) {
    console.error('Failed to parse date:', error)
    return 'Invalid Date'
  }
}

// UTC 날짜를 "M/d" 형식으로 변환
export const formatShortDateFromUtc = (utcString: string): string => {
  if (!utcString) {
    throw new Error('Invalid date string provided')
  }

  try {
    const date = parseISO(utcString) // ISO 형식의 날짜 문자열을 파싱
    return lightFormat(date, 'M/d') // 원하는 형식으로 변환
  } catch (error) {
    console.error('Failed to parse date:', error)
    return 'Invalid Date'
  }
}
