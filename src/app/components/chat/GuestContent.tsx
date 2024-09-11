import ProfileIcon from '../common/ProfileIcon'
import { Button, Switch, Tag } from 'antd'
import useAuthStore from '@/app/store/useAuthStore'
import { CompanionUsers } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'
import useKakaoLoader from '@/app/hooks/useKakaoLoader'
import { leaveChatRoom } from '@/app/utils/fetchUtils'
import { useWebSocketClient } from '@/app/hooks/useWebSocketClient' // WebSocket 훅 import
import { sendLeaveMessage } from '@/app/utils/sendLeaveMessage'
import MapComponent from './MapComponent'
import { useMemo, useState } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import { sendLocationMessage } from '@/app/utils/sendLocationMessage'

interface GuestContentProps {
  companionUsers: CompanionUsers[] // 동행 참여자 목록
  postId: number // 게시글 ID
  isPostExists: boolean // 게시글 존재 여부
  leaderId: number // 방장 ID
}

const mockData = [
  {
    memberId: 1,
    nickname: '트룰루',
    profileImage:
      'http://k.kakaocdn.net/dn/ZEQvV/btsIzAcVyYL/TkOaaPbnv0jGFEq3idt6Ck/img_640x640.jpg',
    LastLocation: { latitude: 37.5665, longitude: 126.978 },
  },
  {
    memberId: 2,
    nickname: '션말고숀',
    profileImage:
      'http://k.kakaocdn.net/dn/wAv8y/btsJg9GuEd2/F1WBAuNghQpR8u4dMM5Qn1/img_640x640.jpg',
    LastLocation: { latitude: 35.1796, longitude: 129.0756 },
  },
  {
    memberId: 3,
    nickname: '냄뀨뀨',
    profileImage: ' ',
    LastLocation: { latitude: 37.4563, longitude: 126.7052 },
  },
  {
    memberId: 4,
    nickname: '토파즈',
    profileImage:
      'http://k.kakaocdn.net/dn/cr7joo/btsI7OuRmrZ/wm49uKvLgMskVh5ZWWdCVk/m1.jpg',
    LastLocation: { latitude: 35.8722, longitude: 128.6025 },
  },
  {
    memberId: 5,
    nickname: '노노아',
    profileImage: '',
    LastLocation: { latitude: 37.5113, longitude: 127.098 },
  },
]

const GuestContent: React.FC<GuestContentProps> = ({
  companionUsers,
  postId,
  isPostExists,
  leaderId,
}) => {
  const { nickname, userId, profileImage } = useAuthStore() // zustand 스토어에서 유저 닉네임 가져오기
  const [trackingEnabled, setTrackingEnabled] = useState(false)
  // TODO : 위치 정보 전송 시, 링크를 저장할 수 있는 상태 추가  - 관련 로직 추가 후 삭제 필요
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationLink, setLocationLink] = useState<string | null>(null)
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  }>()
  const [loading, setLoading] = useState(false) // 로딩 상태 추가
  const router = useRouter()
  const handleDeleteClick = useHandleDeleteClick() // 모달 호출 유틸리티 사용
  const { contextHolder, showSuccess, showError } = useCustomMessage()
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)
  useKakaoLoader() // 카카오 지도 로더 훅 사용

  const handleSwitchChange = (checked: boolean) => {
    setTrackingEnabled(checked)
    if (checked) {
      setLoading(true)
      fetchLocation() // 위치를 가져오고, 이후에 지도 업데이트
    }
  }

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
        const kakaoMapLink = `https://map.kakao.com/link/map/${mapNickname}_님의_현재위치,${latitude},${longitude}`

        setLocationLink(kakaoMapLink)
        setLocation({ latitude, longitude })
        console.log('Location:', kakaoMapLink)
        // WebSocket으로 위치 정보 전송
        try {
          sendLocationMessage({
            clientRef,
            chatRoomId,
            userId,
            locationLink: kakaoMapLink,
          })
          showSuccess('위치 정보가 채팅방에 전송되었습니다.')
        } catch (error) {
          console.error('위치 정보를 전송하는 중 오류 발생:', error)
          showError('위치 정보를 전송하는 중 문제가 발생했습니다.')
        }
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
        setLocation({ latitude, longitude }) // 위치 저장
        setLoading(false) // 로딩 종료
      },
      (error) => {
        console.error('Error fetching location: ', error)
        showError('팝업에서 위치 정보를 허용해주세요.')
        setLoading(false) // 로딩 종료
      }
    )
  }

  const allLocations = useMemo(
    () => [
      ...mockData.map((user) => ({
        latitude: user.LastLocation.latitude,
        longitude: user.LastLocation.longitude,
        profileImage: user.profileImage,
        nickname: user.nickname,
      })),
      ...(location
        ? [
            {
              latitude: location.latitude,
              longitude: location.longitude,
              profileImage,
              nickname,
            },
          ]
        : []),
    ],
    [location, profileImage, nickname]
  )

  // WebSocket client 사용
  const clientRef = useWebSocketClient(chatRoomId)

  const handleLeaveGroup = async () => {
    try {
      sendLeaveMessage({ clientRef, chatRoomId, userId, nickname })
      await leaveChatRoom(chatRoomId)
      showSuccess('채팅방에서 나가셨습니다.')
    } catch (error) {
      console.error('채팅방에서나가기 중 오류 발생:', error)
    }
  }

  return (
    <div className='flex flex-col gap-3 mb-3'>
      {contextHolder}
      <div className='flex justify-center items-center h-[300px] bg-gray-100'>
        {loading ? (
          <LoadingSpinner /> // 로딩 중일 때 스피너 표시
        ) : trackingEnabled ? (
          <MapComponent
            trackingEnabled={trackingEnabled}
            allLocations={allLocations.map((loc) => ({
              latitude: loc.latitude,
              longitude: loc.longitude,
              profileImage: loc.profileImage || undefined,
              nickname: loc.nickname || undefined,
            }))}
          />
        ) : (
          <p className='text-center'>
            내 위치 추적을 허용하면
            <br />
            동행들의 최근 위치를 확인할 수 있어요!
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
              {/* 방장 여부를 확인하고 표시 */}
              {user.memberId === leaderId && <Tag color='#b3bbee'>방장</Tag>}
            </div>
          </div>
        ))}
      </div>
      {isPostExists && (
        <Button
          type='primary'
          className='w-full'
          onClick={() => router.push(`/accompany/${postId}`)}
        >
          모집 게시글로 이동
        </Button>
      )}
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
