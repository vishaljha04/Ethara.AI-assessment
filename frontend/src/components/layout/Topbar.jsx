import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'

export function Topbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-900">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Welcome back</p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'Team Member'}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">{user?.email}</div>
        <Button variant="secondary" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
