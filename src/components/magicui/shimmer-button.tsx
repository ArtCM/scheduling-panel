'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

interface ShimmerButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
}

export function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '100px',
  background = 'rgba(0, 0, 0, 1)',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        ['--shimmer-color' as string]: shimmerColor,
        ['--shimmer-size' as string]: shimmerSize,
        ['--shimmer-duration' as string]: shimmerDuration,
        ['--border-radius' as string]: borderRadius,
        ['--background' as string]: background,
      }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-6 py-2 font-medium text-white transition-all duration-300',
        'before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full before:animate-shimmer',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}





