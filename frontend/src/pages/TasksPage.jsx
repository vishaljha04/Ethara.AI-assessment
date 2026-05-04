import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { TaskCard } from '../components/task/TaskCard'
import { TaskModal } from '../components/task/TaskModal'
import { TaskStatusModal } from '../components/task/TaskStatusModal'
import { TaskFilters } from '../components/task/TaskFilters'
import { EmptyState } from '../components/ui/empty-state'
import { SkeletonCard } from '../components/ui/skeleton'
import { ConfirmDialog } from '../components/ui/confirm-dialog'
import { PromptDialog } from '../components/ui/prompt-dialog'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Plus, ListTodo } from 'lucide-react'

export function TasksPage() {
  const { tasks, projects, loading, createTask, updateTask, updateTaskStatus, updateTaskPriority, addTaskComment, deleteTask } = useApp()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [renameTaskData, setRenameTaskData] = useState(null)
  const [deleteTaskData, setDeleteTaskData] = useState(null)
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', projectId: '', assignedTo: '' })

  const handleStatusOpen = (task) => {
    setSelectedTask(task)
  }

  const handleSaveStatus = (status) => {
    if (!selectedTask) return
    updateTaskStatus(selectedTask._id, status)
    setSelectedTask(null)
  }

  const filteredTasks = tasks.filter((t) => {
    if (filters.search && !String(t.title || '').toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.status && t.status !== filters.status) return false
    if (filters.priority && t.priority !== filters.priority) return false
    if (filters.projectId && t.projectId?._id !== filters.projectId) return false
    if (filters.assignedTo && t.assignedTo?._id !== filters.assignedTo) return false
    return true
  })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Tasks</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage and track your team's workload</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setIsOpen(true)}>
            <Plus size={16} className="mr-2" />
            New task
          </Button>
      )}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <TaskFilters value={filters} onChange={setFilters} projects={projects} tasks={tasks} />
      </Card>

      {/* Tasks List */}
      <Card className="p-6">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusOpen}
                onRename={(t) => setRenameTaskData(t)}
                onDelete={(t) => setDeleteTaskData(t)}
                isAdmin={user?.role === 'admin'}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ListTodo}
            title="No tasks found"
            description={tasks.length === 0 ? 'Create your first task to get started' : 'Try adjusting your filters'}
            action={user?.role === 'admin' && tasks.length === 0 && <Button onClick={() => setIsOpen(true)}>Create task</Button>}
          />
        )}
      </Card>

      <TaskModal open={isOpen} onClose={() => setIsOpen(false)} onCreate={createTask} projects={projects} />
      <TaskStatusModal
        task={selectedTask}
        open={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        onSave={handleSaveStatus}
        onPrioritySave={(priority) => selectedTask && updateTaskPriority(selectedTask._id, priority)}
        onAddComment={addTaskComment}
      />

      <PromptDialog
        open={Boolean(renameTaskData)}
        title="Rename task"
        label="Task title"
        initialValue={renameTaskData?.title || ''}
        placeholder="Enter task title"
        onClose={() => setRenameTaskData(null)}
        onSubmit={(title) => updateTask(renameTaskData._id, { title })}
      />

      <ConfirmDialog
        open={Boolean(deleteTaskData)}
        title="Delete task?"
        description="This will permanently delete the task."
        confirmText="Delete"
        onClose={() => setDeleteTaskData(null)}
        onConfirm={() => deleteTask(deleteTaskData._id)}
      />
    </div>
  )
}
