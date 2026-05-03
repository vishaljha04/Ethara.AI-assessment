import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { StatCard } from '../components/dashboard/StatCard'
import { Card } from '../components/ui/card'

export function DashboardPage() {
  const { stats, tasks, loading, fetchData } = useApp()

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total tasks" value={stats.total} description="All tasks across your projects." accent="" />
        <StatCard title="Completed" value={stats.completed} description="Tasks marked done." accent="" />
        <StatCard title="Pending" value={stats.pending} description="Tasks still waiting." accent="" />
        <StatCard title="Overdue" value={stats.overdue} description="Tasks that need attention." accent="" />
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recent tasks</h2>
            <p className="mt-2 text-sm text-slate-600">Quick view of your most important work.</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-20 rounded-3xl bg-slate-100" />
              ))}
            </div>
          ) : (
            tasks.slice(0, 4).map((task) => (
              <div key={task._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{task.title}</h3>
                    <p className="text-sm text-slate-600">{task.projectId?.name}</p>
                  </div>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                  <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span>Assigned to {task.assignedTo?.name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
