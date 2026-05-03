import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BarChart3, FolderKanban, CheckSquare, LogOut } from 'lucide-react'
import { Button } from '../ui/button'

const links = [
  { label: 'Dashboard', to: '/', icon: BarChart3 },
  { label: 'Projects', to: '/projects', icon: FolderKanban },
  { label: 'Tasks', to: '/tasks', icon: CheckSquare },
]

export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="hidden w-64 flex-col gap-6 border-r border-slate-200 bg-white px-6 py-8 lg:flex dark:border-slate-700 dark:bg-slate-900">
      {/* Logo / Brand */}
      <div className="flex flex-col gap-1">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Team Task</div>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">Manager</div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* User Card */}
      <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{user?.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{user?.role === 'admin' ? 'Admin' : 'Member'}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="w-full mt-3 justify-start">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}