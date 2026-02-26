import { useAppointmentsStore } from '../store/appointments.store'
import { TIME_SLOTS } from '@/lib/constants'

export function useAppointments() {
  const { appointments, addAppointment, removeAppointment, getAppointmentsByTime } = 
    useAppointmentsStore()

  const appointmentsBySlot = TIME_SLOTS.reduce((acc, time) => {
    acc[time] = getAppointmentsByTime(time)
    return acc
  }, {} as Record<string, ReturnType<typeof getAppointmentsByTime>>)

  return {
    appointments,
    appointmentsBySlot,
    addAppointment,
    removeAppointment,
  }
}
