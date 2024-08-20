'use client'

import React, { useState } from 'react'
import { Input, Radio, Button, Form } from 'antd'
import { useRouter } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils' // 메시지 유틸리티 가져오기

interface SignupFormValues {
  nickname: string
  birthDate: string
  gender: 'male' | 'female'
}

export default function SignupPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const { contextHolder, showSuccess, showError } = useCustomMessage() // 커스텀 메시지 훅 사용
  const [nicknameStatus, setNicknameStatus] = useState<
    'valid' | 'invalid' | null
  >(null)
  const [birthDate, setBirthDate] = useState<string>('') // 생년월일 상태

  // 닉네임 유효성 확인 (3~20자, 한글/영문/띄어쓰기 허용)
  const checkNickname = (nickname: string) => {
    if (
      nickname.length < 3 ||
      nickname.length > 20 ||
      /[^가-힣a-zA-Z\s]/.test(nickname) // 특수 문자 및 숫자 방지
    ) {
      setNicknameStatus('invalid')
      return false
    }
    setNicknameStatus('valid')
    return true
  }

  const handleFinish = async (values: SignupFormValues) => {
    try {
      const isNicknameValid = checkNickname(values.nickname)
      if (!isNicknameValid) {
        return
      }

      // 성공 시, API 요청 후 페이지 이동
      showSuccess('회원가입이 완료되었습니다.')
      setTimeout(() => {
        router.push('/accompany')
      }, 1000) // 1초 후에 페이지 이동
    } catch (error) {
      showError('회원가입에 실패했습니다.')
      console.error('Error:', error)
    }
  }

  return (
    <div className='w-full p-6 mb-4 flex justify-center items-center flex-col'>
      {contextHolder} {/* alert 표시를 위한 컨텍스트 */}
      <h1 className='text-lg font-bold text-black'>회원가입</h1>
      <div className='flex flex-col gap-8 w-full'>
        <Form
          form={form}
          onFinish={handleFinish}
          layout='vertical'
          initialValues={{
            nickname: '', // 기본값을 빈 문자열로 설정하여 undefined 방지
            birthDate: '',
            gender: 'male',
          }}
        >
          <Form.Item
            name='nickname'
            label='닉네임'
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(new Error('닉네임을 작성해 주세요.'))
                  }
                  const isValid = checkNickname(value)
                  if (!isValid) {
                    if (nicknameStatus === 'invalid') {
                      return Promise.reject(
                        new Error(
                          '닉네임은 3자 이상, 20자 이하이며, 특수 문자 없이 작성해 주세요.'
                        )
                      )
                    }
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input
              showCount
              maxLength={20}
              placeholder='닉네임을 작성해 주세요.'
              onChange={() => setNicknameStatus(null)} // 닉네임이 변경될 때 상태 초기화
            />
          </Form.Item>

          <Form.Item
            name='birthDate'
            label='생년월일'
            rules={[
              { required: true, message: '생년월일을 입력해 주세요.' },
              {
                pattern: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, // YYYY-MM-DD 형식의 날짜 검증
                message: '올바른 생년월일 형식을 입력해 주세요 (예: 19991009).',
              },
            ]}
          >
            <Input
              placeholder=' 숫자 8자리를 입력해주세요. 예시 : yyyymmdd'
              maxLength={8}
              value={birthDate}
              style={{ color: '#000' }} // 글자 색상을 검정색으로 설정
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '') // 숫자만 입력되도록 처리
                if (value.length <= 8) {
                  if (value.length === 8) {
                    const formattedDate = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
                    form.setFieldsValue({ birthDate: formattedDate })
                    setBirthDate(formattedDate) // 상태 업데이트
                  } else {
                    setBirthDate(value) // 입력 중일 때 상태 업데이트
                  }
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name='gender'
            label='성별'
            rules={[{ required: true, message: '성별을 선택해 주세요.' }]}
          >
            <Radio.Group>
              <Radio value='male'>남성</Radio>
              <Radio value='female'>여성</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <div className='flex justify-end gap-4'>
              <Button type='default' onClick={() => form.resetFields()}>
                초기화
              </Button>
              <Button type='primary' htmlType='submit'>
                가입
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
