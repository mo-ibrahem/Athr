// File: lib/globals.d.ts
export {};

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}