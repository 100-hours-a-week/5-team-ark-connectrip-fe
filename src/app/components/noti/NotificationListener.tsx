// components/NotificationListener.tsx
'use client'
import { useEffect } from 'react'
import { notification } from 'antd'
import useNotificationStore from '@/app/store/useNotificationStore'

const NotificationListener: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications)
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification
  )

  useEffect(() => {
    notifications.forEach((notif) => {
      notification.open({
        message: notif.chatRoomTitle,
        description: `${notif.senderNickname}: ${notif.content}`,
        onClose: () => removeNotification(notif.id),
      })
    })
  }, [notifications, removeNotification])

  return null
}

export default NotificationListener
