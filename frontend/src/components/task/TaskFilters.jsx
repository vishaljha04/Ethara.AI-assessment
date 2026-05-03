import { useMemo } from 'react'
import { Input } from '../ui/input'
import { Select } from '../ui/select'

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

const priorityOptions = [
  { value: '', label: 'All priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export function TaskFilters({ value, onChange, projects = [], tasks = [] }) {
  const assigneeOptions = useMemo(() => {
    const map = new Map()
    for (const t of tasks) {
      if (t?.assignedTo?._id) {
        map.set(t.assignedTo._id, { value: t.assignedTo._id, label: `${t.assignedTo.name} (${t.assignedTo.email})` })
      }
    }
    return [{ value: '', label: 'All assignees' }, ...Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label))]
  }, [tasks])

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Input
        label="Search"
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
        placeholder="Search by task title…"
      />

      <Select
        label="Status"
        value={value.status}
        onChange={(e) => onChange({ ...value, status: e.target.value })}
        options={statusOptions}
      />

      <Select
        label="Priority"
        value={value.priority}
        onChange={(e) => onChange({ ...value, priority: e.target.value })}
        options={priorityOptions}
      />

      <Select
        label="Project"
        value={value.projectId}
        onChange={(e) => onChange({ ...value, projectId: e.target.value })}
        options={[
          { value: '', label: 'All projects' },
          ...projects.map((p) => ({ value: p._id, label: p.name })),
        ]}
      />

      <div className="lg:col-span-2">
        <Select
          label="Assignee"
          value={value.assignedTo}
          onChange={(e) => onChange({ ...value, assignedTo: e.target.value })}
          options={assigneeOptions}
        />
      </div>
    </div>
  )
}

