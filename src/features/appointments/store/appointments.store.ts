import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Appointment,
  CreateAppointmentInput,
} from '../types/appointment.types';

interface AppointmentsState {
  appointments: Appointment[];
  addAppointment: (appointment: CreateAppointmentInput) => void;
  removeAppointment: (id: string) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  approveAppointment: (id: string) => void;
  rejectAppointment: (id: string) => void;
  cancelAppointment: (id: string) => void;
  getPendingAppointments: () => Appointment[];
  getAppointmentsByTime: (time: string) => Appointment[];
  getTodayAppointments: () => number;
  getMonthAppointments: () => number;
  getAverageAppointmentDuration: () => number;
  getTotalClients: () => number;
  isTimeSlotAvailable: (
    date: string,
    time: string,
    excludeId?: string,
  ) => boolean;
}

export const useAppointmentsStore = create<AppointmentsState>()(
  persist(
    (set, get) => ({
      appointments: [],

      addAppointment: (appointment) => {
        console.log('Adding appointment:', appointment)
        const newAppointment: Appointment = {
          ...appointment,
          id: crypto.randomUUID(),
          status: 'approved',
          createdAt: new Date()
        }
        set((state) => ({
          appointments: [...state.appointments, newAppointment]
        }))
      },

      removeAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== id),
        }));
      },

      updateAppointment: (id, data) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, ...data } : apt,
          ),
        }));
      },

      approveAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, status: 'approved' as const } : apt,
          ),
        }));
      },

      rejectAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, status: 'rejected' as const } : apt,
          ),
        }));
      },

      cancelAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, status: 'cancelled' } : apt,
          ),
        }))
      },

      getPendingAppointments: () => {
        return get().appointments.filter((apt) => apt.status === 'pending');
      },

      getAppointmentsByTime: (time) => {
        return get().appointments.filter(
          (apt) => apt.time === time && apt.status === 'approved',
        );
      },

      getTodayAppointments: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().appointments.filter(
          (apt) => apt.date === today && apt.status === 'approved',
        ).length;
      },

      getMonthAppointments: () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return get().appointments.filter((apt) => {
          if (apt.status !== 'approved') return false;
          const aptDate = new Date(apt.date);
          return (
            aptDate.getMonth() === currentMonth &&
            aptDate.getFullYear() === currentYear
          );
        }).length;
      },

      getAverageAppointmentDuration: () => {
        const approvedAppointments = get().appointments.filter(
          (apt) => apt.status === 'approved',
        );
        if (approvedAppointments.length === 0) return 45;

        const totalDuration = approvedAppointments.reduce(
          (sum, apt) => sum + apt.duration,
          0,
        );
        return Math.round(totalDuration / approvedAppointments.length);
      },

      getTotalClients: () => {
        const uniqueClients = new Set(
          get()
            .appointments.filter((apt) => apt.status === 'approved')
            .map((apt) => apt.patientName),
        );
        return uniqueClients.size;
      },

      isTimeSlotAvailable: (date, time, excludeId) => {
        const [hours, minutes] = time.split(':').map(Number);
        const requestedStart = hours * 60 + minutes;

        return !get().appointments.some((apt) => {
          if (apt.id === excludeId) return false;
          if (apt.date !== date) return false;
          if (apt.status === 'rejected') return false;

          const [aptHours, aptMinutes] = apt.time.split(':').map(Number);
          const aptStart = aptHours * 60 + aptMinutes;
          const aptEnd = aptStart + apt.duration;

          return requestedStart >= aptStart && requestedStart < aptEnd;
        });
      },
    }),
    {
      name: 'appointments-storage',
      skipHydration: true,
    },
  ),
);






