// pages/accompany/edit/[id]/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { fetchCommunityPost, updateCommunityPost } from '@/app/utils/fetchUtils'
import { formatCommunityFormData } from '@/app/utils/formUtils'
import { CommunityFormValues, Post } from '@/interfaces'
import CommunityForm from '@/app/components/community/CommunityForm'

export default function EditAccompanyPage() {
  const [initialValues, setInitialValues] =
    useState<CommunityFormValues | null>(null)
  const router = useRouter()
  const { id } = useParams()
  const { contextHolder, showSuccess, showError } = useCustomMessage()

  useEffect(() => {
    const loadPostData = async () => {
      try {
        const post: Post = await fetchCommunityPost(parseInt(id as string, 10))
        if (post) {
          setInitialValues({
            title: post.title,
            content: post.content,
          })
        }
      } catch {
        showError('게시글 정보를 불러오는 중 오류가 발생했습니다.')
      }
    }

    loadPostData()
  }, [id])

  const handleFinish = async (values: CommunityFormValues) => {
    try {
      const formData = formatCommunityFormData(values)
      await updateCommunityPost(parseInt(id as string, 10), formData)
      showSuccess('게시글 수정이 완료되었습니다.')
      setTimeout(() => {
        router.push(`/community/${id}`)
      }, 1000)
    } catch {
      showError('게시글 수정에 실패했습니다.')
    }
  }

  return (
    <div className='w-full p-6 mb-4'>
      {contextHolder}
      <h1 className='text-lg font-bold text-black'>커뮤니티 게시판 수정</h1>
      {initialValues && (
        <CommunityForm
          initialValues={initialValues}
          onSubmit={handleFinish}
          submitText='수정'
        />
      )}
    </div>
  )
}
