'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { AppointmentCard } from './appointment-card'
import { AppointmentDetailsModal } from './appointment-details-modal'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'
import { TIME_SLOTS } from '@/lib/constants'
import type { Appointment } from '@/features/appointments/types/appointment.types'

export function AgendaGrid() {
  const { appointmentsBySlot, removeAppointment } = useAppointments()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDetailsOpen(true)
  }

  // Filtrar apenas agendamentos aprovados
  const approvedAppointmentsBySlot = Object.entries(appointmentsBySlot).reduce((acc, [time, apts]) => {
    acc[time] = apts.filter(apt => apt.status === 'approved')
    return acc
  }, {} as Record<string, Appointment[]>)

  return (
    <>
      <div className="space-y-2">
        {TIME_SLOTS.map((time) => (
          <div
            key={time}
            className="grid grid-cols-[100px_1fr] gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {time}
            </div>
            <div className="space-y-2">
              {approvedAppointmentsBySlot[time]?.length > 0 ? (
                approvedAppointmentsBySlot[time].map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onClick={() => handleAppointmentClick(appointment)}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">Nenhum agendamento</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onDelete={removeAppointment}
      />
    </>
  )
}

