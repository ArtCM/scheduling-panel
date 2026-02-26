import { useNotificationsStore } from '@/features/notifications/store/notifications.store'

interface AppointmentNotification {
  id: string
  patientName: string
  time: string
}

export function useAppointmentNotifications() {
  const addNotification = useNotificationsStore((state) => state.addNotification)

  return {
    notifyNewAppointment: (appointment: AppointmentNotification) => {
      addNotification({
        type: 'request',
        title: 'Nova Solicitação',
        message: `${appointment.patientName} solicitou agendamento para ${appointment.time}`,
        appointmentId: appointment.id,
      })
    },
    notifyApproval: (appointment: AppointmentNotification) => {
      addNotification({
        type: 'appointment',
        title: 'Agendamento Aprovado',
        message: `Agendamento de ${appointment.patientName} foi aprovado`,
        appointmentId: appointment.id,
      })
    },
    notifyCancellation: (appointment: AppointmentNotification) => {
      addNotification({
        type: 'cancellation',
        title: 'Agendamento Cancelado',
        message: `Agendamento de ${appointment.patientName} foi cancelado`,
        appointmentId: appointment.id,
      })
    },
  }
}
