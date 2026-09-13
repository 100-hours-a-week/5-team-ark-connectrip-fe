// components/NotificationListener.tsx
'use client'
import { useEffect } from 'react'
import { notification } from 'antd'
import useNotificationStore from '@/app/store/useNotificationStore'
import { useRouter } from 'next/navigation'

const NotificationListener: React.FC = () => {
  const router = useRouter()
  const notifications = useNotificationStore((state) => state.notifications)
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification
  )

  useEffect(() => {
    console.log(notification)
    notifications.forEach((notif) => {
      notification.open({
        // message: notif.chatRoomTitle,
        message: '새로운 메시지가 도착했습니다.',
        description: `${notif.senderNickname}: ${notif.content}`,
        onClose: () => removeNotification(notif.id),
        onClick: () => {
          router.push(`/chat/${notif.chatRoomId}`)
          removeNotification(notif.id)
        },
      })
    })
  }, [notifications, removeNotification])

  return null
}

export default NotificationListener
