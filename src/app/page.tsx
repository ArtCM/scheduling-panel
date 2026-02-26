'use client'

import { useSyncExternalStore } from 'react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments'
import { Calendar, Users, Clock} from 'lucide-react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'

export default function Home() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const todayAppointments = useAppointmentsStore((state) => state.getTodayAppointments())
  const monthAppointments = useAppointmentsStore((state) => state.getMonthAppointments())
  const totalClients = useAppointmentsStore((state) => state.getTotalClients())
  const avgDuration = useAppointmentsStore((state) => state.getAverageAppointmentDuration())

  if (!mounted) {
    return (
      <div className="p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Agendamentos Hoje" value={0} icon={Calendar} />
          <StatsCard title="Total de Clientes" value={0} icon={Users} />
          <StatsCard title="Agendamentos do Mês" value={0} icon={Calendar} />
          <StatsCard title="Tempo Médio" value="45min" icon={Clock} />
        </div>
        <QuickActions />
        <UpcomingAppointments />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Agendamentos Hoje" 
          value={todayAppointments} 
          icon={Calendar}
        />
        <StatsCard 
          title="Total de Clientes" 
          value={totalClients} 
          icon={Users}
        />
        <StatsCard 
          title="Agendamentos do Mês" 
          value={monthAppointments} 
          icon={Calendar}
        />
        <StatsCard 
          title="Tempo Médio" 
          value={`${avgDuration}min`} 
          icon={Clock}
        />
      </div>
      <QuickActions />
      <UpcomingAppointments />
    </div>
  )
}




