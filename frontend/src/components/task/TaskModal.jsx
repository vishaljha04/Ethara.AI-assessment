import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'

const statusOptions = [
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

export function TaskModal({ open, onClose, onCreate, projects }) {
  const [values, setValues] = useState({ title: '', description: '', projectId: '', assignedTo: '', dueDate: '', status: 'todo' })

  const availableMembers = useMemo(() => {
    const project = projects.find((project) => project._id === values.projectId)
    return project?.members || []
  }, [projects, values.projectId])

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(values)
    setValues({ title: '', description: '', projectId: '', assignedTo: '', dueDate: '', status: 'todo' })
    onClose()
  }

  return (
    <Dialog
      open={open}
      title="Create new task"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create task</Button>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Task title" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} required />
        <Input label="Description" value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} />

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Project
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            value={values.projectId}
            onChange={(e) => setValues({ ...values, projectId: e.target.value, assignedTo: '' })}
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>{project.name}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Assign to
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            value={values.assignedTo}
            onChange={(e) => setValues({ ...values, assignedTo: e.target.value })}
            required
            disabled={!availableMembers.length}
          >
            <option value="">Select member</option>
            {availableMembers.map((member) => (
              <option key={member._id} value={member._id}>{member.name} ({member.email})</option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Due date" type="date" value={values.dueDate} onChange={(e) => setValues({ ...values, dueDate: e.target.value })} required />
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Status
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              value={values.status}
              onChange={(e) => setValues({ ...values, status: e.target.value })}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>
      </form>
    </Dialog>
  )
}
