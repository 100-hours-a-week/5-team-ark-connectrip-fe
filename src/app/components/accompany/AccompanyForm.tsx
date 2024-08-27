'use client'

// import React, { useState } from 'react'
import { Input, DatePicker, Select, Button, Form } from 'antd'
import { accompanyAreas } from '@/app/data/accompanyAreas'
import dayjs from 'dayjs'
// import { useDebouncedCallback } from 'use-debounce'
// import { api } from '@/app/utils/api'
// import { useCustomMessage } from '@/app/utils/alertUtils'

const { TextArea } = Input

interface AccompanyFormProps {
  initialValues?: {
    title: string
    accompanyArea: string
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    content: string
    customUrl: string | null
  }
  onSubmit: (values: {
    title: string
    accompanyArea: string
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    content: string
    customUrl: string | null
  }) => void
  submitText: string
}

export default function AccompanyForm({
  initialValues,
  onSubmit,
  submitText,
}: AccompanyFormProps) {
  const [form] = Form.useForm()
  // const [customUrlStatus, setCustomUrlStatus] = useState<
  //   'valid' | 'duplicated' | ''
  // >('')
  // const [customUrlHelperText, setCustomUrlHelperText] = useState<string>('')
  // const { showError } = useCustomMessage()

  // 유효한 URL 문자열인지 확인하는 정규식
  // const isValidCustomUrl = (url: string) => {
  //   const regex = /^[a-zA-Z0-9-_~.%/]+$/ // 허용된 문자들만 검증
  //   return regex.test(url)
  // }

  // 디바운스를 적용한 커스텀 URL 변경 핸들러
  // const handleCustomUrlChange = useDebouncedCallback(
  //   async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const customUrl = e.target.value
  //     form.setFieldsValue({ customUrl })

  //     if (customUrl) {
  //       if (!isValidCustomUrl(customUrl)) {
  //         setCustomUrlStatus('')
  //         setCustomUrlHelperText(
  //           '유효하지 않은 문자입니다. URL로 사용할 수 있는 문자만 입력해 주세요.'
  //         )
  //         return
  //       }
  //       await checkCustomUrlDuplication(customUrl)
  //     }
  //   },
  //   300 // 300ms 디바운스
  // )

  // 커스텀 URL 중복 확인 API 호출
  // const checkCustomUrlDuplication = async (customUrl: string) => {
  //   try {
  //     const response = await api.get(
  //       `/api/v1/accompany/posts/check-custom-url?customUrl=${encodeURIComponent(customUrl)}`
  //     )
  //     const message = response.message

  //     if (message === 'DUPLICATED_CUSTOM_URL') {
  //       setCustomUrlStatus('duplicated')
  //       setCustomUrlHelperText('이미 존재하는 커스텀 URL입니다.')
  //       form.setFields([
  //         {
  //           name: 'customUrl',
  //           errors: [
  //             '이미 존재하는 커스텀 URL입니다. 다른 URL을 사용해 주세요.',
  //           ],
  //         },
  //       ])
  //     } else {
  //       setCustom.UrlStatus('valid')
  //       setCustomUrlHelperText('')
  //       form.setFields([
  //         {
  //           name: 'customUrl',
  //           errors: [],
  //         },
  //       ])
  //     }
  //   } catch (error) {
  //     showError('커스텀 URL 중복 확인 중 오류가 발생했습니다.')
  //     console.error('Error:', error)
  //   }
  // }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
      layout='vertical'
    >
      <Form.Item
        name='title'
        label='제목'
        rules={[{ required: true, message: '제목을 입력해 주세요.' }]}
      >
        <Input showCount maxLength={26} placeholder='제목을 입력해 주세요.' />
      </Form.Item>
      <Form.Item
        name='accompanyArea'
        label='동행 지역'
        rules={[{ required: true, message: '동행 지역을 선택해 주세요.' }]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder='동행 지역을 선택해 주세요.'
          optionFilterProp='label'
          options={accompanyAreas.map((area) => ({
            value: area,
            label: area,
          }))}
        />
      </Form.Item>
      <Form.Item name='startDate' label='시작 날짜'>
        <DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
      </Form.Item>
      <Form.Item
        name='endDate'
        label='종료 날짜'
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              const startDate = getFieldValue('startDate')
              if (value && startDate && value < startDate) {
                return Promise.reject(
                  new Error('종료 날짜가 시작 날짜보다 빠를 수 없습니다.')
                )
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
      </Form.Item>
      <Form.Item
        name='content'
        label='내용'
        rules={[{ required: true, message: '내용을 입력해 주세요.' }]}
      >
        <TextArea
          showCount
          maxLength={2000}
          placeholder='내용을 입력해 주세요.'
          style={{ height: 300, resize: 'none' }}
        />
      </Form.Item>
      {/* <Form.Item
        name='customUrl'
        label='커스텀 URL'
        validateStatus={customUrlStatus === 'duplicated' ? 'error' : ''}
        help={customUrlHelperText}
        rules={[
          { required: false, message: '커스텀 URL을 입력해 주세요.' },
          {
            pattern: /^[a-zA-Z0-9-_~.%]+$/,
            message:
              '유효하지 않은 문자입니다. URL로 사용할 수 있는 문자만 입력해 주세요.',
          },
        ]}
      >
        <Input
          addonBefore='https://'
          placeholder='커스텀 URL을 입력해 주세요.'
          onChange={(value) => handleCustomUrlChange(value)}
        />
      </Form.Item> */}
      <Form.Item>
        <div className='flex justify-end gap-4'>
          <Button type='default' onClick={() => form.resetFields()}>
            초기화
          </Button>
          <Button type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
