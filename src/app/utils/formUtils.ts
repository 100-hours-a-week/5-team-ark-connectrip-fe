// antd의 DatePicker 컴포넌트가 dayjs 기반
import dayjs from 'dayjs'

// 날짜 처리 함수
export function formatDates(
  startDate: dayjs.Dayjs | null,
  endDate: dayjs.Dayjs | null
): { formattedStartDate: string | null; formattedEndDate: string | null } {
  let formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null
  let formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null

  if (!startDate && !endDate) {
    formattedStartDate = null
    formattedEndDate = null
  } else if (!startDate && endDate) {
    formattedStartDate = formattedEndDate
  } else if (startDate && !endDate) {
    formattedEndDate = formattedStartDate
  }

  return { formattedStartDate, formattedEndDate }
}

// 커스텀 URL 처리 함수 (환경 변수 사용)
export function formatCustomUrl(customUrl?: string | null): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  return customUrl ? `${baseUrl}/${customUrl}` : null
}

// 폼 데이터 처리 함수
interface FormValues {
  title: string
  accompany_area: string
  startDate: dayjs.Dayjs | null
  endDate: dayjs.Dayjs | null
  content: string
  custom_url?: string | null
}

export function formatFormData(values: FormValues) {
  const { title, accompany_area, startDate, endDate, content, custom_url } =
    values

  const { formattedStartDate, formattedEndDate } = formatDates(
    startDate,
    endDate
  )

  return {
    title,
    accompany_area,
    content,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    custom_url: formatCustomUrl(custom_url),
  }
}
