import { Clock } from 'lucide-react'
import { Avatar } from '../ui/avatar'

const formatTime = (dateString) => {
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString()
}

export function ActivityFeed({ activities = [], loading }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!activities.length) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-gray-50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        No recent activity yet.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity._id}
          className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <Avatar name={activity.userId?.name} size="sm" className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="text-sm text-zinc-900 dark:text-zinc-100">
              {activity.message}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Clock size={14} />
              <span>{formatTime(activity.createdAt)}</span>
              {activity.projectId?.name && <span className="truncate">• {activity.projectId.name}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

