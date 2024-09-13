import { LocationActionsProps } from '@/interfaces'
import { Button, Switch } from 'antd'
import { fetchLocationSharingStatus } from '@/app/utils/fetchUtils'

const LocationActions: React.FC<LocationActionsProps> = ({
  nickname,
  chatRoomId,
  userId,
  trackingEnabled,
  setTrackingEnabled,
  clientRef,
  showError,
  showSuccess,
}) => {
  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      showError('위치 정보를 가져올 수 없습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const kakaoMapLink = `https://map.kakao.com/link/map/${nickname},${latitude},${longitude}`

        clientRef.send(
          JSON.stringify({
            action: 'sendLocation',
            data: {
              userId,
              chatRoomId,
              nickname,
              locationLink: kakaoMapLink,
            },
          })
        )

        showSuccess('위치 정보가 채팅방에 전송되었습니다.')
      },
      (error) => {
        console.error('위치 정보를 가져오는 중 오류 발생:', error)
        showError('위치 정보를 가져오는 중 문제가 발생했습니다.')
      }
    )
  }

  const handleSwitchChange = (checked: boolean) => {
    setTrackingEnabled(checked)

    if (navigator.geolocation && checked) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            console.log('클릭' + checked)
            await fetchLocationSharingStatus(
              chatRoomId,
              checked,
              latitude,
              longitude
            )
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
