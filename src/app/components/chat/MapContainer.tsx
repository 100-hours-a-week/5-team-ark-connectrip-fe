import React, { useEffect } from 'react'
import MapComponent from './MapComponent'
import LoadingSpinner from '../common/LoadingSpinner'
import { CompanionLocation } from '@/interfaces'
import { SyncOutlined } from '@ant-design/icons'

interface MapContainerProps {
  loading: boolean
  trackingEnabled: boolean
  allLocations: CompanionLocation[]
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MapContainer: React.FC<MapContainerProps> = ({
  loading,
  trackingEnabled,
  allLocations,
  setLoading,
}) => {
  useEffect(() => {
    if (allLocations.length > 0) {
      setLoading(false) // 모든 핀이 준비되면 loading 상태를 false로
    }
  }, [allLocations, setLoading]) // allLocations가 업데이트 될 때 setLoading 호출
  return (
    <div className='relative flex justify-center items-center h-[300px] bg-gray-100'>
      {/* 우측 상단에 고정된 SyncOutlined 아이콘 */}
      <SyncOutlined
        className='absolute top-4 right-4 text-xl cursor-pointer z-10'
        style={{ fontSize: '24px', color: '#1890ff' }} // 크기와 색상 조정
        spin // 아이콘을 회전시키려면 spin 속성 추가
      />

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
