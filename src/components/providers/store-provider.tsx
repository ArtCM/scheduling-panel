'use client'

import { useEffect, useState } from 'react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const unsubscribe = useAppointmentsStore.persist.onFinishHydration(() => {
      setIsHydrated(true)
    })
    
    useAppointmentsStore.persist.rehydrate()
    
    return unsubscribe
  }, [])

  if (!isHydrated) {
    return null
  }

  return <>{children}</>
}