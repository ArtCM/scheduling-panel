export type AppointmentStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed'

export interface Appointment {
  id: string
  title: string
  patientName: string
  date: string
  time: string
  duration: number
  status: AppointmentStatus
  description?: string
  createdAt: Date
}

export interface CreateAppointmentInput {
  title: string
  patientName: string
  date: string
  time: string
  duration: number
  description?: string
  status?: 'pending' | 'approved'
}




