// src/global.d.ts
interface Window {
  ethereum?: {
    isMetaMask?: boolean
    request: (args: { method: string; params?: unknown[] }) => Promise<string[]>
    on?: (eventName: string, callback: (...args: unknown[]) => void) => void
  }
}
