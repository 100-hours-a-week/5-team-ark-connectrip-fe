// page.tsx

'use client'

import React from 'react'
import Image from 'next/image'

export default function Home() {
  const kakaoLoginHandler = async () => {
    const response = await fetch('/api/kakaoAuth') // 변경된 경로
    if (response.ok) {
      const kakaoUrl = await response.json()
      window.location.href = kakaoUrl
    } else {
      console.error('카카오 URL을 가져오는데 실패했습니다.')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center bg-white p-[30px] w-full max-w-[400px] h-[300px] rounded-xl shadow-2xl'>
      <div className='text-center mb-4 box-border p-[30px]'>
        <h1 className='text-l font-semibold mt-4 mb-4'>커넥트립</h1>
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
          <Image src='/kakao.svg' alt='카카오 로그인' width={20} height={20} />
          <div>카카오 로그인</div>
        </button>
      </div>
    </div>
  )
}
