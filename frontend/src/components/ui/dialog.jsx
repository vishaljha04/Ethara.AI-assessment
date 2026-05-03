import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Dialog({ open, title, children, onClose, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 animate-in fade-in duration-200">
      <div className="w-full max-w-xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
          <button 
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 px-6 py-5 max-h-[60vh] overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-zinc-200 bg-gray-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">{footer}</div>}
      </div>
    </div>
  )
}
