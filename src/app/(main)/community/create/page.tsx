// pages/accompany/create/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { formatCommunityFormData } from '@/app/utils/formUtils'
import { api } from '@/app/utils/api'
import { CommunityFormValues } from '@/interfaces'
import CommunityForm from '@/app/components/community/CommunityForm'

export default function CreateAccompanyPage() {
  const router = useRouter()
  const { contextHolder, showSuccess, showError } = useCustomMessage()
  const [isClick, setIsClick] = React.useState(false)

  const handleFinish = async (values: CommunityFormValues) => {
    try {
      if (isClick) return
      setIsClick(true)
      const formData = formatCommunityFormData(values)
      await api.post(`/api/v1/community/posts`, formData)
      showSuccess('게시글 작성이 완료되었습니다.')
      setTimeout(() => {
        router.push('/community')
      }, 1000)
    } catch (error) {
      console.error('Error occurred while creating post:', error)
      showError('게시글 작성에 실패했습니다.')
    }
  }

  return (
    <div className='w-full p-6 mb-4'>
      {contextHolder}
      <h1 className='text-lg font-bold text-black'>커뮤니티 게시글 작성</h1>
      <CommunityForm onSubmit={handleFinish} submitText='작성' />
    </div>
  )
}
