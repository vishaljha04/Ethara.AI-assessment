import clsx from 'clsx'

export function Button({ children, className, variant = 'primary', size = 'md', disabled, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus:ring-zinc-800',
    outline: 'border-2 border-zinc-300 text-zinc-900 hover:bg-gray-50 focus:ring-zinc-300 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800',
    ghost: 'bg-transparent text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-300 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
  }
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  }

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

