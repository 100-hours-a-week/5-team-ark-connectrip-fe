'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useCustomMessage } from '@/app/utils/alertUtils'

export default function Home() {
  const searchParams = useSearchParams()
  const { showWarning, contextHolder } = useCustomMessage()

  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      showWarning(message) // 경고 메시지 표시
    }
  }, [searchParams, showWarning])

  const kakaoLoginHandler = async () => {
    const response = await fetch('/api/kakaoAuth')
    if (response.ok) {
      const kakaoUrl = await response.json()
      window.location.href = kakaoUrl
    } else {
      console.error('카카오 URL을 가져오는데 실패했습니다.')
    }
  }

  return (
    <div className='h-full flex justify-center items-center '>
      {contextHolder}
      <div className='flex flex-col justify-center items-center bg-white p-[30px] mt-[-50px] w-full max-w-[400px] h-[350px] rounded-xl shadow-2xl'>
        <div className='text-center mb-2 box-border p-[30px]'>
          <h1 className='text-l font-semibold mt-4 mb-2'>👋 커넥트립</h1>
          <p className='text-base text-black mb-4'>
            국내 여행 동행 찾기 서비스 <br />
          </p>
          <p className='text-base text-secondary'>
            간편하게 로그인하고 <br />
            다양한 서비스를 이용해보세요.
          </p>
        </div>
        <div className='flex flex-col w-full'>
          <button
            type='button'
            onClick={kakaoLoginHandler}
            className='flex items-center gap-1.5 h-11 bg-yellow-400 text-[14.5px] font-medium w-full justify-center'
          >
            <Image
              src='/kakao.svg'
              alt='카카오 로그인'
              width={20}
              height={20}
            />
            <div>카카오 로그인</div>
          </button>
        </div>
      </div>
    </div>
  )
}
