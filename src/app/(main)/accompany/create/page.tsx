'use client'

import React from 'react'
import { Input, DatePicker, Select, Button, Form } from 'antd'
import { accompanyAreas } from '@/app/data/accompanyAreas'
import { formatFormData } from '@/app/utils/formUtils'
import { useRouter } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils' // 메시지 유틸리티 가져오기
import dayjs from 'dayjs'
import { api } from '@/app/utils/api'

const { TextArea } = Input

export default function CreateAccompanyPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const { contextHolder, showSuccess, showError } = useCustomMessage() // 커스텀 메시지 훅 사용

  const handleFinish = async (values: {
    title: string
    accompanyArea: string
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    content: string
    customUrl: string | null
  }) => {
    try {
      const formData = formatFormData(values) // 유틸리티 함수 사용하여 데이터 처리
      console.log(formData)
      const response = await api.post(`/api/v1/accompany/posts`, formData) // API 호출
      console.log('게시글 작성 응답:', response)

      // 성공 alert 표시
      showSuccess('게시글 작성이 완료되었습니다.')
      // alert 보여주기 위해 1초 뒤에 페이지 이동
      setTimeout(() => {
        router.push('/accompany')
      }, 1000) // 1초(1000ms) 후에 페이지 이동
    } catch (error) {
      showError('게시글 작성에 실패했습니다.')
      console.error('Error:', error)
    }
  }

  return (
    <div className='w-full p-6 mb-4'>
      {contextHolder} {/* alert 표시를 위한 컨텍스트 */}
      <h1 className='text-lg font-bold text-black'>동행 게시글 작성</h1>
      <div className='flex flex-col gap-8 w-full'>
        <Form form={form} onFinish={handleFinish} layout='vertical'>
          <Form.Item
            name='title'
            label='제목'
            rules={[{ required: true, message: '제목을 입력해 주세요.' }]}
          >
            <Input
              showCount
              maxLength={26}
              placeholder='제목을 입력해 주세요.'
            />
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
          <Form.Item name='customUrl' label='커스텀 URL'>
            <Input
              addonBefore='https://'
              placeholder='커스텀 URL을 입력해 주세요.'
            />
          </Form.Item>
          <Form.Item>
            <div className='flex justify-end gap-4'>
              <Button type='default' onClick={() => form.resetFields()}>
                게시글 초기화
              </Button>
              <Button type='primary' htmlType='submit'>
                작성
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
