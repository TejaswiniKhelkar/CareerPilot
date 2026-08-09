import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const colorMap = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-violet-200 bg-violet-50 text-violet-800',
}

const iconColorMap = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-violet-500',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => {
          const Icon = iconMap[t.type]
          return (
            <div
              key={t.id}
              className={`
                pointer-events-auto
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                border
                shadow-elevated
                backdrop-blur-sm
                animate-fade-in-up
                min-w-[280px] max-w-sm
                ${colorMap[t.type]}
              `}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${iconColorMap[t.type]}`} />
              <p className="text-sm font-medium flex-1">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-0.5 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5 opacity-50" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
