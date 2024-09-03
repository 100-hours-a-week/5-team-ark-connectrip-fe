// antd의 DatePicker 컴포넌트가 dayjs 기반
import dayjs from 'dayjs'

// 날짜 처리 함수
export function formatDates(
  startDate: dayjs.Dayjs | null,
  endDate: dayjs.Dayjs | null
): { formattedStartDate: string | null; formattedEndDate: string | null } {
  let formattedStartDate = startDate
    ? startDate.format('YYYY-MM-DDT00:00:00')
    : null
  let formattedEndDate = endDate ? endDate.format('YYYY-MM-DDT00:00:00') : null

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

// 폼 데이터 처리 함수
interface FormValues {
  title: string
  accompanyArea: string
  startDate: dayjs.Dayjs | null
  endDate: dayjs.Dayjs | null
  content: string
}

export function formatFormData(values: FormValues) {
  const { title, accompanyArea, startDate, endDate, content } = values

  const { formattedStartDate, formattedEndDate } = formatDates(
    startDate,
    endDate
  )

  return {
    title,
    accompanyArea,
    content,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  }
}
