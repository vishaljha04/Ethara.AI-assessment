import { InboxIcon, FolderOpen, CheckCircle2 } from 'lucide-react'
import { Button } from './button'

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 px-6 text-center dark:border-slate-600 dark:bg-slate-800">
      <div className="mb-4 inline-flex rounded-full bg-slate-100 p-3 dark:bg-slate-700">
        {Icon ? <Icon size={24} className="text-slate-600 dark:text-slate-400" /> : <InboxIcon size={24} className="text-slate-600 dark:text-slate-400" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
