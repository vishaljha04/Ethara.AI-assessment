import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'

const statusOptions = [
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

export function TaskStatusModal({ task, open, onClose, onSave }) {
  const [status, setStatus] = useState(task?.status || 'todo')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open && task) setStatus(task.status || 'todo')
  }, [open, task])

  if (!open || !task) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(status)
  }

  return (
    <Dialog
      open={open}
      title="Update task status"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save status</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">{task.title}</div>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Status
          <select
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-800"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
    </Dialog>
  )
}
