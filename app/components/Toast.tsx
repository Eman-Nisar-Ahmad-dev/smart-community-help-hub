'use client'

import { useEffect } from 'react'

type ToastProps = {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium animate-[fadeIn_0.3s_ease-out] ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{type === 'success' ? '✅' : '⚠️'}</span>
        <span>{message}</span>
        <button onClick={onClose} className="ml-3 text-white/80 hover:text-white">✕</button>
      </div>
    </div>
  )
}