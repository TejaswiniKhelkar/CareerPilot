import React from 'react'

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  helperText,
  className = '',
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className={`
            w-full
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
            text-sm text-slate-800 placeholder-slate-400
            bg-white
            border rounded-xl
            transition-all duration-200
            outline-none
            ${error
              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-lavender-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100'
            }
            shadow-soft
          `}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-red-500' : 'text-slate-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}
