import React from 'react'
import { Popover } from 'antd'

interface PopoverContentProps {
  title: string
  children: React.ReactNode
}

const PopoverContent: React.FC<PopoverContentProps> = ({ title, children }) => {
  return (
    <Popover
      placement='top'
      title={<span>{title}</span>}
      content={
        <div>
          <p>위치공유를 허용하면 동행자들에게 위치가 공유됩니다.</p>
          <p>Off하면 언제든 공유를 중단할 수 있어요.</p>
          <p>방마다 위치공유 설정을 따로 관리할 수 있습니다.</p>
        </div>
      }
    >
      {children}
    </Popover>
  )
}

export default PopoverContent
