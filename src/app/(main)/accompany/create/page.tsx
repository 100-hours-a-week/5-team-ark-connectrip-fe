// pages/accompany/create/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { formatFormData } from '@/app/utils/formUtils'
import AccompanyForm from '@/app/components/accompany/AccompanyForm'
import { api } from '@/app/utils/api'
import dayjs from 'dayjs'

export default function CreateAccompanyPage() {
  const router = useRouter()
  const { contextHolder, showSuccess, showError } = useCustomMessage()

  const handleFinish = async (values: {
    title: string
    accompanyArea: string
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    content: string
    customUrl: string | null
  }) => {
    try {
      const formData = formatFormData(values)
      await api.post(`/api/v1/accompany/posts`, formData)
      showSuccess('게시글 작성이 완료되었습니다.')
      setTimeout(() => {
        router.push('/accompany')
      }, 1000)
    } catch (error) {
      console.error('Error occurred while creating post:', error)
      showError('게시글 작성에 실패했습니다.')
    }
  }

  return (
    <div className='w-full p-6 mb-4'>
      {contextHolder}
      <h1 className='text-lg font-bold text-black'>동행 게시글 작성</h1>
      <AccompanyForm onSubmit={handleFinish} submitText='작성' />
    </div>
  )
}
