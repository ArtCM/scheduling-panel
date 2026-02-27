'use client'

import { useState, useEffect, startTransition } from 'react'
import { CreateAppointmentModal } from '@/components/agenda/create-appointment-modal'
import { AgendaGrid } from '@/components/agenda/agenda-grid'
import { useAppointmentsStore } from '@/features/appointments/store/appointments.store'
import { Calendar } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function AgendaPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    useAppointmentsStore.persist.rehydrate()
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  if (!mounted) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Agenda Diária</h1>
            <p className="text-muted-foreground mt-1">Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agenda Diária</h1>
          <p className="text-muted-foreground mt-1">
            {format(parseISO(selectedDate), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            />
          </div>
          <CreateAppointmentModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
      <AgendaGrid selectedDate={selectedDate} />
    </div>
  )
}








