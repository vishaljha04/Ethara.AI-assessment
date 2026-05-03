import { Trash2, Edit2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export function TaskCard({ task, onStatusChange, onDelete }) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'
  const getStatusVariant = (status) => {
    switch (status) {
      case 'done':
        return 'status-done'
      case 'in-progress':
        return 'status-in-progress'
      default:
        return 'status-todo'
    }
  }

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger'
      case 'medium':
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            <input type="checkbox" checked={task.status === 'done'} onChange={() => onStatusChange(task)} className="mt-1 rounded" />
            <div className="flex-1">
              <h3 className={`font-semibold text-slate-900 dark:text-slate-100 ${task.status === 'done' ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                {task.title}
              </h3>
              {task.description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{task.description}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant={getStatusVariant(task.status)}>{task.status.replace('-', ' ')}</Badge>
                {task.priority && <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>}
                {isOverdue && <Badge variant="danger">Overdue</Badge>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
          <Button variant="ghost" size="sm" onClick={() => onStatusChange(task)}>
            <Edit2 size={16} />
          </Button>
          {onDelete && <Button variant="ghost" size="sm" onClick={() => onDelete(task._id)}>
            <Trash2 size={16} />
          </Button>}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        {task.projectId && <span>{task.projectId.name}</span>}
        {task.assignedTo && <span>Assigned to {task.assignedTo.name}</span>}
        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  )
}
