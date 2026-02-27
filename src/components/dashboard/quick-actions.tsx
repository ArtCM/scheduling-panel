'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExternalLink, Calendar, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { PendingAppointmentsModal } from './pending-appointments-modal'

export function QuickActions() {
  const [pendingModalOpen, setPendingModalOpen] = useState(false)

  return (
    <>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="space-y-3">
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/dashboard/agenda">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Agenda Completa
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <a href="/portal" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Portal de Agendamento Público
            </a>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/dashboard/clientes">
              <Users className="h-4 w-4 mr-2" />
              Gerenciar Clientes
            </Link>
          </Button>
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={() => setPendingModalOpen(true)}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Aprovar Agendamentos
          </Button>
        </div>
      </Card>

      <PendingAppointmentsModal 
        open={pendingModalOpen} 
        onOpenChange={setPendingModalOpen} 
      />
    </>
  )
}



