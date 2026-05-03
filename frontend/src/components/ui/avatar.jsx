import clsx from 'clsx'

const getInitials = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  const first = parts[0][0] || ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export function Avatar({ name, size = 'md', className }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }

  return (
    <div
      title={name}
      className={clsx(
        'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-sm',
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}

