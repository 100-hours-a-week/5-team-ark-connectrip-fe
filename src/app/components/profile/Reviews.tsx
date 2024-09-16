'use client'
import { Carousel } from 'antd'
import ProfileIcon from '@/app/components/common/ProfileIcon'
import { useTimeStamp } from '@/app/hooks/useTimeStamp'

interface Review {
  reviewId: number
  content: string
  reviewerNickname: string
  reviewerProfile: string | null
  createdAt: string
}

interface ReviewsProps {
  reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <Carousel
      className='custom-carousel'
      draggable
      arrows
      dots={false}
      infinite={false}
    >
      {reviews.map((review) => {
        const timeAgo = useTimeStamp(review.createdAt) // 각 리뷰의 createdAt에 대해 useTimeStamp 호출
        return (
          <div
            key={review.reviewId}
            className='flex gap-2 p-4 px-6 justify-center border border-gray-200 h-[170px] p-2 rounded-xl'
          >
            <div className='flex flex-col h-[90px]'>
              <div className='text-sm'>{review.content}</div>
            </div>
            <div className='flex gap-3'>
              <ProfileIcon
                src={review.reviewerProfile || ''}
                size={40}
                nickname={review.reviewerNickname}
              />
              <div className='flex flex-col justify-end items-start'>
                <div className='text-sm font-semibold '>
                  {review.reviewerNickname}
                </div>
                {/* 시간 표시 */}
                <div className='text-s text-gray-600'>{timeAgo}</div>
              </div>
            </div>
          </div>
        )
      })}
    </Carousel>
  )
}
