export function ToastContainer({ messages }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {messages.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-xs rounded-2xl border px-4 py-3 text-sm shadow-xl transition ${
            toast.type === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-900/50 dark:text-rose-300'
              : toast.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
              : 'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
