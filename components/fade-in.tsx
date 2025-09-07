"use client"

import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.6, className = "" }: FadeInProps) {
  return <div className={className}>{children}</div>
}
