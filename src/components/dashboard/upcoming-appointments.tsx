'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'
import { AppointmentDetailsModal } from '@/components/agenda/appointment-details-modal'
import { format, parseISO, setHours, setMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Appointment } from '@/features/appointments/types/appointment.types'

export function UpcomingAppointments() {
  const { appointments, removeAppointment } = useAppointments()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  
  const now = new Date()
  
  const upcoming = appointments
    .map(apt => {
      const [hours, minutes] = apt.time.split(':').map(Number)
      const aptDateTime = setMinutes(setHours(parseISO(apt.date), hours), minutes)
      return { ...apt, dateTime: aptDateTime }
    })
    .filter(apt => apt.dateTime >= now)
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
    .slice(0, 3)

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDetailsOpen(true)
  }

  return (
    <>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Próximos Agendamentos</h2>
        <div className="space-y-3">
          {upcoming.length > 0 ? (
            upcoming.map((apt) => (
              <div 
                key={apt.id} 
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleAppointmentClick(apt)}
              >
                <div className="flex-1">
                  <p className="font-medium">{apt.title}</p>
                  <p className="text-sm text-muted-foreground">{apt.patientName}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(parseISO(apt.date), "dd 'de' MMMM", { locale: ptBR })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {apt.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhum agendamento próximo</p>
          )}
        </div>
      </Card>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onDelete={removeAppointment}
      />
    </>
  )
}



