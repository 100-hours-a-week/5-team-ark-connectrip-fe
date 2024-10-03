'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { Button } from 'antd'

export default function Home() {
  const searchParams = useSearchParams()
  const { showWarning, contextHolder } = useCustomMessage()
  const [currentImage, setCurrentImage] = useState(1) // 현재 이미지 상태
  const [messageFlag, setMessageFlag] = useState(false)

  // 모든 intro 이미지를 사전 로딩 (필요 시)
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 1; i <= 6; i++) {
        const img = new Image()
        img.src = `/intro/${i}.png` // 이미지 형식에 따라 확장자 변경 가능
      }
    }
    preloadImages()
  }, [])

  // 메시지 표시
  useEffect(() => {
    const message = searchParams.get('message')
    if (!messageFlag && message) {
      setMessageFlag(true)
      showWarning(message) // 경고 메시지 표시
    }
  }, [searchParams, showWarning, messageFlag])

  // 카카오 로그인 핸들러
  const kakaoLoginHandler = async () => {
    try {
      const response = await fetch('/api/kakaoAuth')
      if (response.ok) {
        const { kakaoUrl } = await response.json()
        window.location.href = kakaoUrl
      } else {
        console.error('카카오 URL을 가져오는데 실패했습니다.')
      }
    } catch (error) {
      console.error('카카오 로그인 요청 중 에러 발생:', error)
    }
  }

  // 다음 이미지로 넘어가는 함수
  const nextImage = () => {
    setCurrentImage((prev) => (prev < 6 ? prev + 1 : prev)) // 이미지 인덱스 증가 (1~6)
  }

  // 이전 이미지로 돌아가는 함수
  const previousImage = () => {
    setCurrentImage((prev) => (prev > 1 ? prev - 1 : prev)) // 이미지 인덱스 감소 (1~6)
  }

  // 스킵하기 버튼 클릭 시 호출되는 함수
  const skipToLastPage = () => {
    setCurrentImage(6) // currentImage를 6으로 설정하여 마지막 페이지로 이동
  }

  // 이미지 소스를 메모이제이션
  const imageSrc = useMemo(() => {
    return `/intro/${currentImage === 6 ? 1 : currentImage}.png`
  }, [currentImage])

  return (
    <div className='relative w-full h-screen flex justify-center items-center px-2.5'>
      {contextHolder}

      {/* 메인 이미지 */}
      <img
        src={imageSrc}
        alt={`Intro ${currentImage}`}
        className='absolute inset-0 w-full h-full object-cover z-31'
        loading={currentImage === 1 ? 'eager' : 'lazy'} // 첫 이미지는 즉시 로드, 나머지는 지연 로딩
      />

      {/* 카카오 로그인 버튼 (currentImage가 1 또는 6일 때 표시) */}
      {(currentImage === 1 || currentImage === 6) && (
        <button
          type='button'
          onClick={kakaoLoginHandler}
          className='w-4/5 flex items-center gap-1.5 h-11 bg-yellow-400 text-[14.5px] font-medium justify-center z-40 rounded-xl absolute bottom-[30%]'
        >
          <img
            src='/kakao.svg'
            alt='카카오 로그인'
            width={20}
            height={20}
            loading='eager' // 중요한 이미지이므로 즉시 로드
          />
          <div>카카오 로그인</div>
        </button>
      )}

      {/* 이전 및 다음 버튼 추가 */}
      <div className='absolute bottom-[19%] flex justify-center space-x-4 z-40'>
        {currentImage > 1 && (
          <Button type='primary' onClick={previousImage}>
            &lt;
          </Button>
        )}
        {currentImage >= 2 && currentImage <= 5 && (
          <Button type='primary' onClick={skipToLastPage}>
            SKIP
          </Button>
        )}
        {currentImage < 6 && (
          <Button type='primary' onClick={nextImage}>
            &gt;
          </Button>
        )}
      </div>
    </div>
  )
}

// 'use client'

// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import Image from 'next/image'
// import { useCustomMessage } from '@/app/utils/alertUtils'
// import { Button } from 'antd'

// export default function Home() {
//   const searchParams = useSearchParams()
//   const { showWarning, contextHolder } = useCustomMessage()
//   const [currentImage, setCurrentImage] = useState(1) // 현재 이미지 상태
//   const [messageFlag, setMessageFlag] = useState(false)

//   useEffect(() => {
//     const message = searchParams.get('message')
//     if (!messageFlag && message) {
//       setMessageFlag(true)
//       showWarning(message) // 경고 메시지 표시
//     }
//   }, [searchParams, showWarning])

//   const kakaoLoginHandler = async () => {
//     const response = await fetch('/api/kakaoAuth')
//     if (response.ok) {
//       const kakaoUrl = await response.json()
//       window.location.href = kakaoUrl
//     } else {
//       console.error('카카오 URL을 가져오는데 실패했습니다.')
//     }
//   }

//   // 다음 이미지로 넘어가는 함수
//   const nextImage = () => {
//     setCurrentImage((prev) => (prev < 6 ? prev + 1 : prev)) // 이미지 인덱스 증가 (1~6)
//   }

//   // 이전 이미지로 돌아가는 함수
//   const previousImage = () => {
//     setCurrentImage((prev) => (prev > 1 ? prev - 1 : prev)) // 이미지 인덱스 감소 (1~6)
//   }

//   // 스킵하기 버튼 클릭 시 호출되는 함수
//   const skipToLastPage = () => {
//     setCurrentImage(6) // currentImage를 6으로 설정하여 마지막 페이지로 이동
//   }

//   return (
//     <div className='relative w-full h-screen flex justify-center items-center px-2.5'>
//       {contextHolder}
//       <Image
//         src={`/intro/${currentImage === 6 ? 1 : currentImage}.png`}
//         alt={`Intro ${currentImage}`}
//         fill // Next.js 13 이상에서는 fill 속성 사용
//         style={{ objectFit: 'cover', zIndex: 31 }} // 이미지 비율 유지하며 컨테이너에 맞춤
//         priority={true} // 이미지 로딩 우선순위 설정
//       />

//       {/* 카카오 로그인 버튼 (currentImage가 1 또는 6일 때 표시) */}
//       {(currentImage === 1 || currentImage === 6) && (
//         <button
//           type='button'
//           onClick={kakaoLoginHandler}
//           className='w-4/5 flex items-center gap-1.5 h-11 bg-yellow-400 text-[14.5px] font-medium justify-center z-40 rounded-xl absolute bottom-[30%]'
//         >
//           <Image
//             src='/kakao.svg'
//             alt='카카오 로그인'
//             width={20}
//             height={20}
//             priority={true}
//           />
//           <div>카카오 로그인</div>
//         </button>
//       )}

//       {/* 스킵하기 버튼 (currentImage가 2~5일 때 표시) */}

//       {/* 이전 및 다음 버튼 추가 */}
//       <div className='absolute bottom-[19%] flex justify-center space-x-4 z-40'>
//         {currentImage > 1 && (
//           <Button type='primary' onClick={previousImage}>
//             &lt;
//           </Button>
//         )}
//         {currentImage >= 2 && currentImage <= 5 && (
//           <Button type='primary' onClick={skipToLastPage}>
//             <div>SKIP</div>
//           </Button>
//         )}
//         {currentImage < 6 && (
//           <Button type='primary' onClick={nextImage}>
//             &gt;
//           </Button>
//         )}
//       </div>
//     </div>
//   )
// }
