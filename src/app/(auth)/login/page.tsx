'use client'

import React from 'react'
import Image from 'next/image'

export default function Home() {
  const kakaoLoginHandler = async () => {
    // TODO : 카카오 로그인을 위한 URL을 가져와서 카카오 로그인 페이지로 이동
    const response = await fetch('/_api/kakaoAuth')
    if (response.ok) {
      const kakaoUrl = await response.json()
      window.location.href = kakaoUrl
    } else {
      console.error('카카오 URL을 가져오는데 실패했습니다.')
    }
  }

  return (
    <div className='flex flex-col pb-8 sm:pb-0 sm:w-full'>
      <button
        type='button'
        onClick={kakaoLoginHandler}
        className='flex items-center gap-1.5 h-11 bg-yellow-400 text-[14.5px] font-medium w-full justify-center mt-4'
      >
        <Image src='/kakao.svg' alt='카카오 로그인' width={20} height={20} />
        <div>카카오 로그인</div>
      </button>
    </div>
  )
}
