export function Card({ children, className }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-900 ${className || ''}`}>
      {children}
    </div>
  )
}
