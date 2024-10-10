import React, { useEffect, useRef } from 'react'
import { Map, CustomOverlayMap, useMap } from 'react-kakao-maps-sdk'
import ProfileIcon from '../common/ProfileIcon'

interface MapComponentProps {
  trackingEnabled: boolean
  allLocations: {
    lat: number
    lng: number
    profileImagePath?: string
    nickname?: string
  }[]
}

const MapComponent: React.FC<MapComponentProps> = ({
  trackingEnabled,
  allLocations,
}) => {
  const mapRef = useRef<kakao.maps.Map | null>(null)
  const ReSetttingMapBounds = ({
    points,
  }: {
    points: { lat: number; lng: number }[]
  }) => {
    const map = useMap()

    useEffect(() => {
      if (map && points.length > 0) {
        const bounds = new kakao.maps.LatLngBounds()
        points.forEach((point) => {
          bounds.extend(new kakao.maps.LatLng(point.lat, point.lng))
        })
        map.setBounds(bounds)
      }
    }, [map, points])

    return null
  }

  useEffect(() => {
    if (trackingEnabled && mapRef.current && allLocations.length > 0) {
      const bounds = new kakao.maps.LatLngBounds()
      allLocations.forEach((loc) => {
        bounds.extend(new kakao.maps.LatLng(loc.lat, loc.lng))
      })
      mapRef.current.setBounds(bounds)
    }
  }, [trackingEnabled, allLocations])

  return (
    <Map
      id='map'
      center={{
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        width: '100%',
        height: '300px',
      }}
      level={3}
      onCreate={(map) => (mapRef.current = map)}
    >
      {allLocations.map((loc, index) => (
        <CustomOverlayMap position={{ lat: loc.lat, lng: loc.lng }} key={index}>
          <div className='-top-10 -left-5 w-[40px] h-[40px] rounded-full overflow-hidden bg-main border-main border-2 z-10'>
            <ProfileIcon
              src={loc.profileImagePath || ''}
              size={35}
              nickname={loc.nickname || ''}
            />
            <div className='absolute bottom-[-7px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-main z-0' />
          </div>
        </CustomOverlayMap>
      ))}
      {allLocations.length > 0 && <ReSetttingMapBounds points={allLocations} />}
    </Map>
  )
}

export default MapComponent
