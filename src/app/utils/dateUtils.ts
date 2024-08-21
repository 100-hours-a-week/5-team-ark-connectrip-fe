import { lightFormat, format } from 'date-fns'
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
