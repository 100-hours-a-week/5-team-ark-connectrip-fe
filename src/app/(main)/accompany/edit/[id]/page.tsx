// /accompany/edit/[id]/page.tsx

'use client'

import React, { useEffect } from 'react'
import { Input, DatePicker, Select, Button, Form } from 'antd'
import { accompanyAreas } from '@/app/data/accompanyAreas'
import { formatFormData } from '@/app/utils/formUtils'
import { useRouter, useParams } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils'
import dayjs from 'dayjs'
import { mockData } from '@/app/data/mockDataPost' // mockData import

const { TextArea } = Input

export default function EditAccompanyPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const { id } = useParams() // 동적 라우팅에서 id 가져오기
  const { contextHolder, showSuccess, showError } = useCustomMessage()

  useEffect(() => {
    // mockData에서 해당 id에 맞는 데이터 찾기
    const post = mockData.find((item) => item.id === parseInt(id as string, 10))

    if (post) {
      // 폼 초기값 설정
      form.setFieldsValue({
        title: post.title,
        accompany_area: post.accompany_area,
        startDate: dayjs(post.start_date),
        endDate: dayjs(post.end_date),
        content: post.content,
        custom_url: post.custom_url,
      })
    }
  }, [id, form])

  const handleFinish = (values: {
    title: string
    accompany_area: string
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    content: string
    custom_url: string | null
  }) => {
    try {
      const formData = formatFormData(values)
      console.log('formData:', formData)

      // 실제 API 요청을 보낼 예정 (예: await api.updateForm(formData, id);)
      // 성공 alert 표시
      showSuccess('게시글 수정이 완료되었습니다.')

      // alert 보여주기 위해 1초 뒤에 페이지 이동
      setTimeout(() => {
        router.push('/accompany')
      }, 1000) // 1초(1000ms) 후에 페이지 이동
    } catch (error) {
      showError('게시글 수정에 실패했습니다.')
      console.error('Error:', error)
    }
  }

  return (
    <div className='w-full p-6 mb-4'>
      {contextHolder} {/* alert 표시를 위한 컨텍스트 */}
      <h1 className='text-lg font-bold text-black'>동행 게시판 수정</h1>
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
            name='accompany_area'
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
          <Form.Item name='custom_url' label='커스텀 URL'>
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
                수정
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
