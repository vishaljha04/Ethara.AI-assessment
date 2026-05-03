import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BarChart3, FolderKanban, CheckSquare, User } from 'lucide-react'

const links = [
  { label: 'Dashboard', to: '/', icon: BarChart3 },
  { label: 'Projects', to: '/projects', icon: FolderKanban },
  { label: 'Tasks', to: '/tasks', icon: CheckSquare },
]

export function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="hidden w-72 flex-col gap-4 border-r border-slate-200 bg-white px-6 py-8 lg:flex dark:border-slate-700 dark:bg-slate-900">
      <div>
        <div className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Team Task Manager</div>
        <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Project Hub</div>
      </div>

      <div className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          )
        })}
      </div>

      <div className="mt-auto rounded-3xl bg-slate-50 p-5 text-sm dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <User size={20} className="text-slate-500 dark:text-slate-400" />
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
            <p className="text-slate-600 dark:text-slate-400">{user?.role === 'admin' ? 'Admin' : 'Member'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
