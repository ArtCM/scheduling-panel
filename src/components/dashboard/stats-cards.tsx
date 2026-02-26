'use client'

import { Card } from '@/components/ui/card'
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'

export function StatsCards() {
  const getTodayAppointments = useAppointmentsStore((state) => state.getTodayAppointments)
  const getMonthAppointments = useAppointmentsStore((state) => state.getMonthAppointments)
  const getAverageAppointmentDuration = useAppointmentsStore((state) => state.getAverageAppointmentDuration)
  const getTotalClients = useAppointmentsStore((state) => state.getTotalClients)

  const stats = [
    {
      title: 'Agendamentos Hoje',
      value: getTodayAppointments(),
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Agendamentos no Mês',
      value: getMonthAppointments(),
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Duração Média',
      value: `${getAverageAppointmentDuration()} min`,
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      title: 'Total de Clientes',
      value: getTotalClients(),
      icon: Users,
      color: 'text-purple-600',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}