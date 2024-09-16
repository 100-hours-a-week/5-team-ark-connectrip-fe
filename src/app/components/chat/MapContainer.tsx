import React, { useEffect } from 'react'
import MapComponent from './MapComponent'
import LoadingSpinner from '../common/LoadingSpinner'
import { ChatRoomMemberLocation, CompanionLocation } from '@/interfaces'
import { SyncOutlined } from '@ant-design/icons'
import { refreshLocations } from '@/app/utils/fetchUtils'
import { set } from 'date-fns'

interface MapContainerProps {
  loading: boolean
  trackingEnabled: boolean
  allLocations: CompanionLocation[]
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setCompanionLocations: React.Dispatch<
    React.SetStateAction<CompanionLocation[]>
  >
  chatRoomId: number
}

const MapContainer: React.FC<MapContainerProps> = ({
  loading,
  trackingEnabled,
  allLocations,
  setLoading,
  setCompanionLocations,
  chatRoomId,
}) => {
  const handleRefreshLocations = async () => {
    if (loading) return // 이미 로딩 중이면 중복 요청 방지
    setLoading(true) // 로딩 상태로 변경
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            // 내 위치 서버로 전송 및 동행자 위치 갱신
            const response = await refreshLocations(
              chatRoomId,
              latitude,
              longitude
            )

            if (response && response.chatRoomMemberLocations) {
              const updatedLocations = response.chatRoomMemberLocations.map(
                (member: ChatRoomMemberLocation) => ({
                  lat: member.lastLocation.lat,
                  lng: member.lastLocation.lng,
                  nickname: member.nickname || '',
                  profileImagePath: member.profileImagePath || '',
                })
              )
              setCompanionLocations(updatedLocations)
              setLoading(false) // 모든 핀이 준비되면 loading 상태를 false로
            }
          } catch (error) {
            console.error('위치 정보를 전송하는 중 오류 발생:', error)
            setLoading(false) // 오류 발생 시 로딩 상태 해제
          }
        },
        (error) => {
          console.error('지오로케이션을 가져오는 중 오류 발생:', error)
          setLoading(false) // 오류 발생 시 로딩 상태 해제
        }
      )
    } else {
      console.error('지오로케이션을 지원하지 않습니다.')
      setLoading(false) // 지오로케이션 미지원 시 로딩 상태 해제
    }
  }

  useEffect(() => {
    if (allLocations.length > 0) {
      setLoading(false) // 모든 핀이 준비되면 loading 상태를 false로
    }
  }, [allLocations, setLoading]) // allLocations가 업데이트 될 때 setLoading 호출

  return (
    <div className='relative flex justify-center items-center h-[300px] bg-gray-100'>
      {/* 우측 상단에 고정된 SyncOutlined 아이콘 */}
      {trackingEnabled && (
        <SyncOutlined
          className='absolute top-4 right-4 text-xl cursor-pointer z-10'
          style={{ fontSize: '24px', color: '#1890ff' }}
          onClick={handleRefreshLocations} // 클릭 시 위치 갱신 로직 호출
          spin={loading} // 로딩 중일 때 spin 애니메이션 추가
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : trackingEnabled ? (
        <MapComponent
          trackingEnabled={trackingEnabled}
          allLocations={allLocations}
        />
      ) : (
        <p className='text-center'>
          내 위치 추적을 허용하면
          <br />
          동행들의 최근 위치를 확인할 수 있어요!
        </p>
      )}
    </div>
  )
}

export default MapContainer
