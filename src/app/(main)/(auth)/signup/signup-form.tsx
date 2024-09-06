'use client'

import React, { useState, useEffect } from 'react'
import { Input, Radio, Button, Form, Checkbox } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { useDebouncedCallback } from 'use-debounce'
import { api } from '@/app/utils/api'
import { formatBirthDate } from '@/app/utils/dateUtils'
import useAuthStore from '@/app/store/useAuthStore'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import { NicknameStatus } from '@/types'
import { SignupFormValues } from '@/interfaces'

const termsOptions = [
  {
    label: '개인정보 처리방침 동의 (필수)',
    value: 'privacyPolicy',
    link: '/privacy',
  },
  { label: '이용약관 동의 (필수)', value: 'termsOfService', link: '/policy' },
]

const SignupPage: React.FC = () => {
  const searchParams = useSearchParams()
  const [form] = Form.useForm()
  const router = useRouter()
  const { contextHolder, showSuccess, showError, showWarning } =
    useCustomMessage() // 커스텀 메시지 훅 사용
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>(null)
  const [loading, setLoading] = useState(true)
  const [nicknameHelperText, setNicknameHelperText] = useState<string>('') // 닉네임 헬퍼 텍스트 상태
  const [agreeAllChecked, setAgreeAllChecked] = useState<boolean>(false) // "모두 동의" 체크박스 상태
  const [checkedList, setCheckedList] = useState<string[]>([]) // 개별 체크박스 상태
  const { setUser, nickname } = useAuthStore()

  // 초기 로딩 상태 해제
  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      showWarning(message) // 경고 메시지 표시
    }
  }, [searchParams, showWarning])

  useEffect(() => {
    if (nickname) {
      router.push('/accompany')
    }
  }, [nickname, router])

  // 닉네임 유효성 확인 (3~20자, 한글/영문/띄어쓰기 허용)
  const checkNicknameValidity = (nickname: string) => {
    if (
      nickname.length < 3 ||
      nickname.length > 20 ||
      /[^가-힣a-zA-Z\s]/.test(nickname) // 특수 문자 및 숫자 방지
    ) {
      setNicknameStatus('invalid')
      setNicknameHelperText(
        '닉네임은 3자 이상, 20자 이하이며, 특수 문자 없이 작성해 주세요.'
      )
      return false
    }
    return true
  }

  // 닉네임 중복 확인 API 호출
  const checkNicknameDuplication = async (nickname: string) => {
    try {
      const response = await api.get(
        `/api/v1/members/check-nickname?nickname=${encodeURIComponent(nickname)}`
      )
      const isDuplicated = response.data.isDuplicatedNickname
      if (isDuplicated) {
        setNicknameStatus('duplicated')
        setNicknameHelperText('이미 존재하는 닉네임입니다.')
      } else {
        setNicknameStatus('valid')
        setNicknameHelperText('')
      }
    } catch (error) {
      showError('닉네임 중복 확인 중 오류가 발생했습니다.')
      console.error('Error:', error)
    }
  }

  // 닉네임 입력 시 실시간으로 유효성 및 중복 검사 수행
  // 디바운스를 적용한 닉네임 변경 핸들러
  const handleNicknameChange = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const nickname = e.target.value
      form.setFieldsValue({ nickname })

      if (checkNicknameValidity(nickname)) {
        await checkNicknameDuplication(nickname)
      }
    },
    300 // 300ms 디바운스
  )

  const handleFinish = async (values: SignupFormValues) => {
    try {
      if (nicknameStatus === 'invalid' || nicknameStatus === 'duplicated') {
        showError('닉네임을 확인해 주세요.')
        return
      }

      const formattedUTCDate = formatBirthDate(values.birthDate)

      const response = await api.post('/api/v1/members/first', {
        nickname: values.nickname,
        birthDate: formattedUTCDate,
        gender: values.gender === 'male' ? 'M' : 'F',
      })

      if (response.message === 'SUCCESS') {
        const { memberId, nickname, profileImagePath } = response.data
        setUser({
          userId: memberId.toString(),
          nickname,
          profileImage: profileImagePath,
        })
        showSuccess('회원가입이 완료되었습니다.')
        setTimeout(() => {
          router.push('/accompany')
        }, 1000)
      } else if (response.message === 'DUPLICATED_NICKNAME') {
        showError('이미 존재하는 닉네임입니다.')
      } else {
        showError('회원가입에 실패했습니다.')
      }
    } catch (error) {
      showError('회원가입에 실패했습니다.')
      console.error('Error:', error)
      router.push('/')
    }
  }

  // "모두 동의" 체크박스 변경 시 처리
  const handleAgreeAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    setAgreeAllChecked(checked)
    const updatedCheckedList = checked
      ? termsOptions.map((option) => option.value)
      : []
    setCheckedList(updatedCheckedList)
    form.setFieldsValue({
      privacyPolicy: checked,
      termsOfService: checked,
    })
  }

  // 개별 체크박스 변경 시 처리
  const handleOptionChange = (value: string) => {
    const updatedCheckedList = checkedList.includes(value)
      ? checkedList.filter((item) => item !== value)
      : [...checkedList, value]
    setCheckedList(updatedCheckedList)
    setAgreeAllChecked(updatedCheckedList.length === termsOptions.length) // 모두 선택되었는지 확인
    form.setFieldsValue({
      privacyPolicy: updatedCheckedList.includes('privacyPolicy'),
      termsOfService: updatedCheckedList.includes('termsOfService'),
    })
  }

  const handleReset = () => {
    form.resetFields()
    setCheckedList([])
    setAgreeAllChecked(false)
    setNicknameStatus(null)
    setNicknameHelperText('')
  }

  // 로딩 중일 때 로딩 스피너를 표시
  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className='w-full p-6 mb-4 flex justify-center items-center flex-col'>
      {contextHolder}
      <h1 className='text-lg font-bold text-black mb-6'>회원가입</h1>
      <div className='flex flex-col gap-8 w-full max-w-md'>
        <Form
          form={form}
          onFinish={handleFinish}
          layout='vertical'
          initialValues={{
            nickname: '', // 기본값을 빈 문자열로 설정하여 undefined 방지
            birthDate: '',
            gender: 'male',
            privacyPolicy: false, // 개인정보 처리방침 기본값
            termsOfService: false, // 이용약관 기본값
          }}
        >
          <Form.Item
            name='nickname'
            label='닉네임'
            validateStatus={
              nicknameStatus === 'invalid' || nicknameStatus === 'duplicated'
                ? 'error'
                : ''
            }
            help={nicknameHelperText} // 헬퍼 텍스트로 오류 메시지 표시
            rules={[
              {
                required: true,
                message: '닉네임을 작성해 주세요.',
              },
            ]}
          >
            <Input
              showCount
              maxLength={20}
              placeholder='닉네임을 작성해 주세요.'
              onChange={handleNicknameChange} // 닉네임이 변경될 때 상태 초기화 및 유효성 검사 수행
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
              placeholder='숫자 8자리를 입력해주세요. 예시 : yyyymmdd'
              maxLength={8}
              style={{ color: '#000' }} // 글자 색상을 검정색으로 설정
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '') // 숫자만 입력되도록 처리
                if (value.length <= 8) {
                  if (value.length === 8) {
                    const formattedDate = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
                    form.setFieldsValue({ birthDate: formattedDate })
                  } else {
                    form.setFieldsValue({ birthDate: value }) // 입력 중일 때 상태 업데이트
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
          {/* 약관 동의 체크박스 */}
          <div className='mt-4 mb-2 space-y-2'>
            <div className='flex items-start gap-2'>
              <Checkbox
                onChange={handleAgreeAllChange}
                checked={agreeAllChecked}
              >
                모두 동의합니다.
              </Checkbox>
            </div>
            <div className='w-full h-px bg-gray-300 my-2' />

            {termsOptions.map((option) => (
              <div key={option.value} className='flex items-start gap-2 ml-3'>
                <Checkbox
                  onChange={() => handleOptionChange(option.value)}
                  checked={checkedList.includes(option.value)}
                >
                  <a
                    href={option.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='no-underline text-gray-700' // 기본 색상으로 변경
                  >
                    {option.label}
                  </a>
                </Checkbox>
              </div>
            ))}
          </div>
          <Form.Item>
            <div className='flex justify-end gap-4'>
              <Button type='default' onClick={handleReset}>
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

export default SignupPage
