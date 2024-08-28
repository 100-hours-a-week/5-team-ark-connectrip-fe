import React, { useState } from 'react'
import ProfileIcon from '../common/ProfileIcon'
import { Button, Switch, message } from 'antd'
import useAuthStore from '@/app/store/useAuthStore'
import { CompanionUsers } from '@/interfaces'
interface GuestContent {
  companionUsers: CompanionUsers[] // 동행 참여자 목록
}

const HostContent: React.FC<GuestContent> = ({ companionUsers }) => {
  const { nickname } = useAuthStore() // zustand 스토어에서 유저 닉네임 가져오기
  const [trackingEnabled, setTrackingEnabled] = useState(false)
  // TODO : 내 위치 전송 기능 채팅과 연결 후 주석 삭제
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationLink, setLocationLink] = useState<string | null>(null)

  // 내 위치 추적 스위치 변경 핸들러
  const handleSwitchChange = (checked: boolean) => {
    setTrackingEnabled(checked)
  }

  //  내 위치 전송 핸들러
  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      message.error('위치 정보를 가져올 수 없습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        if (trackingEnabled) {
          const mapNickname = nickname || '사용자'
          const kakaoMapLink = `https://map.kakao.com/link/map/${mapNickname}님의_현재위치,${latitude},${longitude}`
          setLocationLink(kakaoMapLink)
          // TODO : 채팅방에 링크 전송 기능 채팅과 연결 후 주석 삭제
          console.log(kakaoMapLink)
        } else {
          message.error('위치 추적이 비활성화되어 있습니다.')
          console.log('Location sharing is disabled.')
        }
      },
      (error) => {
        console.error('Error fetching location:', error)
        message.error('팝업에서 위치 정보를 허용해주세요.')
      }
    )
  }

  return (
    <div className='flex flex-col gap-3 mb-3'>
      {/* 동행 위치 조회 지도 컴포넌트 */}
      <div className='flex justify-center items-center h-[300px] bg-gray-200'>
        지도 컴포넌트
      </div>
      <div className='flex justify-between items-center'>
        <Button className='w-auto rounded-full' onClick={handleSendLocation}>
          채팅방에 내 위치 전송
        </Button>
        <div className='flex gap-2'>
          <p>내 위치 추적</p>
          <Switch onChange={handleSwitchChange} />
        </div>
      </div>
      {/* 동행 상대 목록 컴포넌트 */}
      <h3>대화 상대</h3>
      <div className='flex flex-col'>
        {companionUsers.map((user) => (
          <div key={user.memberId} className='mb-4'>
            <div className='flex gap-2 items-center'>
              <ProfileIcon
                src={user.memberProfileImage || ''}
                size={33}
                nickname={user.memberNickname}
              />
              <div className='text-m font-semibold'>{user.memberNickname}</div>
            </div>
          </div>
        ))}
      </div>
      <Button type='primary' className='w-full'>
        채팅방 나가기
      </Button>
    </div>
  )
}

export default HostContent
