'use client'
import { Carousel } from 'antd'
import { ReviewItem } from './ReviewItem'

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
      {reviews.map((review) => (
        <ReviewItem key={review.reviewId} review={review} />
      ))}
    </Carousel>
  )
}
