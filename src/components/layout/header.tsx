'use client';

import { Bell, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            suppressHydrationWarning
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Alternar tema</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild suppressHydrationWarning>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notificações</span>
                <Badge variant="secondary" className="ml-2">
                  3
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer hover:bg-accent p-0"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex items-start gap-3 p-3 w-full group">
                  <div
                    className="flex-1 flex items-center justify-between"
                    onClick={() => {
                      /* TODO: abrir modal */
                    }}
                  >
                    <div className="flex flex-col items-start justify-start mb-1">
                      <p className="text-sm font-medium">Novo agendamento</p>
                      <p className="text-xs text-muted-foreground">
                        João Silva agendou para hoje às 14h
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">14:30</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: remover notificação
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer hover:bg-accent p-0"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex items-start gap-3 p-3 w-full group">
                  <div
                    className="flex-1 flex items-center justify-between"
                    onClick={() => {
                      /* TODO: abrir modal */
                    }}
                  >
                    <div className="flex flex-col items-start justify-start mb-1">
                      <p className="text-sm font-medium">Cancelamento</p>
                      <p className="text-xs text-muted-foreground">
                        Maria Santos cancelou o agendamento
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">12:15</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: remover notificação
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer hover:bg-accent p-0"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex items-start gap-3 p-3 w-full group">
                  <div
                    className="flex-1 flex items-center justify-between"
                    onClick={() => {
                      /* TODO: abrir modal */
                    }}
                  >
                    <div className="flex flex-col items-start justify-start mb-1">
                      <p className="text-sm font-medium">Lembrete</p>
                      <p className="text-xs text-muted-foreground">
                        Você tem 5 agendamentos amanhã
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">09:00</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: remover notificação
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-accent text-center justify-center text-sm text-primary">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild suppressHydrationWarning>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="Usuário" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-accent">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}



