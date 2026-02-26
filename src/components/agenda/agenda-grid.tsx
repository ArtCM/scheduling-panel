'use client'

import { useState } from 'react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { Calendar } from 'lucide-react'
import { AppointmentCard } from './appointment-card'
import { AppointmentDetailsModal } from './appointment-details-modal'
import { TIME_SLOTS } from '@/lib/constants'
import type { Appointment } from '@/features/appointments/types/appointment.types'

interface AgendaGridProps {
  selectedDate: string
}

export function AgendaGrid({ selectedDate }: AgendaGridProps) {
  const appointments = useAppointmentsStore((state) => state.appointments)
  const removeAppointment = useAppointmentsStore((state) => state.removeAppointment)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDetailsOpen(true)
  }

  const handleDelete = (id: string) => {
    removeAppointment(id)
    setDetailsOpen(false)
  }

  const dayAppointments = appointments.filter(
    apt => apt.date === selectedDate && apt.status === 'approved'
  )

  const appointmentsBySlot = TIME_SLOTS.reduce((acc, time) => {
    acc[time] = dayAppointments.filter(apt => apt.time === time)
    return acc
  }, {} as Record<string, Appointment[]>)

  return (
    <>
      <div className="space-y-2">
        {TIME_SLOTS.map((time) => (
          <div key={time} className="grid grid-cols-[100px_1fr] gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
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
        onDelete={handleDelete}
      />
    </>
  )
}







