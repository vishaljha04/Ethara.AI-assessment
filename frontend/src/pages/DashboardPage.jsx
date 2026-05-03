import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { StatCard } from '../components/dashboard/StatCard'
import { TaskCard } from '../components/task/TaskCard'
import { EmptyState } from '../components/ui/empty-state'
import { SkeletonCard } from '../components/ui/skeleton'
import { Card } from '../components/ui/card'
import { BarChart3, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

export function DashboardPage() {
  const { stats, tasks, loading, fetchData, updateTaskStatus } = useApp()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const recentTasks = tasks.slice(0, 6)
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done')

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Welcome back! Here's your task overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard 
          title="Total Tasks" 
          value={stats.total} 
          description="Across all projects" 
          icon={BarChart3}
        />
        <StatCard 
          title="Completed" 
          value={stats.completed} 
          description="Keep it up!" 
          icon={CheckCircle2}
          trend={{ positive: true, label: '+5 this week' }}
        />
        <StatCard 
          title="In Progress" 
          value={stats.inProgress} 
          description="Currently active" 
          icon={Clock}
        />
        <StatCard 
          title="Overdue" 
          value={overdueTasks.length} 
          description="Need attention" 
          icon={AlertCircle}
          trend={{ positive: false, label: `-${Math.max(0, overdueTasks.length - 2)} from yesterday` }}
        />
      </div>

      {/* Recent Tasks Section */}
      <Card className="p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Recent Tasks</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Your most active work items</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : recentTasks.length > 0 ? (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onStatusChange={() => updateTaskStatus(task._id, task.status === 'done' ? 'todo' : 'done')}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={CheckCircle2}
            title="No tasks yet" 
            description="Create your first task to get started" 
          />
        )}
      </Card>

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <Card className="border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-1 text-red-600 dark:text-red-400" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">{overdueTasks.length} overdue tasks</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">You have {overdueTasks.length} task{overdueTasks.length > 1 ? 's' : ''} that need immediate attention.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
