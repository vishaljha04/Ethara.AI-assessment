import clsx from 'clsx'

export function Select({ label, name, value, onChange, options, className, required, disabled }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={clsx(
          'w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition',
          'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
          'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-blue-900',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <option value="">Select an option</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
