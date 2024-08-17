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

// 커스텀 URL 처리 함수
export function formatCustomUrl(customUrl?: string | null): string | null {
  return customUrl ? `https://ex.com/${customUrl}` : null
}

// 폼 데이터 처리 함수
export function formatFormData(values: any) {
  const { title, accompany_area, startDate, endDate, content, custom_url } =
    values

  const { formattedStartDate, formattedEndDate } = formatDates(
    startDate,
    endDate
  )

  const formattedData = {
    title,
    accompany_area,
    content,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    custom_url: formatCustomUrl(custom_url),
  }

  return formattedData
}
