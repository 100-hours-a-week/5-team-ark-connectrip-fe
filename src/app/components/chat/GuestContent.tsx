import ProfileIcon from '../common/ProfileIcon'
import { Button, Switch, Tag } from 'antd'
import useAuthStore from '@/app/store/useAuthStore'
import { CompanionLocation, CompanionUsers } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { usePathname } from 'next/navigation'
import useKakaoLoader from '@/app/hooks/useKakaoLoader'
import {
  fetchLocationSharingStatus,
  leaveChatRoom,
} from '@/app/utils/fetchUtils'
import { useWebSocketClient } from '@/app/hooks/useWebSocketClient' // WebSocket 훅 import
import { sendLeaveMessage } from '@/app/utils/sendLeaveMessage'
import MapComponent from './MapComponent'
import { useEffect, useMemo, useState } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import { sendLocationMessage } from '@/app/utils/sendLocationMessage'

interface GuestContentProps {
  companionUsers: CompanionUsers[] // 동행 참여자 목록
  postId: number // 게시글 ID
  isPostExists: boolean // 게시글 존재 여부
  leaderId: number // 방장 ID
  companionLocations: CompanionLocation[] // 동행자 위치 배열
  setCompanionLocations: React.Dispatch<
    React.SetStateAction<CompanionLocation[]>
  > // 상태 업데이트 함수
}

const GuestContent: React.FC<GuestContentProps> = ({
  companionUsers,
  postId,
  isPostExists,
  leaderId,
  companionLocations,
  setCompanionLocations,
}) => {
  const { nickname, userId } = useAuthStore()
  const [trackingEnabled, setTrackingEnabled] = useState(false)
  const [loading, setLoading] = useState(false) // 로딩 상태 추가
  const router = useRouter()
  const handleDeleteClick = useHandleDeleteClick() // 모달 호출 유틸리티 사용
  const { contextHolder, showSuccess, showError } = useCustomMessage()
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)

  useKakaoLoader() // 카카오 지도 로더 훅 사용

  const handleSwitchChange = (checked: boolean) => {
    setTrackingEnabled(checked)
    // 상태가 변경된 후에 동작을 처리하기 위해 useEffect 사용
  }

  useEffect(() => {
    if (trackingEnabled) {
      setLoading(true)
      fetchLocation() // 위치를 가져오고, 이후에 지도 업데이트
    }
  }, [trackingEnabled])

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
        const kakaoMapLink = `https://map.kakao.com/link/map/${mapNickname},${latitude},${longitude}`

        // WebSocket으로 위치 정보 전송
        try {
          sendLocationMessage({
            clientRef,
            chatRoomId,
            userId,
            nickname,
            locationLink: kakaoMapLink || '',
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
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        try {
          // 분리된 함수 사용
          const response = await fetchLocationSharingStatus(
            chatRoomId,
            trackingEnabled,
            lat,
            lng
          )

          if (response.isLocationSharingEnabled) {
            // 동행자 위치 정보 상태에 저장
            const members = response.chatRoomMemberLocations.map(
              (member: any) => ({
                lat: member.lastLocation.lat,
                lng: member.lastLocation.lng,
                nickname: member.nickname,
                profileImagePath: member.profileImagePath || '',
              })
            )
            setCompanionLocations(members)
          } else {
            setCompanionLocations([]) // 위치 공유 OFF 시 초기화
          }

          setLoading(false) // 로딩 종료
          showSuccess('위치 공유가 활성화되었습니다.')
        } catch (error) {
          console.error('위치 공유 활성화 중 오류 발생:', error)
          showError('위치 공유 활성화에 실패했습니다.')
          setLoading(false) // 로딩 종료
        }
      },
      (error) => {
        console.error('Error fetching location: ', error)
        showError('팝업에서 위치 정보를 허용해주세요.')
        setLoading(false) // 로딩 종료
      }
    )
  }

  const allLocations = useMemo(
    () =>
      companionLocations.map((loc: CompanionLocation) => ({
        lat: loc.lat,
        lng: loc.lng,
        profileImagePath: loc.profileImagePath,
        nickname: loc.nickname,
      })),
    [companionLocations]
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
            allLocations={allLocations.map((loc: CompanionLocation) => ({
              lat: loc.lat,
              lng: loc.lng,
              profileImagePath: loc.profileImagePath || undefined,
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
