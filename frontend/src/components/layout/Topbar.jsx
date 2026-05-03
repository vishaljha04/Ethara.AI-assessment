import { useAuth } from '../../context/AuthContext'
import { Button } from '../ui/button'

export function Topbar() {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
        <h1 className="text-2xl font-semibold text-slate-900">{user?.name || 'Team Member'}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">{user?.email}</div>
        <Button variant="secondary" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
