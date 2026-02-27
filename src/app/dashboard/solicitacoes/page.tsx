'use client'

import { useState, useEffect, startTransition } from 'react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Appointment } from '@/features/appointments/types/appointment.types'
import { toast } from 'sonner'

export default function SolicitacoesPage() {
  const [mounted, setMounted] = useState(false)
  const appointments = useAppointmentsStore((state) => state.appointments)
  const updateAppointment = useAppointmentsStore((state) => state.updateAppointment)
  const removeAppointment = useAppointmentsStore((state) => state.removeAppointment)

  useEffect(() => {
    useAppointmentsStore.persist.rehydrate()
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending')

  const handleApprove = (appointment: Appointment) => {
    updateAppointment(appointment.id, { status: 'approved' })
    toast.success('Agendamento aprovado com sucesso!')
  }

  const handleReject = (appointmentId: string) => {
    removeAppointment(appointmentId)
    toast.success('Solicitação rejeitada')
  }

  if (!mounted) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Solicitações Pendentes</h1>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Solicitações Pendentes</h1>
        <p className="text-muted-foreground mt-1">
          {pendingAppointments.length} solicitação(ões) aguardando aprovação
        </p>
      </div>

      <div className="space-y-4">
        {pendingAppointments.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma solicitação pendente</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          pendingAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{appointment.title}</CardTitle>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      Pendente
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                      onClick={() => handleApprove(appointment)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleReject(appointment.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{appointment.patientName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(parseISO(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.time} ({appointment.duration} min)</span>
                  </div>
                </div>
                {appointment.description && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      <strong>Observações:</strong> {appointment.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
