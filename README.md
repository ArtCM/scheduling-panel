<div markdown="1">

# 📅 Sistema de Agendamento - Scheduling Panel

<br>
Arthur Correa - Desenvolvedor
<br><br>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=0E76A8)](https://www.linkedin.com/in/arthurcorream/)

Ver: 0.0.1 - Last update: 26/02/2026

<br>

</div>

Sistema completo de gerenciamento de agendamentos com painel administrativo e portal público para solicitações.

## 🎥 Demonstração

- **Ambiente de Homologação**: [Clique aqui](https://scheduling-panel.vercel.app/dashboard)

![Screenshot do Sistema](/preview.png)

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### UI/UX
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis e acessíveis
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de UI sem estilo
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Suporte a tema claro/escuro

### Gerenciamento de Estado
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management leve e performático

### Validações
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first

### Utilitários
- **[date-fns](https://date-fns.org/)** - Manipulação de datas
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes
- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais

---

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                          # App Router do Next.js
│   ├── dashboard/               # Área administrativa (com layout)
│   │   ├── layout.tsx          # Layout com sidebar e header
│   │   ├── page.tsx            # Dashboard principal
│   │   ├── agenda/             # Calendário de agendamentos
│   │   ├── agendamentos/       # Lista de todos os agendamentos
│   │   ├── solicitacoes/       # Aprovação de solicitações pendentes
│   │   ├── clientes/           # Gerenciamento de clientes
│   │   └── notificacoes/       # Central de notificações
│   ├── portal/                 # Portal público (sem layout)
│   │   └── page.tsx            # Formulário de solicitação
│   ├── layout.tsx              # Layout raiz (providers globais)
│   └── globals.css             # Estilos globais
│
├── components/                  # Componentes React
│   ├── ui/                     # Componentes shadcn/ui
│   ├── layout/                 # Componentes de layout
│   │   ├── header.tsx          # Cabeçalho com notificações
│   │   ├── sidebar.tsx         # Menu lateral de navegação
│   │   └── logo.tsx            # Logo com suporte a tema
│   ├── dashboard/              # Componentes do dashboard
│   │   ├── stats-card.tsx      # Cards de estatísticas
│   │   ├── upcoming-appointments.tsx
│   │   └── quick-actions.tsx   # Ações rápidas
│   ├── agenda/                 # Componentes do calendário
│   ├── clientes/               # Componentes de clientes
│   └── magicui/                # Componentes animados
│
├── features/                    # Módulos de funcionalidades
│   ├── appointments/           # Gerenciamento de agendamentos
│   │   ├── store/              # Zustand store
│   │   ├── types/              # TypeScript types
│   │   └── hooks/              # Custom hooks
│   └── notifications/          # Sistema de notificações
│       ├── store/
│       └── types/
│
├── hooks/                       # Custom hooks globais
│   └── use-feature-toast.ts    # Toast para features desabilitadas
│
└── lib/                         # Utilitários e configurações
    └── utils.ts                # Funções auxiliares
```

---

## 📦 Componentes Principais

### Dashboard (`/dashboard`)
Painel administrativo completo com:
- **Stats Cards**: Métricas em tempo real (agendamentos hoje, total de clientes, etc.)
- **Upcoming Appointments**: Próximos agendamentos com ações rápidas
- **Quick Actions**: Atalhos para funcionalidades principais

### Agenda (`/dashboard/agenda`)
Calendário interativo com:
- Visualização mensal de agendamentos
- Indicadores visuais de status (aprovado, pendente, cancelado)
- Modal de detalhes ao clicar em um agendamento
- Navegação entre meses

### Agendamentos (`/dashboard/agendamentos`)
Lista completa de agendamentos com:
- Filtros por status e busca por nome
- Paginação
- Ações de edição e cancelamento
- Visualização de detalhes

### Solicitações (`/dashboard/solicitacoes`)
Gerenciamento de solicitações pendentes:
- Lista de agendamentos aguardando aprovação
- Botões de aprovar/rejeitar
- Notificações de confirmação

### Clientes (`/dashboard/clientes`)
Gerenciamento de clientes com:
- Lista de todos os clientes
- Estatísticas por cliente (total de agendamentos, último agendamento)
- Modal com histórico completo de agendamentos

### Portal Público (`/portal`)
Formulário de solicitação de agendamento:
- Seleção de data e horário
- Validação de horários disponíveis
- Bloqueio de horários passados
- Confirmação visual após envio
- **Totalmente isolado** (sem sidebar/header)

### Notificações (`/dashboard/notificacoes`)
Central de notificações com:
- Lista de todas as notificações
- Filtros por tipo
- Paginação
- Marcação como lida

---

## 🎨 Sistema de Temas

O projeto suporta **tema claro e escuro** com:
- Troca automática baseada no sistema operacional
- Persistência da preferência do usuário
- Componentes otimizados para ambos os temas
- Logo adaptável ao tema ativo

---

## 🗄️ Gerenciamento de Estado

### Zustand Stores

#### Appointments Store
```typescript
- appointments: Appointment[]      // Lista de agendamentos
- addAppointment()                 // Adicionar novo
- updateAppointment()              // Atualizar existente
- removeAppointment()              // Remover
- persist: true                    // Persistência no localStorage
```

#### Notifications Store
```typescript
- notifications: Notification[]    // Lista de notificações
- addNotification()                // Adicionar nova
- markAsRead()                     // Marcar como lida
- markAllAsRead()                  // Marcar todas como lidas
- persist: true                    // Persistência no localStorage
```

---

## 🚦 Fluxo de Agendamento

1. **Cliente acessa `/portal`**
   - Preenche formulário (nome, data, horário, observações)
   - Sistema valida horários disponíveis
   - Agendamento criado com `status: 'pending'`

2. **Notificação gerada automaticamente**
   - Aparece no header do dashboard
   - Registrada na central de notificações

3. **Administrador acessa `/dashboard/solicitacoes`**
   - Visualiza solicitações pendentes
   - Aprova → `status: 'approved'`
   - Rejeita → agendamento removido

4. **Agendamento aprovado**
   - Aparece na agenda
   - Visível na lista de agendamentos
   - Contabilizado nas estatísticas

---

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 20+ 
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta
cd scheduling-panel

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse:
- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Portal Público**: [http://localhost:3000/portal](http://localhost:3000/portal)

### Build para Produção

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

### Nomenclatura de commits

---

- docs: apenas mudanças de documentação;
- feat: uma nova funcionalidade;
- fix: a correção de um bug;
- perf: mudança de código focada em melhorar performance;
- refactor: mudança de código que não adiciona uma funcionalidade e também não corrigi um bug;
- style: mudanças no código que não afetam seu significado (espaço em branco, formatação, ponto e vírgula, etc);
- test: adicionar ou corrigir testes.

---