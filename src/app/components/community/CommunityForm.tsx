'use client'

import { Input, Form, Button } from 'antd'

const { TextArea } = Input

interface CommunityFormProps {
  initialValues?: {
    title: string
    content: string
  }
  onSubmit: (values: { title: string; content: string }) => void
  submitText: string
}

export default function CommunityForm({
  initialValues,
  onSubmit,
  submitText,
}: CommunityFormProps) {
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
