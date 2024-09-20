// pages/profile/edit.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/app/store/useAuthStore'
import { fetchUserProfile, updateProfile } from '@/app/utils/fetchUtils'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import NicknameInput from '@/app/components/profile/NicknameInput'
import { ProfileData } from '@/interfaces'
import { useCustomMessage } from '@/app/utils/alertUtils'

interface User {
  userId: string
  nickname: string
  profileImage: string
}

export default function ProfileEditPage() {
  const router = useRouter()
  const { userId, fetchUser } = useAuthStore()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [nickname, setNickname] = useState<string>('')
  const { contextHolder, showSuccess, showError, showWarning } =
    useCustomMessage() // 커스텀 메시지 훅 사용

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        if (!userId) return
        const data = await fetchUserProfile(parseInt(userId))
        setProfileData(data)
        setNickname(data.nickname) // 닉네임 초기값 설정
      } catch (error) {
        console.error('프로필 데이터를 불러오는 중 오류가 발생했습니다:', error)
      }
    }

    loadProfileData()
  }, [userId])

  const handleFinish = async (values: any) => {
    try {
      if (!userId) return
      await updateProfile(userId, {
        nickname: values.nickname,
        description: values.description,
      })
      fetchUser()
      console.log('프로필이 수정되었습니다.')
      showSuccess('프로필이 수정되었습니다.')
      setTimeout(() => {
        router.push('/profile')
      }, 600)
    } catch (error) {
      showError('프로필 수정 중 오류가 발생했습니다.')
      console.error('프로필 수정 중 오류 발생:', error)
    }
  }

  if (!profileData) {
    return <LoadingSpinner />
  }

  return (
    <div className='w-full h-full p-4'>
      {contextHolder}
      <h1 className='text-lg font-bold mb-4'>프로필 수정</h1>
      <Form
        onFinish={handleFinish}
        initialValues={{
          nickname: profileData?.nickname || '', // Form의 initialValues로 기본값 설정
          description: profileData?.description || '', // Form의 initialValues로 기본값 설정
        }}
        layout='vertical'
      >
        <NicknameInput
          // defaultValue={nickname} 제거
          onNicknameChange={setNickname}
        />
        <Form.Item
          name='description'
          label='자기소개'
          rules={[{ required: true, message: '자기소개를 입력해 주세요.' }]}
        >
          <Input.TextArea
            placeholder='자기소개를 입력해 주세요.'
            style={{ height: 200, resize: 'none', whiteSpace: 'pre-wrap' }} // white-space: pre-wrap으로 줄바꿈 반영
            maxLength={128} // 글자 수를 128자로 제한
            showCount // 글자 수 카운트를 표시
            autoSize={false} // autoSize를 false로 설정하여 높이 고정
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            저장하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
