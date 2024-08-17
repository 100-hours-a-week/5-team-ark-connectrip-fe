'use client'

import React, { useState } from 'react'
import { Input, DatePicker, Select, Button, Form } from 'antd'
import { accompanyAreas } from '@/app/data/accompanyAreas'

const { TextArea } = Input

export default function CreateAccompanyPage() {
  const [form] = Form.useForm()
  const [helperText, setHelperText] = useState<string | null>(null)

  const handleFinish = (values: {
    title: string
    accompany_area: string
    startDate: Date | null
    endDate: Date | null
    content: string
    custom_url: string | null
  }) => {
    let { title, accompany_area, startDate, endDate, content, custom_url } =
      values

    // 날짜 처리 로직
    if (!startDate && !endDate) {
      // 둘 다 입력되지 않은 경우 null로 설정
      startDate = null
      endDate = null
    } else if (!startDate && endDate) {
      // 시작 날짜가 없고 종료 날짜만 있는 경우, 종료 날짜와 동일하게 설정
      startDate = endDate
    } else if (startDate && !endDate) {
      // 종료 날짜가 없고 시작 날짜만 있는 경우, 시작 날짜와 동일하게 설정
      endDate = startDate
    }

    // 커스텀 url 처리 로직
    if (custom_url) {
      custom_url = `https://ex.com/${custom_url}` // 커스텀 url 앞에 https:// 붙이기
    } else {
      custom_url = null // 커스텀 url이 입력되지 않은 경우 null로 설정
    }

    // 폼 데이터 구성
    const formData = {
      title,
      accompany_area,
      content,
      start_date: startDate,
      end_date: endDate,
      custom_url,
    }

    // 콘솔에 데이터 출력
    console.log(JSON.stringify(formData, null, 2))
  }

  return (
    <div className='w-full p-6 mb-4'>
      <h1 className='text-lg font-bold text-black'>동행 게시판 작성</h1>
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
          {helperText && <p>{helperText}</p>}
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
                취소
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
