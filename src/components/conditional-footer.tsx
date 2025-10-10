'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Don't show footer on docs pages (they have their own)
  if (pathname?.startsWith('/docs')) {
    return null
  }
  
  return <Footer />
}

