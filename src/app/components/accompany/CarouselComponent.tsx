import React from 'react'
import { Carousel } from 'antd'
import Image from 'next/image' // next/image 임포트

const CarouselComponent: React.FC = () => {
  // 이미지 데이터를 배열로 정의
  const bannerImages = [
    {
      src: '/connectrip.png',
      alt: '커넥트립 이미지',
      width: 1920,
      height: 1080,
    },
    {
      src: '/yangyang.png',
      alt: '양양 여행 이미지',
      width: 1920,
      height: 1080,
    },
    {
      src: '/jeju.png',
      alt: '제주 여행 이미지',
      width: 1920,
      height: 1080,
    },
  ]

  return (
    <Carousel autoplay autoplaySpeed={4000} draggable>
      {bannerImages.map((image, index) => (
        <div key={index} className='relative w-full rounded-xl'>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className='w-full object-cover rounded-xl'
            priority={index === 0}
            layout='responsive'
          />
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselComponent
