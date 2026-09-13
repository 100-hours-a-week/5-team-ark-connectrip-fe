// components/NicknameInput.tsx
'use client'

import React, { useState } from 'react'
import { Input, Form } from 'antd'
import { useDebouncedCallback } from 'use-debounce'
import { api } from '@/app/utils/api'
import { NicknameStatus } from '@/types'
import { useCustomMessage } from '@/app/utils/alertUtils'

interface NicknameInputProps {
  defaultValue?: string
  onNicknameChange: (nickname: string) => void
}

export const NicknameInput: React.FC<NicknameInputProps> = ({
  defaultValue = '',
  onNicknameChange,
}) => {
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>(null)
  const [nicknameHelperText, setNicknameHelperText] = useState<string>('')
  const { showError } = useCustomMessage()

  // 닉네임 유효성 확인
  const checkNicknameValidity = (nickname: string) => {
    if (!nickname) {
      setNicknameStatus('invalid')
      setNicknameHelperText('닉네임을 입력해 주세요.')
      return false
    }
    if (
      nickname.length < 3 ||
      nickname.length > 10 ||
      /[^가-힣a-zA-Z0-9\s]/.test(nickname)
    ) {
      setNicknameStatus('invalid')
      setNicknameHelperText(
        '닉네임은 3자 이상, 10자 이하이며, 특수 문자 없이 작성해 주세요.'
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
  const handleNicknameChange = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const nickname = e.target.value

      if (checkNicknameValidity(nickname)) {
        await checkNicknameDuplication(nickname)
      }

      onNicknameChange(nickname) // 부모 컴포넌트로 닉네임 변경 사항 전달
    },
    300 // 300ms 디바운스
  )

  return (
    <Form.Item
      name='nickname'
      label='닉네임'
      validateStatus={
        nicknameStatus === 'invalid' || nicknameStatus === 'duplicated'
          ? 'error'
          : ''
      }
      help={nicknameHelperText}
      initialValue={defaultValue} // 초기 닉네임 값 설정
      required
    >
      <Input
        showCount
        maxLength={10}
        placeholder='닉네임을 입력해 주세요.'
        onChange={handleNicknameChange}
        defaultValue={defaultValue}
      />
    </Form.Item>
  )
}

export default NicknameInput
