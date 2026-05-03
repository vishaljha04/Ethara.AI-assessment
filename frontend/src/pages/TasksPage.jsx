import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { TaskModal } from '../components/task/TaskModal'
import { TaskStatusModal } from '../components/task/TaskStatusModal'
import { TaskTable } from '../components/task/TaskTable'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'

export function TasksPage() {
  const { tasks, projects, loading, createTask, updateTaskStatus } = useApp()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleStatusOpen = (task) => {
    setSelectedTask(task)
  }

  const handleSaveStatus = (status) => {
    if (!selectedTask) return
    updateTaskStatus(selectedTask._id, status)
    setSelectedTask(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Tasks</p>
          <h1 className="text-3xl font-semibold text-slate-900">Team activity board</h1>
          <p className="mt-2 text-sm text-slate-600">Keep every assignment visible, actionable, and on track.</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsOpen(true)}>Create task</Button>
        )}
      </div>

      <Card>
        <TaskTable tasks={tasks} onStatusChange={handleStatusOpen} loading={loading} />
      </Card>

      <TaskModal open={isOpen} onClose={() => setIsOpen(false)} onCreate={createTask} projects={projects} />
      <TaskStatusModal task={selectedTask} open={Boolean(selectedTask)} onClose={() => setSelectedTask(null)} onSave={handleSaveStatus} />
    </div>
  )
}
