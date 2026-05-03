import clsx from 'clsx'

export function Input({ label, className, error, ...props }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {label}
      <input
        className={clsx(
          'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition',
          'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
          'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-blue-900',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-zinc-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </label>
  )
}

