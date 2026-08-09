import React from 'react'

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs rounded-lg',
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
}

const variantClasses = {
  primary:
    'bg-gradient-to-r from-violet-600 to-lavender-500 text-white shadow-soft hover:shadow-elevated hover:brightness-110 active:brightness-95',
  secondary:
    'bg-white text-violet-700 border border-lavender-200 shadow-soft hover:bg-lavender-50 hover:border-lavender-300 active:bg-lavender-100',
  ghost:
    'bg-transparent text-violet-600 hover:bg-lavender-50 active:bg-lavender-100',
  outline:
    'bg-transparent text-violet-600 border border-violet-300 hover:bg-violet-50 hover:border-violet-400 active:bg-violet-100',
  danger:
    'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-soft hover:shadow-elevated hover:brightness-110 active:brightness-95',
  soft:
    'bg-lavender-100 text-violet-700 hover:bg-lavender-200 active:bg-lavender-300',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold
        transition-all duration-200 ease-out
        cursor-pointer
        select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight className="h-4 w-4 shrink-0" />}
    </button>
  )
}
