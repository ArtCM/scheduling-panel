export interface Appointment {
  id: string
  title: string
  patientName: string
  time: string
  duration: number
  description?: string
  createdAt: Date
}

export type CreateAppointmentInput = Omit<Appointment, 'id' | 'createdAt'>
