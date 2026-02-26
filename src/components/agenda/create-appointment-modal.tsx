'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { appointmentSchema, type AppointmentFormData } from '@/features/appointments/schemas/appointment.schema'
import { TIME_SLOTS, DURATION_OPTIONS } from '@/lib/constants'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { parseISO } from 'date-fns'
import { useAppointmentNotifications } from '@/features/appointments/hooks/use-appointment-notifications'

interface CreateAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAppointmentModal({ open, onOpenChange }: CreateAppointmentModalProps) {
  const addAppointment = useAppointmentsStore((state) => state.addAppointment)
  const isTimeSlotAvailable = useAppointmentsStore((state) => state.isTimeSlotAvailable)
  const { notifyNewAppointment } = useAppointmentNotifications()

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      title: '',
      patientName: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      duration: 30,
      description: '',
    },
  })

  const selectedDate = useWatch({ control: form.control, name: 'date' })

  const handleSubmit = (data: AppointmentFormData) => {
    const [hours, minutes] = data.time.split(':').map(Number)
    const appointmentDateTime = parseISO(data.date)
    appointmentDateTime.setHours(hours, minutes, 0, 0)
    
    const now = new Date()
    
    if (appointmentDateTime <= now) {
      form.setError('time', {
        type: 'manual',
        message: 'Não é possível agendar para data/horário passado'
      })
      return
    }

    addAppointment(data)
    
    const newAppointment = {
      ...data,
      id: crypto.randomUUID(),
      status: 'pending' as const,
    }
    notifyNewAppointment(newAppointment)
    
    form.reset()
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  const isTimeSlotPast = (time: string) => {
    if (!selectedDate) return false
    
    const [hours, minutes] = time.split(':').map(Number)
    const slotDateTime = parseISO(selectedDate)
    slotDateTime.setHours(hours, minutes, 0, 0)
    
    const now = new Date()
    
    console.log('Slot:', slotDateTime, 'Now:', now, 'IsPast:', slotDateTime <= now)
    
    return slotDateTime <= now
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Criar Agendamento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Consulta de rotina" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Paciente</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => {
                          const isAvailable = isTimeSlotAvailable(selectedDate, time)
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(Number(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DURATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detalhes adicionais..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Agendamento</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}





















