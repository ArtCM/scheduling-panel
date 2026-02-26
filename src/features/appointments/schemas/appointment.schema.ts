import { z } from 'zod'

export const appointmentSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  patientName: z.string().min(3, 'Nome do paciente é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário inválido'),
  duration: z.number().min(15, 'Duração mínima de 15 minutos').max(240, 'Duração máxima de 4 horas'),
  description: z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

