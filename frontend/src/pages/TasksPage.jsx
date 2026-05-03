import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { TaskCard } from '../components/task/TaskCard'
import { TaskModal } from '../components/task/TaskModal'
import { TaskStatusModal } from '../components/task/TaskStatusModal'
import { EmptyState } from '../components/ui/empty-state'
import { SkeletonCard } from '../components/ui/skeleton'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { Plus, ListTodo } from 'lucide-react'

export function TasksPage() {
  const { tasks, projects, loading, createTask, updateTaskStatus } = useApp()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const handleStatusOpen = (task) => {
    setSelectedTask(task)
  }

  const handleSaveStatus = (status) => {
    if (!selectedTask) return
    updateTaskStatus(selectedTask._id, status)
    setSelectedTask(null)
  }

  const filteredTasks = statusFilter === 'all' ? tasks : tasks.filter(t => t.status === statusFilter)

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
      <Card className="p-4 flex flex-wrap gap-2">
        {['all', 'todo', 'in-progress', 'done'].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              statusFilter === filter
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            {filter === 'all' ? 'All Tasks' : filter.replace('-', ' ').charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
          </button>
        ))}
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
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ListTodo}
            title="No tasks found"
            description={statusFilter === 'all' ? 'Create your first task to get started' : `No ${statusFilter.replace('-', ' ')} tasks`}
            action={user?.role === 'admin' && statusFilter === 'all' && <Button onClick={() => setIsOpen(true)}>Create task</Button>}
          />
        )}
      </Card>

      <TaskModal open={isOpen} onClose={() => setIsOpen(false)} onCreate={createTask} projects={projects} />
      <TaskStatusModal task={selectedTask} open={Boolean(selectedTask)} onClose={() => setSelectedTask(null)} onSave={handleSaveStatus} />
    </div>
  )
}
