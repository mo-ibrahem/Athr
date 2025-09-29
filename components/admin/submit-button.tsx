"use client"

import type React from "react"

// Define the styles for the button
const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  backgroundColor: '#000',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 500,
  alignSelf: 'flex-start',
  transition: 'background-color 0.2s',
};

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button 
      type="submit" 
      style={buttonStyle}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#000'}
    >
      {children}
    </button>
  );
}