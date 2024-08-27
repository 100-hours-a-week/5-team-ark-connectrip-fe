// components/LoadingSpinner.tsx

import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function LoadingSpinner() {
  return (
    <div className='flex justify-center items-center h-full'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  )
}
