'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { User, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Appointment } from '@/features/appointments/types/appointment.types'

interface ClientDetailsModalProps {
  client: {
    name: string
    totalAppointments: number
    lastAppointment: Date | null
    upcomingAppointments: number
    completedAppointments: number
  } | null
  appointments: Appointment[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClientDetailsModal({ 
  client, 
  appointments,
  open, 
  onOpenChange 
}: ClientDetailsModalProps) {
  if (!client) return null

  const clientAppointments = appointments
    .filter(apt => apt.patientName === client.name)
    .sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time)
      const dateB = new Date(b.date + 'T' + b.time)
      return dateB.getTime() - dateA.getTime()
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-blue-500"><CheckCircle className="h-3 w-3 mr-1" />Concluído</Badge>
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelado</Badge>
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500"><AlertCircle className="h-3 w-3 mr-1" />Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold">{client.name}</p>
              <p className="text-sm text-muted-foreground font-normal">Detalhes do Cliente</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{client.totalAppointments}</p>
              <p className="text-xs text-muted-foreground mt-1">Total</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{client.completedAppointments}</p>
              <p className="text-xs text-muted-foreground mt-1">Concluídos</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{client.upcomingAppointments}</p>
              <p className="text-xs text-muted-foreground mt-1">Próximos</p>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Histórico de Agendamentos
            </h3>
            <div className="space-y-2">
              {clientAppointments.length > 0 ? (
                clientAppointments.map((apt) => (
                  <Card key={apt.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium">{apt.title}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(parseISO(apt.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {apt.time}
                          </span>
                        </div>
                        {apt.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {apt.description}
                          </p>
                        )}
                      </div>
                      <div>
                        {getStatusBadge(apt.status)}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum agendamento encontrado
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}