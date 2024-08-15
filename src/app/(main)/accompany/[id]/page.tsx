'use client'
import { useParams } from 'next/navigation'

export default function AccompanyDetailPage() {
  const { id } = useParams()

  return (
    <div>
      <h1>Post ID: {id}</h1>
      {/* 이곳에서 id에 따라 데이터를 가져와서 렌더링할 수 있습니다 */}
    </div>
  )
}
