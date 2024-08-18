import React from 'react'
import { Input } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { copyToClipboard } from '@/app/utils/clipboardUtils'

interface UrlInputProps {
  label: string
  url: string
}

const UrlInput: React.FC<UrlInputProps> = ({ label, url }) => (
  <Input
    addonBefore={label}
    value={url}
    readOnly
    suffix={
      <CopyOutlined
        onClick={() => copyToClipboard(url)}
        className='cursor-pointer'
      />
    }
    className='mb-3'
  />
)

export default UrlInput
