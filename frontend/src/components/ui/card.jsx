import clsx from 'clsx'

export function Card({ children, className, variant = 'default' }) {
  const variants = {
    default: 'rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900',
    elevated: 'rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900',
    outline: 'rounded-lg border-2 border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900',
  }

  return (
    <div className={clsx(variants[variant], 'p-6', className)}>
      {children}
    </div>
  )
}

