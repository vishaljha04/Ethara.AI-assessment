import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Select } from '../ui/select'
import { CommentSection } from './CommentSection'
import { useAuth } from '../../context/AuthContext'

const statusOptions = [
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export function TaskStatusModal({ task, open, onClose, onSave, onPrioritySave, onAddComment }) {
  const [status, setStatus] = useState(task?.status || 'todo')
  const [priority, setPriority] = useState(task?.priority || 'medium')
  const { user } = useAuth()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open && task) setStatus(task.status || 'todo')
    if (open && task) setPriority(task.priority || 'medium')
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
      <div className="space-y-6">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">{task.title}</div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
          />

          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={priorityOptions}
          />
        </div>

        {typeof onPrioritySave === 'function' && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onPrioritySave(priority)}>
              Save priority
            </Button>
          </div>
        )}

        {typeof onAddComment === 'function' && (
          <div>
            <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Comments</div>
            <CommentSection
              task={task}
              currentUser={user}
              onAddComment={(text) => onAddComment(task._id, text)}
            />
          </div>
        )}
      </div>
    </Dialog>
  )
}
