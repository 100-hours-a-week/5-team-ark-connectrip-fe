import { ChatRoomMemberLocation, LocationActionsProps } from '@/interfaces'
import { Button, Switch } from 'antd'
import {
  fetchLocationSharingStatus,
  sendLocationToChatRoom,
} from '@/app/utils/fetchUtils'
import { sendLocationMessage } from '@/app/utils/sendLocationMessage'

const LocationActions: React.FC<LocationActionsProps> = ({
  nickname,
  chatRoomId,
  userId,
  trackingEnabled,
  setTrackingEnabled,
  clientRef,
  showError,
  showSuccess,
  setCompanionLocations,
}) => {
  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      showError('위치 정보를 가져올 수 없습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const kakaoMapLink = `https://map.kakao.com/link/map/${nickname},${latitude},${longitude}`

        try {
          // 서버로 위치 전송
          await sendLocationToChatRoom(chatRoomId, latitude, longitude)
          showSuccess('위치 정보가 채팅방에 전송되었습니다.')

          // WebSocket을 통해 위치 정보 전송
          sendLocationMessage({
            clientRef,
            chatRoomId,
            userId: userId?.toString() || '',
            nickname: nickname || '',
            locationLink: kakaoMapLink,
          })

          // 기존 동료 위치는 그대로 유지하면서 내 위치만 업데이트
          setCompanionLocations((prevLocations) =>
            prevLocations.map(
              (member) =>
                member.nickname === nickname // 내 위치인 경우
                  ? { ...member, lat: latitude, lng: longitude } // 내 위치 업데이트
                  : member // 다른 유저들의 위치는 그대로 유지
            )
          )
        } catch (error) {
          console.error('위치 정보를 전송하는 중 오류 발생:', error)
          showError('위치 정보를 전송하는 중 문제가 발생했습니다.')
        }
      },
      (error) => {
        console.error('위치 정보를 가져오는 중 오류 발생:', error)
        showError('위치 정보를 가져오는 중 문제가 발생했습니다.')
      }
    )
  }

  const handleSwitchChange = (checked: boolean) => {
    setTrackingEnabled(checked)
    if (checked) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            const response = await fetchLocationSharingStatus(
              chatRoomId,
              checked,
              latitude,
              longitude
            )

            if (checked) {
              // response가 유효한지 확인하고, chatRoomMemberLocations 배열을 처리
              if (response && response.chatRoomMemberLocations) {
                const updatedLocations = response.chatRoomMemberLocations.map(
                  (member: ChatRoomMemberLocation) => ({
                    lat: member.lastLocation.lat,
                    lng: member.lastLocation.lng,
                    nickname: member.nickname || '', // 닉네임이 없을 경우 기본 값
                    profileImagePath: member.profileImagePath || '', // 프로필 이미지 경로가 없을 경우 기본 값
                  })
                )

                setCompanionLocations(updatedLocations)
              } else {
                console.error('응답 데이터가 올바르지 않습니다:', response)
              }
            }

            showSuccess(
              checked
                ? '위치 공유가 활성화되었습니다.'
                : '위치 공유가 비활성화되었습니다.'
            )
          } catch (error) {
            showError('위치 공유 상태 변경에 실패했습니다.')
            console.error('위치 공유 상태 변경 중 오류 발생:', error)
          }
        },
        (error) => {
          console.error('위치 정보를 가져오는 중 오류 발생:', error)
          showError('위치 정보를 가져오는 중 문제가 발생했습니다.')
        }
      )
    } else {
      // 위치 추적을 비활성화 할 때, 서버에 위치 정보 없이 상태만 업데이트
      fetchLocationSharingStatus(chatRoomId, checked)
        .then(() => {
          showSuccess('위치 공유가 비활성화되었습니다.')
        })
        .catch((error) => {
          showError('위치 공유 상태 변경에 실패했습니다.')
          console.error('위치 공유 상태 변경 중 오류 발생:', error)
        })
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <Button className='w-auto rounded-full' onClick={handleSendLocation}>
        채팅방에 내 위치 전송
      </Button>
      <div className='flex gap-2'>
        <p>내 위치 추적</p>
        <Switch checked={trackingEnabled} onChange={handleSwitchChange} />
      </div>
    </div>
  )
}

export default LocationActions
