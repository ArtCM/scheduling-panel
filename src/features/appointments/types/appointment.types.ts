export interface Appointment {
  id: string
  title: string
  patientName: string
  date: string
  time: string
  duration: number
  description?: string
  status: 'pending' | 'approved' | 'rejected'
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


