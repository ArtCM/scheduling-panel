'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Users, Settings, CheckCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useFeatureToast } from '@/hooks/use-feature-toast'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Solicitações', href: '/solicitacoes', icon: CheckCircle },
  { name: 'Clientes', href: '/clientes', icon: Users },
  { name: 'Configurações', href: '#', icon: Settings, disabled: true },
]

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { showFeatureNotAvailable } = useFeatureToast()

  const handleNavClick = (item: typeof navigation[0], e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault()
      showFeatureNotAvailable()
      return
    }
    onClose?.()
  }
  
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-card border-r transition-transform duration-300 ease-in-out w-64",
      "z-50 md:z-40",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-center flex-col relative">
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
            width={200} 
            height={50}
          />
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
                onClick={(e) => handleNavClick(item, e)}
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



















