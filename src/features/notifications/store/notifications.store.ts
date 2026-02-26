import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type NotificationType = 'appointment' | 'request' | 'cancellation' | 'reminder'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  appointmentId?: string
}

interface NotificationsState {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  dismissNotification: (id: string) => void
  removeNotification: (id: string) => void
  getUnreadCount: () => number
  getUnreadNotifications: () => Notification[]
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          read: false,
        }
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }))
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }))
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }))
      },

      dismissNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }))
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }))
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length
      },

      getUnreadNotifications: () => {
        return get().notifications.filter((n) => !n.read)
      },
    }),
    {
      name: 'notifications-storage',
    }
  )
)

