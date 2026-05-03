import { InboxIcon } from 'lucide-react'

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-gray-50 py-12 px-6 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4 inline-flex rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
        {Icon ? <Icon size={24} className="text-zinc-600 dark:text-zinc-400" /> : <InboxIcon size={24} className="text-zinc-600 dark:text-zinc-400" />}
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
