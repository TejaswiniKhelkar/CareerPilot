import React from 'react'

const variantClasses = {
  default:
    'bg-white border border-lavender-100 shadow-card',
  elevated:
    'bg-white shadow-elevated',
  glass:
    'glass',
  'glass-strong':
    'glass-strong',
  outlined:
    'bg-transparent border border-lavender-200',
  gradient:
    'bg-gradient-to-br from-white to-lavender-50 border border-lavender-100 shadow-card',
  accent:
    'bg-gradient-to-br from-violet-500 to-lavender-500 text-white shadow-elevated',
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  rounded = 'rounded-2xl',
  hover = false,
  className = '',
  ...props
}) {
  return (
    <div
      className={`
        ${rounded}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hover ? 'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevated cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
