import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.href ? (
            <Link to={item.href} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-semibold dark:text-slate-100">{item.label}</span>
          )}
          {idx < items.length - 1 && <ChevronRight size={16} className="text-slate-400" />}
        </div>
      ))}
    </nav>
  )
}
