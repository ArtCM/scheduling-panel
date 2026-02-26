'use client'

import { Clock, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Appointment } from '@/features/appointments/types/appointment.types'

interface AppointmentCardProps {
  appointment: Appointment
  onClick: () => void
}

export function AppointmentCard({ appointment, onClick }: AppointmentCardProps) {
  return (
    <Card 
      className="p-3 border-l-4 border-l-primary cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold text-sm">{appointment.title}</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{appointment.patientName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{appointment.duration} min</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

