"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SlideInProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  className?: string
}

const slideVariants = {
  left: { x: -100, opacity: 0 },
  right: { x: 100, opacity: 0 },
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
}

const slideInVariants = {
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  up: { y: 0, opacity: 1 },
  down: { y: 0, opacity: 1 },
}

export function SlideIn({ children, direction = "up", delay = 0, duration = 0.6, className = "" }: SlideInProps) {
  return (
    <motion.div
      initial={slideVariants[direction]}
      animate={slideInVariants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
