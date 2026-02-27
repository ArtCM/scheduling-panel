'use client'

import { useState, useEffect, startTransition } from 'react'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ClientDetailsModal } from '@/components/clientes/client-details-modal'

export default function ClientesPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedClient, setSelectedClient] = useState<{
    name: string
    totalAppointments: number
    lastAppointment: Date | null
    upcomingAppointments: number
    completedAppointments: number
  } | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const appointments = useAppointmentsStore((state) => state.appointments)

  useEffect(() => {
    useAppointmentsStore.persist.rehydrate()
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  if (!mounted) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Clientes</h1>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  // Agrupar agendamentos por cliente
  const clientsMap = new Map<string, {
    name: string
    totalAppointments: number
    lastAppointment: Date | null
    upcomingAppointments: number
    completedAppointments: number
  }>()

  appointments.forEach(apt => {
    const existing = clientsMap.get(apt.patientName) || {
      name: apt.patientName,
      totalAppointments: 0,
      lastAppointment: null,
      upcomingAppointments: 0,
      completedAppointments: 0,
    }

    existing.totalAppointments++
    
    const aptDate = new Date(apt.date + 'T' + apt.time)
    if (!existing.lastAppointment || aptDate > existing.lastAppointment) {
      existing.lastAppointment = aptDate
    }

    if (apt.status === 'completed') {
      existing.completedAppointments++
    }

    if (aptDate > new Date() && apt.status === 'approved') {
      existing.upcomingAppointments++
    }

    clientsMap.set(apt.patientName, existing)
  })

  const clients = Array.from(clientsMap.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  )

  const handleClientClick = (client: typeof clients[0]) => {
    setSelectedClient(client)
    setDetailsOpen(true)
  }

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground mt-1">
              {clients.length} cliente(s) cadastrado(s)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.length > 0 ? (
            clients.map((client) => (
              <Card 
                key={client.name} 
                className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleClientClick(client)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">Cliente</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total de agendamentos</span>
                      <Badge variant="secondary">{client.totalAppointments}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Concluídos</span>
                      <Badge className="bg-blue-500">{client.completedAppointments}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Próximos</span>
                      <Badge className="bg-green-500">{client.upcomingAppointments}</Badge>
                    </div>

                    {client.lastAppointment && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">Último agendamento</p>
                        <p className="text-sm font-medium flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {format(client.lastAppointment, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 col-span-full">
              <p className="text-center text-muted-foreground">
                Nenhum cliente encontrado
              </p>
            </Card>
          )}
        </div>
      </div>

      <ClientDetailsModal
        client={selectedClient}
        appointments={appointments}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  )
}
