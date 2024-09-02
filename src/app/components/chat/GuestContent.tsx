import React, { useEffect, useMemo, useRef, useState } from 'react'
import ProfileIcon from '../common/ProfileIcon'
import { Button, Switch } from 'antd'
import useAuthStore from '@/app/store/useAuthStore'
import { CompanionUsers } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { leaveChatRoom } from '@/app/utils/fetchUtils'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'
import { Map, CustomOverlayMap, useMap } from 'react-kakao-maps-sdk'
import useKakaoLoader from '@/app/hooks/useKakaoLoader'
import LoadingSpinner from '../common/LoadingSpinner'

const mockData = [
  {
    memberId: 1,
    nickname: '트룰루',
    profileImage:
      'http://k.kakaocdn.net/dn/ZEQvV/btsIzAcVyYL/TkOaaPbnv0jGFEq3idt6Ck/img_640x640.jpg',
    LastLocation: {
      latitude: 37.5665,
      longitude: 126.978,
    },
  },
  {
    memberId: 2,
    nickname: '션말고숀',
    profileImage:
      'http://k.kakaocdn.net/dn/wAv8y/btsJg9GuEd2/F1WBAuNghQpR8u4dMM5Qn1/img_640x640.jpg',
    LastLocation: {
      latitude: 35.1796,
      longitude: 129.0756,
    },
  },
  {
    memberId: 3,
    nickname: '냄뀨뀨',
    profileImage: ' ',
    LastLocation: {
      latitude: 37.4563,
      longitude: 126.7052,
    },
  },
  {
    memberId: 4,
    nickname: '토파즈',
    profileImage:
      'http://k.kakaocdn.net/dn/cr7joo/btsI7OuRmrZ/wm49uKvLgMskVh5ZWWdCVk/m1.jpg',
    LastLocation: {
      latitude: 35.8722,
      longitude: 128.6025,
    },
  },
  {
    memberId: 5,
    nickname: '노노아',
    profileImage: '',
    LastLocation: {
      latitude: 37.5113,
      longitude: 127.098,
    },
  },
]

interface GuestContent {
  companionUsers: CompanionUsers[] // 동행 참여자 목록
  postId: number // 게시글 ID
}

const GuestContent: React.FC<GuestContent> = ({ companionUsers, postId }) => {
  const { nickname, profileImage } = useAuthStore() // zustand 스토어에서 유저 닉네임 가져오기
  const [trackingEnabled, setTrackingEnabled] = useState(false)
  const [locationLink, setLocationLink] = useState<string | null>(null)
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()
  const mapRef = useRef<kakao.maps.Map | null>(null) // 지도 참조를 위해 useRef 사용
  const [loading, setLoading] = useState(false) // 로딩 상태 추가
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
    if (checked) {
      setLoading(true)
      fetchLocation()
    }
  }

  // 내 위치 전송 버튼 클릭 핸들러
  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      showError('위치 정보를 가져올 수 없습니다.')
      return
    } else if (!trackingEnabled) {
      showError('내 위치 추적을 허용해주세요.')
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const mapNickname = nickname || '사용자'
        const { latitude, longitude } = position.coords
        const kakaoMapLink = `https://map.kakao.com/link/map/${mapNickname}님의_현재위치,${latitude},${longitude}`
        setLocationLink(kakaoMapLink)
        console.log(kakaoMapLink)
      },
      (error) => {
        console.error('Error fetching location:', error)
        showError('팝업에서 위치 정보를 허용해주세요.')
      }
    )
  }

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      showError('위치 정보를 가져올 수 없습니다.')
      setLoading(false) // 로딩 종료
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude: latitude, longitude: longitude }) // 위치 저장
        setLoading(false) // 로딩 종료
      },
      (error) => {
        console.error('Error fetching location: ', error)
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

  const allLocations = [
    ...mockData.map((user) => user.LastLocation),
    location,
  ].filter(
    (loc): loc is { latitude: number; longitude: number } => loc !== undefined
  ) // 필터링하여 undefined 제거

  const ReSetttingMapBounds = ({
    points,
  }: {
    points: { latitude: number; longitude: number }[]
  }) => {
    const map = useMap()

    const bounds = useMemo(() => {
      const bounds = new kakao.maps.LatLngBounds()

      points.forEach((point) => {
        bounds.extend(new kakao.maps.LatLng(point.latitude, point.longitude))
      })

      return bounds
    }, [points])

    useEffect(() => {
      if (map && points.length > 0) {
        map.setBounds(bounds) // 지도 범위를 설정
      }
    }, [map, bounds, points])

    return null // 렌더링할 내용 없음
  }

  useEffect(() => {
    if (trackingEnabled && allLocations.length > 0) {
      updateMapBounds()
    }
  }, [trackingEnabled, location])

  const updateMapBounds = () => {
    if (mapRef.current && allLocations.length > 0) {
      const bounds = new kakao.maps.LatLngBounds()

      allLocations.forEach((loc) => {
        if (loc) {
          const point = new kakao.maps.LatLng(loc.latitude, loc.longitude)
          bounds.extend(point)
        }
      })

      mapRef.current.setBounds(bounds)
    }
  }

  return (
    <div className='flex flex-col gap-3 mb-3'>
      {contextHolder}
      {/* 동행 위치 조회 지도 컴포넌트 */}
      <div className='flex justify-center items-center h-[300px] bg-gray-100'>
        {loading ? (
          <LoadingSpinner /> // 로딩 중일 때 스피너 표시
        ) : trackingEnabled && location ? (
          <Map
            id='map'
            center={{
              // 지도의 중심좌표
              lat: 33.450701,
              lng: 126.570667,
            }}
            style={{
              // 지도의 크기
              width: '100%',
              height: '300px',
            }}
            level={3} // 지도의 확대 레벨
            onCreate={(map) => (mapRef.current = map)}
          >
            {/* 사용자 위치 커스텀 오버레이 */}
            <CustomOverlayMap
              position={{ lat: location.latitude, lng: location.longitude }}
            >
              <div className='-top-10 -left-5 w-[40px] h-[40px] rounded-full overflow-hidden bg-main border-main border-2 z-10'>
                <ProfileIcon
                  src={profileImage || ''}
                  size={35}
                  nickname={nickname || ''}
                />
                {/* 핀 모양 삼각형 */}
                <div className='absolute bottom-[-7px] left-1/2 transform -translatitudee-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-main z-0' />
              </div>
            </CustomOverlayMap>

            {/* 동행자들 위치 커스텀 오버레이 */}
            {mockData.map(
              (user) =>
                user.LastLocation && (
                  <CustomOverlayMap
                    position={{
                      lat: user.LastLocation.latitude,
                      lng: user.LastLocation.longitude,
                    }}
                    key={user.memberId}
                  >
                    <div className='-top-10 -left-5 w-[40px] h-[40px] rounded-full overflow-hidden bg-main border-main border-2 z-10'>
                      <ProfileIcon
                        src={user.profileImage || ''}
                        size={35}
                        nickname={user.nickname}
                      />
                      {/* 핀 모양 삼각형 */}
                      <div className='absolute bottom-[-7px] left-1/2 transform -translatitudee-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-main z-0' />
                    </div>
                  </CustomOverlayMap>
                )
            )}
            {allLocations.length > 0 && (
              <ReSetttingMapBounds points={allLocations} />
            )}
          </Map>
        ) : (
          <p className='text-center'>
            내 위치 추적을 허용하면
            <br />
            동행들의 위치를 확인할 수 있어요!
          </p>
        )}
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

export default GuestContent
