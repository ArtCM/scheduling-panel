'use client'

import { Calendar } from 'lucide-react'
import { AppointmentCard } from './appointment-card'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'
import { TIME_SLOTS } from '@/lib/constants'

export function AgendaGrid() {
  const { appointmentsBySlot, removeAppointment } = useAppointments()

  return (
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
            {appointmentsBySlot[time]?.length > 0 ? (
              appointmentsBySlot[time].map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onDelete={removeAppointment}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">Nenhum agendamento</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}