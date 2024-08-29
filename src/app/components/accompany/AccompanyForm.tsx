'use client'

import { Input, DatePicker, Select, Button, Form } from 'antd'
import { accompanyAreas } from '@/app/data/accompanyAreas'
import dayjs from 'dayjs'

const { TextArea } = Input

interface AccompanyFormProps {
  initialValues?: {
    title: string
    accompanyArea: string
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    content: string
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
