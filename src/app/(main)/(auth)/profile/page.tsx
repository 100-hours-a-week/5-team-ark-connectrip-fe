'use client'
import ProfileCard from '@/app/components/profile/ProfileCard'
import Introduction from '@/app/components/profile/Introduction'
import Reviews from '@/app/components/profile/Reviews'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/app/store/useAuthStore'
import { useEffect, useState } from 'react'
import { fetchUserProfile } from '@/app/utils/fetchUtils'
import LoadingSpinner from '@/app/components/common/LoadingSpinner'
import { ProfileData } from '@/interfaces'
import { LeftOutlined } from '@ant-design/icons'

export default function ProfilePage() {
  const router = useRouter()
  const { userId } = useAuthStore()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        if (!userId) return
        const data = await fetchUserProfile(parseInt(userId))
        setProfileData(data)
      } catch (error) {
        console.error('프로필 데이터를 불러오는 중 오류가 발생했습니다:', error)
      }
    }

    loadProfileData()
  }, [userId])

  const handleNavigateToReviews = () => {
    router.push('/profile/reviews')
  }

  const handleEditToProfile = () => {
    router.push('/profile/edit')
  }

  if (!profileData) {
    return <LoadingSpinner />
  }

  return (
    <div className='w-full h-full p-4 overflow-auto mb-12'>
      <div className='flex justify-between'>
        <div
          onClick={() => router.back()}
          className='text-sm cursor-pointer text-secondary hover:text-black pl-1 text-left mb-2'
        >
          <LeftOutlined style={{ fontSize: 16 }} />
        </div>
        <p
          className='underline underline-offset-2 hover:text-gray-600 cursor-pointer'
          onClick={handleEditToProfile}
        >
          수정하기
        </p>
      </div>
      <ProfileCard
        profileImage={profileData.profileImagePath}
        nickname={profileData.nickname}
        accompanyCount={profileData.accompanyCount || 0} // Provide a default value of 0
        reviewCount={profileData.reviewCount || 0} // Provide a default value of 0
      />

      <Introduction
        ageGroup={profileData.ageGroup}
        gender={profileData.gender || ''}
        description={profileData.description}
      />
      <div className='flex flex-col gap-3 mt-5'>
        <h3 className='p-1 text-lg font-bold'>
          {profileData.nickname} 님의 후기
        </h3>
        <Reviews reviews={profileData.recentReviews} />
      </div>
      {profileData.recentReviews.length === 0 ? (
        <div className='text-center text-base text-gray-500 mt-10'>
          작성된 후기가 없습니다.
        </div>
      ) : (
        <Button
          type='primary'
          className='w-full mt-4 mb-4'
          onClick={handleNavigateToReviews}
        >
          후기 더 표시하기
        </Button>
      )}
    </div>
  )
}
