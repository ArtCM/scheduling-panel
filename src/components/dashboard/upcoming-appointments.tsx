'use client'

import { Card } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function UpcomingAppointments() {
  const { appointments } = useAppointments()
  
  const upcoming = appointments
    .filter(apt => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Próximos Agendamentos</h2>
      <div className="space-y-3">
        {upcoming.length > 0 ? (
          upcoming.map((apt) => (
            <div key={apt.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex-1">
                <p className="font-medium">{apt.title}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(apt.date), "dd 'de' MMMM", { locale: ptBR })}
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
  )
}