

"use client"

import Link from 'next/link'
import type React from 'react'

export function BackButton() {
  const styles: { [key: string]: React.CSSProperties } = {
    backLink: {
      fontSize: '28px',
      color: '#999',
      textDecoration: 'none',
      transition: 'color 0.2s',
      lineHeight: '1',
    },
  }

  return (
    <Link 
      href="/admin" 
      style={styles.backLink}
      onMouseOver={(e) => e.currentTarget.style.color = '#111'}
      onMouseOut={(e) => e.currentTarget.style.color = '#999'}
    >
      &larr;
    </Link>
  )
}