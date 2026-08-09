import React from 'react'

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-3.5 py-1.5 text-sm',
}

const variantClasses = {
  primary:   'bg-violet-100 text-violet-700',
  secondary: 'bg-lavender-100 text-lavender-700',
  success:   'bg-emerald-100 text-emerald-700',
  warning:   'bg-amber-100 text-amber-700',
  error:     'bg-red-100 text-red-700',
  info:      'bg-blue-100 text-blue-700',
  outline:   'bg-transparent border border-violet-300 text-violet-600',
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`
            w-1.5 h-1.5 rounded-full
            ${variant === 'success' ? 'bg-emerald-500' :
              variant === 'warning' ? 'bg-amber-500' :
              variant === 'error' ? 'bg-red-500' :
              'bg-violet-500'}
          `}
        />
      )}
      {children}
    </span>
  )
}
