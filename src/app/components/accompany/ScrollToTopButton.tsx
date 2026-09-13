'use client'
import React, { useEffect, useState } from 'react'
import { UpCircleFilled } from '@ant-design/icons'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 스크롤이 일정 값 이상 내려가면 버튼을 표시
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && ( // isVisible 상태에 따라 버튼을 렌더링
        <button
          className='fixed right-[10%] bottom-[10%] bg-white rounded-full cursor-pointer'
          onClick={scrollToTop}
        >
          <UpCircleFilled style={{ color: 'var(--main)', fontSize: '40px' }} />
        </button>
      )}
    </>
  )
}

export default ScrollToTopButton
