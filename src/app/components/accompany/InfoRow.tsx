// components/InfoRow.tsx
// 여행지, 여행기간 정보 표시 컴포넌트
'use client'

import React from 'react'

interface InfoRowProps {
  icon: React.ReactNode
  text: string
  customStyle?: boolean // 이 prop을 통해 커스텀 스타일을 적용할지 여부를 결정
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  text,
  customStyle = false,
}) => {
  return (
    <div
      className={`flex w-auto items-center space-x-1 text-sm  ${
        customStyle ? 'border border-sub rounded-full px-3 py-1 ' : ''
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  )
}

export default InfoRow
