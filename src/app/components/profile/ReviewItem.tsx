import { useTimeStamp } from '@/app/hooks/useTimeStamp'
import ProfileIcon from '../common/ProfileIcon'
import { navigateToProfile } from '@/app/utils/naviateToProfile'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/app/store/useAuthStore'
import { Review } from '@/interfaces'

// 리뷰 아이템 컴포넌트
export function ReviewItem({ review }: { review: Review }) {
  const timeAgo = useTimeStamp(review.createdAt) // 각 리뷰의 createdAt에 대해 useTimeStamp 호출
  const router = useRouter()
  const { userId } = useAuthStore()

  return (
    <div
      key={review.reviewId}
      className='flex flex-col gap-2 p-4 px-6 justify-center border border-gray-200 h-[170px] p-2 rounded-xl'
    >
      <div className='flex flex-col h-[90px]'>
        <div className='text-sm'>{review.content}</div>
      </div>
      <div className='flex gap-3'>
        <ProfileIcon
          src={review.reviewerProfile || ''}
          size={40}
          nickname={review.reviewerNickname}
          onClick={() =>
            navigateToProfile(router, review.reviewerId, userId ? userId : '')
          }
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
}
