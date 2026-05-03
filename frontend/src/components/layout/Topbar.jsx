import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/button'
import { Menu, Moon, Sun, Search } from 'lucide-react'

export function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick} title="Open menu">
            <Menu size={18} />
          </Button>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-sm">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tasks, projects..."
              className="w-full rounded-lg border border-zinc-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-blue-900"
            />
          </div>
        </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3 border-l border-zinc-200 pl-3 dark:border-zinc-800">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user?.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{user?.email}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} title="Logout">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
