'use client'
import { ReviewItem } from '@/app/components/profile/ReviewItem'
import { useRouter } from 'next/navigation'
import { LeftOutlined } from '@ant-design/icons'
import useAuthStore from '@/app/store/useAuthStore'
import { useEffect, useState } from 'react'
import { ReviewDetail } from '@/interfaces'
import { fetchUserReviews } from '@/app/utils/fetchUtils'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'

export default function ProfilePage() {
  const router = useRouter()
  const { userId, nickname } = useAuthStore()
  const [reviewDetail, setReviewDetail] = useState<ReviewDetail | null>(null)
  const [loading, setLoading] = useState(true)

  // 유저 리뷰 데이터 가져오기
  const loadUserReviews = async (memberId: number) => {
    try {
      const response = await fetchUserReviews(memberId)
      setReviewDetail(response) // 전체 데이터 객체를 설정
    } catch (error) {
      console.log('유저 리뷰 데이터를 불러오는 중 오류가 발생했습니다:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      loadUserReviews(parseInt(userId))
    }
  }, [userId])

  if (loading) {
    return <LoadingSpinner />
  }

  // reviewDetail이 null이거나 reviews가 비어있을 때 처리
  if (!reviewDetail || reviewDetail.reviewCount === 0) {
    return (
      <div className='w-full mt-20 text-center'>작성된 리뷰가 없습니다.</div>
    )
  }

  return (
    <div className='w-full h-full p-4 mb-20'>
      <div className='flex items-center justify-start gap-2 w-full mb-2'>
        <div
          onClick={() => router.back()}
          className='text-sm cursor-pointer text-secondary hover:text-black'
        >
          <LeftOutlined style={{ fontSize: 16 }} />
        </div>
        <h3 className='p-1 text-lg font-semibold'>
          {nickname} 님의 후기 {reviewDetail.reviewCount}개
        </h3>
      </div>

      <div className='flex flex-col gap-4'>
        {reviewDetail.reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
      </div>
    </div>
  )
}
