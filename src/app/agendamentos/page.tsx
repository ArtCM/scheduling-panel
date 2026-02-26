'use client'

import { useState, useEffect, startTransition } from 'react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, Filter } from 'lucide-react'
import { format, parseISO, setHours, setMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AppointmentDetailsModal } from '@/components/agenda/appointment-details-modal'
import type { Appointment } from '@/features/appointments/types/appointment.types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function AgendamentosPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  
  const appointments = useAppointmentsStore((state) => state.appointments)
  const removeAppointment = useAppointmentsStore((state) => state.removeAppointment)

  useEffect(() => {
    useAppointmentsStore.persist.rehydrate()
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  if (!mounted) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Todos os Agendamentos</h1>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  const filteredAppointments = appointments
    .filter(apt => statusFilter === 'all' || apt.status === statusFilter)
    .map(apt => {
      const [hours, minutes] = apt.time.split(':').map(Number)
      const aptDateTime = setMinutes(setHours(parseISO(apt.date), hours), minutes)
      return { ...apt, dateTime: aptDateTime }
    })
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

  const statusColors = {
    approved: 'bg-green-500',
    pending: 'bg-yellow-500',
    rejected: 'bg-red-500',
    cancelled: 'bg-gray-500',
    completed: 'bg-blue-500',
  }

  const statusLabels = {
    approved: 'Aprovado',
    pending: 'Pendente',
    rejected: 'Rejeitado',
    cancelled: 'Cancelado',
    completed: 'Concluído',
  }

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Todos os Agendamentos</h1>
            <p className="text-muted-foreground mt-1">
              {filteredAppointments.length} agendamento(s) encontrado(s)
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <Card
                key={apt.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedAppointment(apt)
                  setDetailsOpen(true)
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{apt.title}</h3>
                      <Badge className={statusColors[apt.status]}>
                        {statusLabels[apt.status]}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {apt.patientName}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(parseISO(apt.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {apt.time} ({apt.duration} min)
                      </span>
                    </div>

                    {apt.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {apt.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12">
              <p className="text-center text-muted-foreground">
                Nenhum agendamento encontrado
              </p>
            </Card>
          )}
        </div>
      </div>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onDelete={removeAppointment}
      />
    </>
  )
}


