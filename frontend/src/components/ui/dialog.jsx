import { useEffect } from 'react'

export function Dialog({ open, title, children, onClose, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="text-lg font-semibold text-slate-900">{title}</div>
          <button className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="space-y-4 px-6 py-5">{children}</div>
        {footer && <div className="border-t border-slate-200 px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}
