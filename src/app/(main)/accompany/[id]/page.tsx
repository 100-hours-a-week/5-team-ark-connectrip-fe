'use client'
import { useParams } from 'next/navigation'

export default function AccompanyDetailPage() {
  // id == accompany post id
  const { id } = useParams()

  return (
    <div className='mt-[20px]'>
      <h1>Post ID: {id}</h1>
    </div>
  )
}
