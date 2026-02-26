'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

export function Logo() {
  const { resolvedTheme } = useTheme()
  
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) {
    return <div className="w-50 h-12.5" />
  }

  return (
    <Image 
      src={resolvedTheme === 'dark' ? '/logo-dark-mode.png' : '/logo.png'}
      alt="Logo" 
      width={200} 
      height={50}
      priority
    />
  )
}
