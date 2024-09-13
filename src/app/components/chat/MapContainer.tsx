import React from 'react'
import MapComponent from './MapComponent'
import LoadingSpinner from '../common/LoadingSpinner'
import { CompanionLocation } from '@/interfaces'

interface MapContainerProps {
  loading: boolean
  trackingEnabled: boolean
  allLocations: CompanionLocation[]
}

const MapContainer: React.FC<MapContainerProps> = ({
  loading,
  trackingEnabled,
  allLocations,
}) => {
  console.log(allLocations)
  return (
    <div className='flex justify-center items-center h-[300px] bg-gray-100'>
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
