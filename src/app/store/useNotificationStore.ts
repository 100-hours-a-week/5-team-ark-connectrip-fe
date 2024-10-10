// stores/useNotificationStore.ts
import create from 'zustand'
import { Notification } from '@/interfaces/index'

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
