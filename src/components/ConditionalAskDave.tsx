'use client'

import { usePathname } from 'next/navigation'
import { AskDave } from './AskDave'

export function ConditionalAskDave() {
  const pathname = usePathname()
  if (pathname?.startsWith('/blog') || pathname?.startsWith('/admin')) {
    return null
  }
  
  return <AskDave />
}
