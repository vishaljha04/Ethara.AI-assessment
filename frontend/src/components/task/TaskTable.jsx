import { Button } from '../ui/button'

const statusLabel = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
}

const statusClasses = {
  todo: 'bg-amber-100 text-amber-700',
  'in-progress': 'bg-sky-100 text-sky-700',
  done: 'bg-emerald-100 text-emerald-700',
}

export function TaskTable({ tasks, onStatusChange, loading }) {
  if (loading) {
    return <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">Loading tasks…</div>
  }

  if (!tasks.length) {
    return <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">No tasks found yet. Create a task to get started.</div>
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        <thead className="bg-gray-50 dark:bg-zinc-900 text-left text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          <tr>
            <th className="px-6 py-4">Task</th>
            <th className="px-6 py-4">Project</th>
            <th className="px-6 py-4">Assignee</th>
            <th className="px-6 py-4">Due</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 text-sm text-zinc-700 dark:divide-zinc-800 dark:text-zinc-300">
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="px-6 py-4">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">{task.title}</div>
                <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{task.description || 'No description'}</div>
              </td>
              <td className="px-6 py-4">{task.projectId?.name}</td>
              <td className="px-6 py-4">{task.assignedTo?.name}</td>
              <td className="px-6 py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[task.status]}`}>
                  {statusLabel[task.status]}
                </span>
              </td>
              <td className="px-6 py-4">
                <Button variant="secondary" size="sm" onClick={() => onStatusChange(task)}>
                  Update status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
