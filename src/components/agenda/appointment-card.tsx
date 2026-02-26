'use client'

import { Trash2, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Appointment } from '@/features/appointments/types/appointment.types'

interface AppointmentCardProps {
  appointment: Appointment
  onDelete: (id: string) => void
}

export function AppointmentCard({ appointment, onDelete }: AppointmentCardProps) {
  return (
    <Card className="p-3 border-l-4 border-l-primary">
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
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onDelete(appointment.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
