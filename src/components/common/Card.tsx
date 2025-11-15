import { cn } from '@/utils/cn'
import React from 'react'

function Card({ children, className }: { children: React.ReactNode, className?: string}) {
  return (
    <div className={cn("card", className)}>
      {children}
    </div>
  )
}

export default Card