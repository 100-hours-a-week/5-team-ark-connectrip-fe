import React from 'react'
import { UpCircleFilled } from '@ant-design/icons'

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className='fixed right-[10%] bottom-[10%] bg-white rounded-full cursor-pointer'
      onClick={scrollToTop}
    >
      <UpCircleFilled style={{ color: 'var(--main)', fontSize: '40px' }} />
    </button>
  )
}

export default ScrollToTopButton
