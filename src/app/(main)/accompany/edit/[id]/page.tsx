// pages/accompany/edit/[id]/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils'
import AccompanyForm from '@/app/components/accompany/AccompanyForm'
import { fetchEditPost, updatePost } from '@/app/utils/fetchUtils'
import { formatFormData } from '@/app/utils/formUtils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // UTC 플러그인 추가
import { EditPost, FormValues } from '@/interfaces'

dayjs.extend(utc) // dayjs에서 UTC 사용하도록 설정

export default function EditAccompanyPage() {
  const [initialValues, setInitialValues] = useState<FormValues | null>(null)
  const router = useRouter()
  const { id } = useParams()
  const { contextHolder, showSuccess, showError } = useCustomMessage()

  useEffect(() => {
    const loadPostData = async () => {
      try {
        const response = await fetchEditPost(parseInt(id as string, 10)) // id를 숫자로 변환
        const post: EditPost = response.data // Assign the correct type to the post variable
        if (post) {
          setInitialValues({
            title: post.title,
            accompanyArea: post.accompanyArea,
            startDate: post.startDate ? dayjs(post.startDate) : null,
            endDate: post.endDate ? dayjs(post.endDate) : null,
            content: post.content,
          })
        }
      } catch {
        showError('게시글 정보를 불러오는 중 오류가 발생했습니다.')
      }
    }

    loadPostData()
  }, [id])

  const handleFinish = async (values: FormValues) => {
    try {
      const formData = formatFormData(values)
      await updatePost(parseInt(id as string, 10), formData)
      showSuccess('게시글 수정이 완료되었습니다.')
      setTimeout(() => {
        router.push(`/accompany/${id}`)
      }, 1000)
    } catch {
      showError('게시글 수정에 실패했습니다.')
    }
  }

  return (
    <div className='w-full p-6 mb-4'>
      {contextHolder}
      <h1 className='text-lg font-bold text-black'>동행 게시판 수정</h1>
      {initialValues && (
        <AccompanyForm
          initialValues={initialValues}
          onSubmit={handleFinish}
          submitText='수정'
        />
      )}
    </div>
  )
}
