import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Appointment, CreateAppointmentInput } from '../types/appointment.types'

interface AppointmentsState {
  appointments: Appointment[]
  addAppointment: (appointment: CreateAppointmentInput) => void
  removeAppointment: (id: string) => void
  getAppointmentsByTime: (time: string) => Appointment[]
}

export const useAppointmentsStore = create<AppointmentsState>()(
  persist(
    (set, get) => ({
      appointments: [],
      
      addAppointment: (input) => {
        const newAppointment: Appointment = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        }
        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }))
      },
      
      removeAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== id),
        }))
      },
      
      getAppointmentsByTime: (time) => {
        return get().appointments.filter((apt) => apt.time === time)
      },
    }),
    {
      name: 'appointments-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
