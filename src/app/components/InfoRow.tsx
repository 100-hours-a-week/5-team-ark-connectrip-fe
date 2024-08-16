// components/InfoRow.tsx
// 여행지, 여행기간 정보 표시 컴포넌트
'use client'

import React from 'react'

interface InfoRowProps {
  icon: React.ReactNode
  text: string
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, text }) => {
  return (
    <div className='flex items-center space-x-1'>
      {icon}
      <span>{text}</span>
    </div>
  )
}

export default InfoRow
