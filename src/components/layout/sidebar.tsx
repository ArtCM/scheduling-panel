'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Users, Settings, BarChart3, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Clientes', href: '/clientes', icon: Users },
  { name: 'Relatórios', href: '/relatorios', icon: BarChart3 },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-card border-r transition-transform duration-300 ease-in-out w-64",
      "z-50 md:z-40",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 h-full flex flex-col">
        <div className="mb-8 flex items-center justify-center flex-col relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={100} 
            height={30}
          />
          <p className="text-sm text-muted-foreground mt-2">Sistema de Agendamentos</p>
        </div>
        
        <nav className="space-y-2 flex-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive 
                    ? 'bg-primary text-primary-foreground font-medium' 
                    : 'hover:bg-accent text-muted-foreground'
                )}
                onClick={() => onClose?.()}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}












