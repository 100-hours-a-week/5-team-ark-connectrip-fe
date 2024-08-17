import { lightFormat, format } from 'date-fns'
import { ko } from 'date-fns/locale'

export const formatShortDate = (dateString: string): string => {
  return lightFormat(new Date(dateString), 'M/d')
}

export const formatCreatedAt = (createdAt: string): string => {
  return format(new Date(createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })
}
