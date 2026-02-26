export interface Appointment {
  id: string
  title: string
  patientName: string
  date: string
  time: string
  duration: number
  description?: string
  createdAt: Date
}

export type CreateAppointmentInput = Omit<Appointment, 'id' | 'createdAt'>

