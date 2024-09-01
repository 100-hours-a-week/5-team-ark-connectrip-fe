import React, { useState } from 'react'
import ProfileIcon from '../common/ProfileIcon'
import { Button, Switch } from 'antd'
import useAuthStore from '@/app/store/useAuthStore'
import { CompanionUsers } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { leaveChatRoom } from '@/app/utils/fetchUtils'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import useKakaoLoader from '@/app/hooks/useKakaoLoader'

interface GuestContent {
  companionUsers: CompanionUsers[] // 동행 참여자 목록
  postId: number // 게시글 ID
}

const HostContent: React.FC<GuestContent> = ({ companionUsers, postId }) => {
  const { nickname } = useAuthStore() // zustand 스토어에서 유저 닉네임 가져오기
  const [trackingEnabled, setTrackingEnabled] = useState(false)
  // TODO : 내 위치 전송 기능 채팅과 연결 후 주석 삭제
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationLink, setLocationLink] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  })
  const router = useRouter()
  const handleDeleteClick = useHandleDeleteClick() // 모달 호출 유틸리티 사용
  const { contextHolder, showSuccess, showWarning, showError } =
    useCustomMessage()
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)
  // 카카오 지도 로더 훅 사용
  useKakaoLoader()

  // 내 위치 추적 스위치 변경 핸들러
  const handleSwitchChange = (checked: boolean) => {
    setTrackingEnabled(checked)
  }

  //  내 위치 전송 핸들러
  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      showError('위치 정보를 가져올 수 없습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        if (trackingEnabled) {
          const mapNickname = nickname || '사용자'
          const kakaoMapLink = `https://map.kakao.com/link/map/${mapNickname}님의_현재위치,${latitude},${longitude}`
          setLocationLink(kakaoMapLink)
          setLocation({ lat: latitude, lng: longitude }) // 위치 저장
          // TODO : 채팅방에 링크 전송 기능 채팅과 연결 후 주석 삭제
          console.log(kakaoMapLink)
        } else {
          showError('위치 추적이 비활성화되어 있습니다.')
          console.log('Location sharing is disabled.')
        }
      },
      (error) => {
        console.error('Error fetching location:', error)
        showError('팝업에서 위치 정보를 허용해주세요.')
      }
    )
  }

  // 채팅방 나가기 기능을 수행하는 함수
  const handleLeaveGroup = async () => {
    try {
      await leaveChatRoom(chatRoomId)
      showSuccess('채팅방에서 나가셨습니다.')
    } catch (error) {
      console.error('그룹방 나가기 중 오류 발생:', error)
    }
  }

  return (
    <div className='flex flex-col gap-3 mb-3'>
      {contextHolder}
      {/* 동행 위치 조회 지도 컴포넌트 */}
      <div className='flex justify-center items-center h-[300px] bg-gray-200'>
        <Map
          id='map'
          center={location} // 저장된 위치 사용
          style={{
            width: '100%',
            height: '300px', // 높이 조정
          }}
          level={3}
        >
          {/* 마커 생성 */}
          <MapMarker
            position={location}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
              size: {
                // 마커이미지의 크기
                width: 64,
                height: 69,
              },
              // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
              options: {
                offset: {
                  x: 27,
                  y: 69,
                },
              },
            }}
          />
        </Map>
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
      <Button
        type='primary'
        className='w-full'
        onClick={() => router.push(`/accompany/${postId}`)}
      >
        모집 게시글로 이동
      </Button>
      <Button
        type='primary'
        className='w-full'
        onClick={() => handleDeleteClick('채팅방', '/chat', handleLeaveGroup)}
      >
        채팅방 나가기
      </Button>
    </div>
  )
}

export default HostContent
