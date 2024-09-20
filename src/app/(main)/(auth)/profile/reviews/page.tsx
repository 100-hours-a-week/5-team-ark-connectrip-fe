'use client'
import { ReviewItem } from '@/app/components/profile/ReviewItem'
import Reviews from '@/app/components/profile/Reviews'
import { useRouter } from 'next/navigation'
import { LeftOutlined } from '@ant-design/icons'

const mockData = {
  memberId: 2,
  nickname: '센세니',
  reviewCount: 5,
  recentReviews: [
    {
      reviewId: 9,
      content: '성격도 너무 잘맞고 즐거운 여행이었어요! 다음에 또 같이 가요~',
      reviewerNickname: '트룰루',
      reviewerProfile: null,
      reviewerId: 7,
      createdAt: '2024-09-16T12:02:51Z',
    },
    {
      reviewId: 8,
      content:
        '즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. ',
      reviewerNickname: '뿡박사님을 아세요',
      reviewerProfile: null,
      reviewerId: 6,
      createdAt: '2024-09-11T04:02:35Z',
    },
    {
      reviewId: 7,
      content: '즐거웠고, 다신 보지 말자',
      reviewerNickname: '제푸푸',
      reviewerProfile: null,
      reviewerId: 5,
      createdAt: '2024-09-11T04:02:21Z',
    },
    {
      reviewId: 6,
      content: '다음에 또 같이 가요~',
      reviewerNickname: '노아노아노아',
      reviewerProfile: null,
      reviewerId: 4,
      createdAt: '2024-09-11T04:02:21Z',
    },
    {
      reviewId: 5,
      content: '다음에 또 같이 가요~',
      reviewerNickname: '파즈',
      reviewerProfile: null,
      reviewerId: 3,
      createdAt: '2024-09-11T04:02:21Z',
    },
  ],
}

export default function ProfilePage() {
  const router = useRouter()

  // const handleNavigateToReviews = () => {
  //   router.push('/profile/reviews')
  // }

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
          {mockData.nickname} 님의 후기 {mockData.reviewCount}개
        </h3>
      </div>

      <div className='flex flex-col gap-4 '>
        {mockData.recentReviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
      </div>
    </div>
  )
}
