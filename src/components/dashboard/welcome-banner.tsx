'use client'

import { Card } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'

export function WelcomeBanner() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>
          <div>
            <AnimatedGradientText>
              <h2 className="text-2xl font-bold">{greeting}! 👋</h2>
            </AnimatedGradientText>
            <p className="text-sm text-muted-foreground mt-1">
              Você tem <span className="font-semibold text-primary">3 agendamentos</span> para hoje
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
