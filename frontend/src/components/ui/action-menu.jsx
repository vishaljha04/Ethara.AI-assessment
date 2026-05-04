import { useEffect, useId, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'

export function ActionMenu({ align = 'right', trigger, items = [] }) {
  const menuId = useId()
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)

  const placement = useMemo(() => {
    if (align === 'left') return 'left-0'
    return 'right-0'
  }, [align])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (event) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const safeItems = items.filter((item) => item && typeof item.onSelect === 'function' && item.label)
  if (!safeItems.length) return trigger({ open, setOpen, menuId })

  return (
    <div ref={rootRef} className="relative inline-flex">
      {trigger({ open, setOpen, menuId })}
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Actions"
          className={clsx(
            'absolute z-50 mt-2 min-w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950',
            placement
          )}
        >
          {safeItems.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className={clsx(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition',
                'hover:bg-zinc-100 dark:hover:bg-zinc-900',
                item.destructive ? 'text-red-600 dark:text-red-400' : 'text-zinc-700 dark:text-zinc-200'
              )}
              onClick={() => {
                setOpen(false)
                item.onSelect()
              }}
            >
              {item.icon && <span className="inline-flex">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

