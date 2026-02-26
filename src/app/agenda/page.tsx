'use client'

import { CreateAppointmentModal } from '@/components/agenda/create-appointment-modal'
import { AgendaGrid } from '@/components/agenda/agenda-grid'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'

export default function AgendaPage() {
  const { addAppointment } = useAppointments()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agenda Diária</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os seus agendamentos</p>
        </div>
        <CreateAppointmentModal onSubmit={addAppointment} />
      </div>
      <AgendaGrid />
    </div>
  )
}