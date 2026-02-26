import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExternalLink, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
      <div className="space-y-3">
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/agenda">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Agenda Completa
          </Link>
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <a href="https://seu-link-de-agendamento.com" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Portal de Agendamento Público
          </a>
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/clientes">
            <Users className="h-4 w-4 mr-2" />
            Gerenciar Clientes
          </Link>
        </Button>
      </div>
    </Card>
  )
}