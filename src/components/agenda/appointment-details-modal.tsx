'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Clock, User, FileText, Trash2, CheckCircle, Edit2, X } from 'lucide-react'
import type { Appointment } from '@/features/appointments/types/appointment.types'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { TIME_SLOTS } from '@/lib/constants'

interface AppointmentDetailsModalProps {
  appointment: Appointment | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: (id: string) => void
}

export function AppointmentDetailsModal({ 
  appointment, 
  open, 
  onOpenChange,
  onDelete 
}: AppointmentDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editDate, setEditDate] = useState('')
  const [editTime, setEditTime] = useState('')
  const [confirmAction, setConfirmAction] = useState<'delete' | 'complete' | 'cancel' | null>(null)
  const updateAppointment = useAppointmentsStore((state) => state.updateAppointment)
  const isTimeSlotAvailable = useAppointmentsStore((state) => state.isTimeSlotAvailable)

  if (!appointment) return null

  const handleDelete = () => {
    onDelete(appointment.id)
    onOpenChange(false)
    setConfirmAction(null)
  }

  const handleComplete = () => {
    updateAppointment(appointment.id, { status: 'completed' })
    onOpenChange(false)
    setConfirmAction(null)
  }

  const handleCancel = () => {
    updateAppointment(appointment.id, { status: 'cancelled' })
    onOpenChange(false)
    setConfirmAction(null)
  }

  const handleEdit = () => {
    setEditDate(appointment.date)
    setEditTime(appointment.time)
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    const [hours, minutes] = editTime.split(':').map(Number)
    const appointmentDateTime = parseISO(editDate)
    appointmentDateTime.setHours(hours, minutes, 0, 0)
    
    const now = new Date()
    
    if (appointmentDateTime <= now) {
      alert('Não é possível agendar para data/horário passado')
      return
    }

    updateAppointment(appointment.id, {
      date: editDate,
      time: editTime,
    })
    setIsEditing(false)
    onOpenChange(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditDate('')
    setEditTime('')
  }

  const isTimeSlotPast = (time: string) => {
    if (!editDate) return false
    
    const [hours, minutes] = time.split(':').map(Number)
    const slotDateTime = parseISO(editDate)
    slotDateTime.setHours(hours, minutes, 0, 0)
    
    const now = new Date()
    
    return slotDateTime <= now
  }

  const confirmMessages = {
    delete: {
      title: 'Excluir agendamento',
      description: 'Tem certeza que deseja excluir este agendamento? Esta ação é irreversível.',
      action: 'Excluir',
    },
    complete: {
      title: 'Concluir agendamento',
      description: 'Tem certeza que deseja marcar este agendamento como concluído? Esta ação é irreversível.',
      action: 'Concluir',
    },
    cancel: {
      title: 'Cancelar agendamento',
      description: 'Tem certeza que deseja cancelar este agendamento? Esta ação é irreversível.',
      action: 'Cancelar',
    },
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Título</p>
                  <p className="text-base font-semibold">{appointment.title}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Paciente</p>
                  <p className="text-base">{appointment.patientName}</p>
                </div>
              </div>

              {isEditing ? (
                <>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Data</p>
                      <Input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Horário</p>
                      <Select value={editTime} onValueChange={setEditTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((time) => {
                            const isAvailable = isTimeSlotAvailable(editDate, time) || time === appointment.time
                            const isPast = isTimeSlotPast(time)
                            return (
                              <SelectItem 
                                key={time} 
                                value={time}
                                disabled={!isAvailable || isPast}
                              >
                                {time} {isPast ? '(Passado)' : !isAvailable ? '(Ocupado)' : ''}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Data</p>
                      <p className="text-base">
                        {format(parseISO(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Horário e Duração</p>
                      <p className="text-base">{appointment.time} - {appointment.duration} minutos</p>
                    </div>
                  </div>
                </>
              )}

              {appointment.description && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Observações</p>
                    <p className="text-base whitespace-pre-wrap">{appointment.description}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-2 pt-4 border-t">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancelEdit} className="gap-2">
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveEdit} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                      <Button variant="outline" onClick={handleEdit} className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Editar
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                      <>
                        <Button onClick={() => setConfirmAction('complete')} className="gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Concluir
                        </Button>
                        <Button variant="outline" onClick={() => setConfirmAction('cancel')} className="gap-2">
                          <X className="h-4 w-4" />
                          Cancelar
                        </Button>
                      </>
                    )}
                    <Button variant="destructive" onClick={() => setConfirmAction('delete')} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmAction !== null} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction && confirmMessages[confirmAction].title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction && confirmMessages[confirmAction].description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmAction === 'delete') handleDelete()
                else if (confirmAction === 'complete') handleComplete()
                else if (confirmAction === 'cancel') handleCancel()
              }}
              className={
                confirmAction === 'delete' 
                  ? 'bg-destructive hover:bg-destructive/90' 
                  : confirmAction === 'cancel'
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  : ''
              }
            >
              {confirmAction && confirmMessages[confirmAction].action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}










