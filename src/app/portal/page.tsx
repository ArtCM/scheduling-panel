'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { appointmentSchema, type AppointmentFormData } from '@/features/appointments/schemas/appointment.schema'
import { TIME_SLOTS, DURATION_OPTIONS } from '@/lib/constants'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { Calendar, CheckCircle } from 'lucide-react'
import { parseISO } from 'date-fns'

export default function PortalPage() {
  const [submitted, setSubmitted] = useState(false)
  const addAppointment = useAppointmentsStore((state) => state.addAppointment)
  const isTimeSlotAvailable = useAppointmentsStore((state) => state.isTimeSlotAvailable)

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

  const isTimeSlotPast = (time: string) => {
    if (!selectedDate) return false
    
    const [hours, minutes] = time.split(':').map(Number)
    const slotDateTime = parseISO(selectedDate)
    slotDateTime.setHours(hours, minutes, 0, 0)
    
    const now = new Date()
    
    return slotDateTime <= now
  }

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

    addAppointment({ ...data, status: 'pending' })
    setSubmitted(true)
    form.reset()
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Solicitação Enviada!</h2>
          <p className="text-muted-foreground mb-6">
            Seu agendamento foi recebido e está aguardando aprovação. Você será notificado em breve.
          </p>
          <Button onClick={() => setSubmitted(false)} className="w-full">
            Fazer Novo Agendamento
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Portal de Agendamento</h1>
          <p className="text-muted-foreground">Solicite seu agendamento</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo do Agendamento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Consulta de rotina" {...field} />
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
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="date" 
                        className="pl-10"
                        {...field}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
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
                          <SelectValue placeholder="Selecione" />
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
                    <Textarea 
                      placeholder="Informações adicionais sobre o agendamento..." 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Solicitar Agendamento
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}




