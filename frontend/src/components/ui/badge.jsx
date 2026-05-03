import clsx from 'clsx'

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    'status-todo': 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    'status-in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'status-done': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  }

  return (
    <span className={clsx('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}
