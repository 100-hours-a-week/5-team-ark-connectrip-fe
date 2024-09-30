// stores/useNotificationStore.ts
import create from 'zustand'

interface Notification {
  id: number | null
  type: string
  chatRoomId: number
  senderId: number
  chatRoomTitle: string
  senderNickname: string
  senderProfileImage: string | null
  content: string
  infoFlag: boolean
  createdAt: string
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  removeNotification: (id: number | null) => void
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))

export default useNotificationStore
