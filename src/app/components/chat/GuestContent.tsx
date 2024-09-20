import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import useAuthStore from '@/app/store/useAuthStore'
import useKakaoLoader from '@/app/hooks/useKakaoLoader'
import { GuestContentProps } from '@/interfaces'
import { useHandleDeleteClick } from '@/app/hooks/useHandleDeleteClick'
import { useCustomMessage } from '@/app/utils/alertUtils'
import { useWebSocketClient } from '@/app/hooks/useWebSocketClient'
import MapContainer from './MapContainer'
import CompanionList from './CompanionList'
import LocationActions from './LocationActions'
import PostNavigationButton from './PostNavigationButton'
import LeaveChatButton from './LeaveChatButton'

const GuestContent: React.FC<GuestContentProps> = ({
  companionUsers,
  postId,
  isPostExists,
  leaderId,
  companionLocations,
  setCompanionLocations,
  isLocationSharingEnabled = false,
}) => {
  const { nickname, userId } = useAuthStore()
  const [trackingEnabled, setTrackingEnabled] = useState(
    isLocationSharingEnabled
  )
  const [loading, setLoading] = useState(false)
  const path = usePathname()
  const chatRoomId = parseInt(path.split('/').pop() || '0', 10)

  const { contextHolder, showSuccess, showError } = useCustomMessage()
  const handleDeleteClick = useHandleDeleteClick()
  useKakaoLoader()

  const clientRef = useWebSocketClient(chatRoomId)

  const allLocations = useMemo(
    () =>
      companionLocations.map((loc) => ({
        lat: loc.lat,
        lng: loc.lng,
        profileImagePath: loc.profileImagePath,
        nickname: loc.nickname,
      })),
    [companionLocations]
  )

  return (
    <div className='flex flex-col gap-3 mb-3'>
      {contextHolder}
      <MapContainer
        loading={loading}
        chatRoomId={chatRoomId}
        trackingEnabled={trackingEnabled}
        allLocations={allLocations}
        setLoading={setLoading}
        setCompanionLocations={setCompanionLocations}
      />
      <LocationActions
        nickname={nickname!}
        chatRoomId={chatRoomId}
        userId={userId ? parseInt(userId, 10) : 0}
        trackingEnabled={trackingEnabled}
        setTrackingEnabled={setTrackingEnabled}
        clientRef={clientRef}
        showError={showError}
        showSuccess={showSuccess}
        setCompanionLocations={setCompanionLocations}
      />
      <h3>대화 상대</h3>
      <CompanionList companionUsers={companionUsers} leaderId={leaderId} />
      {isPostExists && <PostNavigationButton postId={postId} />}
      <LeaveChatButton
        handleDeleteClick={
          handleDeleteClick as (
            entityName: string,
            redirectPath: string,
            deleteFunction: () => Promise<void>
          ) => Promise<void>
        }
        chatRoomId={chatRoomId}
        userId={userId ? parseInt(userId, 10) : 0}
        nickname={nickname!}
        clientRef={clientRef}
        showSuccess={showSuccess}
      />
    </div>
  )
}

export default GuestContent
