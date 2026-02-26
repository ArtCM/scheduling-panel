'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <motion.div
      className={cn(
        'bg-linear-to-r from-primary via-purple-500 to-primary bg-size-[200%_auto] bg-clip-text text-transparent',
        'animate-gradient',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
