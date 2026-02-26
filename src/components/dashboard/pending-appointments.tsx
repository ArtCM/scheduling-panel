'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Check, X } from 'lucide-react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function PendingAppointments() {
  const getPendingAppointments = useAppointmentsStore((state) => state.getPendingAppointments)
  const approveAppointment = useAppointmentsStore((state) => state.approveAppointment)
  const rejectAppointment = useAppointmentsStore((state) => state.rejectAppointment)
  
  const pending = getPendingAppointments()

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Agendamentos Pendentes</h2>
      <div className="space-y-3">
        {pending.length > 0 ? (
          pending.map((apt) => (
            <div 
              key={apt.id} 
              className="flex items-center gap-3 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20"
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
                    {apt.time} ({apt.duration} min)
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => approveAppointment(apt.id)}
                  className="gap-1"
                >
                  <Check className="h-4 w-4" />
                  Aprovar
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => rejectAppointment(apt.id)}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  Rejeitar
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhum agendamento pendente</p>
        )}
      </div>
    </Card>
  )
}



