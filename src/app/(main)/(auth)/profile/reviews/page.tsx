'use client'
import ProfileCard from '@/app/components/profile/ProfileCard'
import Introduction from '@/app/components/profile/Introduction'
import Reviews from '@/app/components/profile/Reviews'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const mockData = {
  memberId: 2,
  profileImagePath:
    'http://k.kakaocdn.net/dn/rzia4/btsEYPys3Ja/IIpIg8cU6mzrZm2DuNq5SK/img_640x640.jpg',
  nickname: '센세니',
  gender: 'W',
  accompanyCount: 0,
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
        '즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다. 즐거운여행이었습니다.',
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
  ],
  description:
    '트룰루입니다.트룰루입니다트룰루입니다트룰루입니다트룰루입니다트룰루입니다트룰루입니다트룰루입니다트룰루입니다트룰루입니다트룰루입니다트룰루입니다.',
  ageGroup: '20대',
}

export default function ProfilePage() {
  const router = useRouter()

  const handleNavigateToReviews = () => {
    router.push('/profile/reviews')
  }

  return (
    <div className='w-full h-full p-4'>
      <div className='flex flex-col gap-3 mt-5'>
        <h3 className='p-1 text-lg font-bold'>{mockData.nickname} 님의 후기</h3>
        <Reviews reviews={mockData.recentReviews} />
      </div>
    </div>
  )
}
