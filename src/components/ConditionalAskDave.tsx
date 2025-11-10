'use client'

import { usePathname } from 'next/navigation'
import { AskDave } from './AskDave'

export function ConditionalAskDave() {
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')
  
  if (isBlogPage) {
    return null
  }
  
  return <AskDave />
}
