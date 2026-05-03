import clsx from 'clsx'

export function Card({ children, className, variant = 'default' }) {
  const variants = {
    default: 'rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800',
    elevated: 'rounded-lg border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800',
    outline: 'rounded-lg border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800',
  }

  return (
    <div className={clsx(variants[variant], 'p-6', className)}>
      {children}
    </div>
  )
}

