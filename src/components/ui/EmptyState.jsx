import React from 'react'

export default function EmptyState({ title = 'Nothing here', description = 'No items to show yet.', className = '' }) {
  return (
    <div className={`rounded-2xl border border-lavender-100 bg-white p-6 text-center ${className}`}>
      <p className="text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  )
}
