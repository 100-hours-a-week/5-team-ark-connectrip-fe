import { useState, useEffect } from 'react'

// 글 작성 시간을 인자로 받아오는 커스텀 훅
export const useTimeStamp = (timestamp: string) => {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const updateTimeStamp = () => {
      const date = new Date(timestamp)

      // 날짜 유효성 체크
      if (isNaN(date.getTime())) {
        // 날짜가 유효하지 않다면 '유효하지 않은 날짜'로 표기
        setTimeAgo('유효하지 않은 날짜')
        return
      }

      // 경과한 시간 계산 (1초 = 1000밀리초)
      const timeElapsed = Math.floor(
        (new Date().getTime() - date.getTime()) / 1000
      )

      if (timeElapsed < 60) {
        setTimeAgo('방금 전')
      } else if (timeElapsed < 60 * 60) {
        const minutes = Math.floor(timeElapsed / 60)
        setTimeAgo(`${minutes}분 전`)
      } else if (timeElapsed < 60 * 60 * 24) {
        const hours = Math.floor(timeElapsed / (60 * 60))
        setTimeAgo(`${hours}시간 전`)
      } else if (timeElapsed < 60 * 60 * 24 * 7) {
        const days = Math.floor(timeElapsed / (60 * 60 * 24))
        setTimeAgo(`${days}일 전`)
      } else {
        // 일주일 이상 지난 시간에 대해서는 YYYY-MM-DD로 표기
        setTimeAgo(date.toISOString().slice(0, 10))
      }
    }

    updateTimeStamp()

    // 일정 시간마다 타임스탬프를 업데이트 (1분마다)
    const intervalId = setInterval(updateTimeStamp, 60000)

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalId)
  }, [timestamp])

  return timeAgo
}
