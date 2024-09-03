'use client'

import React from 'react'
import { Carousel } from 'antd'

const CarouselComponent: React.FC = () => {
  // 이미지 데이터를 배열로 정의
  const bannerImages = [
    { src: '/banner/connectrip.svg', alt: '우리 동행의 시작, 커넥트립' },
    { src: '/banner/yangyang.svg', alt: '양양 여행 이미지' },
    { src: '/banner/jeju.svg', alt: '제주 여행 이미지' },
  ]

  return (
    <Carousel autoplay autoplaySpeed={4000} draggable>
      {bannerImages.map((image, index) => (
        <div key={index} className='relative w-full rounded-xl'>
          <img
            src={image.src}
            alt={image.alt}
            className='w-full object-cover rounded-xl'
          />
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselComponent
