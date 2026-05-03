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
    if (task) {
      setStatus(task.status)
    }
  }, [task])

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
        <div className="text-sm text-slate-600">{task.title}</div>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Status
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
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
