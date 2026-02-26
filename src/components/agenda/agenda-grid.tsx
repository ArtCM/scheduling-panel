'use client'

import { useState } from 'react'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { Calendar } from 'lucide-react'
import { AppointmentCard } from './appointment-card'
import { AppointmentDetailsModal } from './appointment-details-modal'
import { TIME_SLOTS } from '@/lib/constants'
import type { Appointment } from '@/features/appointments/types/appointment.types'

export function AgendaGrid() {
  const { appointmentsBySlot } = useAppointments()
  const removeAppointment = useAppointmentsStore((state) => state.removeAppointment)
  const appointments = useAppointmentsStore((state) => state.appointments)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  console.log('=== AGENDA GRID DEBUG ===')
  console.log('Total appointments:', appointments.length)
  console.log('All appointments:', appointments)
  console.log('Appointments by slot:', appointmentsBySlot)

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDetailsOpen(true)
  }

  const handleDelete = (id: string) => {
    removeAppointment(id)
    setDetailsOpen(false)
  }

  const approvedAppointmentsBySlot = Object.entries(appointmentsBySlot).reduce((acc, [time, apts]) => {
    const approved = apts.filter((apt: Appointment) => apt.status === 'approved')
    console.log(`Time ${time}: ${apts.length} total, ${approved.length} approved`)
    acc[time] = approved
    return acc
  }, {} as Record<string, Appointment[]>)

  console.log('Approved by slot:', approvedAppointmentsBySlot)

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
        onDelete={handleDelete}
      />
    </>
  )
}






