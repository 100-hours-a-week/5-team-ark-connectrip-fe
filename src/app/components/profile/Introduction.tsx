'use client'
import { CloudOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons'

interface IntroductionProps {
  ageGroup: string
  gender: string
  description: string
}

export default function Introduction({
  ageGroup,
  gender,
  description,
}: IntroductionProps) {
  return (
    <div className='flex flex-col justify-center items-start gap-3 p-2 mt-5  border-b border-gray-300'>
      <div className='flex items-center gap-3'>
        <CloudOutlined />
        <span>나이 : {ageGroup}</span>
      </div>
      <div className='flex items-center gap-3'>
        {gender === 'M' && (
          <>
            <ManOutlined />
            <span>성별 : 남자</span>
          </>
        )}
        {gender === 'W' && (
          <>
            <WomanOutlined />
            <span>성별 : 여자</span>
          </>
        )}
      </div>
      {description && (
        <div className='flex items-center mt-1 pb-7 white'>
          <div style={{ whiteSpace: 'pre-wrap' }}>{description}</div>
        </div>
      )}
    </div>
  )
}
