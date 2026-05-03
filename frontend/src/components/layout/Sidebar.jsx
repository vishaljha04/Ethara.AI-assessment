import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Tasks', to: '/tasks' },
]

export function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="hidden w-72 flex-col gap-4 border-r border-slate-200 bg-white px-6 py-8 lg:flex">
      <div>
        <div className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-500">Team Task Manager</div>
        <div className="text-2xl font-semibold text-slate-900">Project Hub</div>
      </div>

      <div className="space-y-1">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">{user?.name}</p>
        <p>{user?.role === 'admin' ? 'Admin' : 'Member'}</p>
      </div>
    </aside>
  )
}
