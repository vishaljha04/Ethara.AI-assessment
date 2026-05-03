import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.href ? (
            <Link to={item.href} className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 font-semibold dark:text-zinc-100">{item.label}</span>
          )}
          {idx < items.length - 1 && <ChevronRight size={16} className="text-zinc-400" />}
        </div>
      ))}
    </nav>
  )
}
