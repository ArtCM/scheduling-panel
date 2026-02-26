'use client'

import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments'
import { StatsCard } from '@/components/dashboard/stats-card'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { Calendar, Users, Clock} from 'lucide-react'
import { useAppointments } from '@/features/appointments/hooks/use-appointments'

export default function Home() {
  const { appointments } = useAppointments()
  const todayAppointments = appointments.filter(
    apt => new Date(apt.date).toDateString() === new Date().toDateString()
  ).length

  const monthAppointments = appointments.filter(apt => {
    const date = new Date(apt.date)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Agendamentos Hoje" 
          value={todayAppointments} 
          icon={Calendar}
        />
        <StatsCard 
          title="Total de Clientes" 
          value={45} 
          icon={Users}
        />
        <StatsCard 
          title="Agendamentos do Mês" 
          value={monthAppointments} 
          icon={Calendar}
        />
        <StatsCard 
          title="Tempo Médio" 
          value="45min" 
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <QuickActions />
      </div>
    </div>
  )
}








