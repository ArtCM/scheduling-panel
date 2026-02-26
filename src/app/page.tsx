'use client'

import { CreateAppointmentModal } from '@/components/agenda/create-appointment-modal'
import { AgendaGrid } from '@/components/agenda/agenda-grid'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'

export default function Home() {
  const { addAppointment } = useAppointments()

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Agenda Diária</h1>
        <CreateAppointmentModal onSubmit={addAppointment} />
      </div>
      <AgendaGrid />
    </div>
  )
}


