'use client'

import { useState, useEffect, startTransition } from 'react'
import { CreateAppointmentModal } from '@/components/agenda/create-appointment-modal'
import { AgendaGrid } from '@/components/agenda/agenda-grid'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'

export default function AgendaPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    useAppointmentsStore.persist.rehydrate()
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  if (!mounted) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Agenda Diária</h1>
            <p className="text-muted-foreground mt-1">Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agenda Diária</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os seus agendamentos</p>
        </div>
        <CreateAppointmentModal open={modalOpen} onOpenChange={setModalOpen} />
      </div>
      <AgendaGrid />
    </div>
  )
}






